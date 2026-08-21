import {
  defineEventHandler,
  readBody,
  createError,
  sendStream,
  setResponseHeaders
} from 'h3'
import { useRuntimeConfig } from 'nitropack/runtime'
import { GoogleGenerativeAI } from '@google/generative-ai'
import {
  buildSystemPrompt,
  buildQualificationUpdate,
  sanitizeChatReply
} from '../utils/agentPrompt'
import {
  getGeminiKeySetupError,
  geminiModelCandidates,
  isRetryableGeminiModelError,
  normalizeGeminiApiKey,
  resolveGeminiModel
} from '../utils/geminiConfig'
import {
  buildCaptureQualification,
  getCaptureHandoffText,
  getUnavailableHandoffText,
  shouldCaptureLead
} from '../utils/qualificationFlow'
import {
  validateChatBody,
  ChatValidationError,
  type RawChatBody
} from '../utils/chatValidation'

type ChatAction = 'continue' | 'convert' | 'capture'

type StreamEvent =
  | { type: 'delta'; content: string }
  | { type: 'done'; action: ChatAction; qualification: Record<string, string> }
  | { type: 'error'; message: string }

function encodeSse(event: StreamEvent): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`)
}

function sendCaptureHandoff(
  send: (payload: StreamEvent) => void,
  messages: ReturnType<typeof validateChatBody>['messages'],
  lastUserMessage: string,
  qualification: Record<string, string>,
  handoffText = getCaptureHandoffText()
) {
  const captureQual = buildCaptureQualification(messages, lastUserMessage, qualification)
  send({ type: 'delta', content: handoffText })
  send({
    type: 'done',
    action: 'capture',
    qualification: captureQual
  })
}

async function generateAssistantReply(
  apiKey: string,
  configuredModel: string,
  lastUserMessage: string,
  pageUrl: string | null,
  messages: ReturnType<typeof validateChatBody>['messages']
): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey)
  const contents = messages.map((message) => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: message.content }]
  }))
  const systemInstruction = buildSystemPrompt(lastUserMessage, pageUrl)
  const candidates = geminiModelCandidates(configuredModel)

  let lastError: unknown
  for (const candidate of candidates) {
    try {
      const model = genAI.getGenerativeModel({
        model: candidate,
        systemInstruction
      })
      const result = await model.generateContentStream({ contents })
      let fullReply = ''

      for await (const chunk of result.stream) {
        let text = ''
        try {
          text = chunk.text()
        } catch {
          text = ''
        }
        if (!text) continue
        const clean = sanitizeChatReply(text)
        if (!clean) continue
        fullReply += clean
      }

      if (!fullReply.trim()) {
        fullReply =
          'I can connect you with our engineering team for accurate guidance. What system or project are you working on?'
      }

      if (candidate !== resolveGeminiModel(configuredModel)) {
        console.info(`[chat.post] using fallback model: ${candidate}`)
      }
      return fullReply
    } catch (err) {
      lastError = err
      if (!isRetryableGeminiModelError(err)) throw err
      console.warn(
        `[chat.post] model ${candidate} unavailable, trying next fallback…`,
        err instanceof Error ? err.message.slice(0, 160) : err
      )
    }
  }

  throw lastError
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = normalizeGeminiApiKey(
    (process.env.GEMINI_API_KEY || process.env.NUXT_GEMINI_API_KEY || config.geminiApiKey) as string
  )
  const modelName = resolveGeminiModel(config.geminiModel as string)

  let body: RawChatBody
  try {
    body = await readBody<RawChatBody>(event)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request body.' })
  }

  let chatRequest
  try {
    chatRequest = validateChatBody(body)
  } catch (err) {
    if (err instanceof ChatValidationError) {
      throw createError({ statusCode: err.statusCode, statusMessage: err.message })
    }
    throw createError({ statusCode: 400, statusMessage: 'Invalid chat request.' })
  }

  const { messages, qualification, pageUrl, lastUserMessage } = chatRequest
  const keyError = getGeminiKeySetupError(apiKey)

  setResponseHeaders(event, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no'
  })

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (payload: StreamEvent) => {
        controller.enqueue(encodeSse(payload))
      }

      const qualUpdate = buildQualificationUpdate(lastUserMessage, qualification)
      let mergedQualification = { ...qualification, ...qualUpdate }

      // Missing/invalid key — still collect the lead instead of failing hard.
      if (keyError) {
        console.error('[chat.post] Gemini key setup:', keyError)
        sendCaptureHandoff(
          send,
          messages,
          lastUserMessage,
          mergedQualification,
          getUnavailableHandoffText()
        )
        controller.close()
        return
      }

      try {
        const captureDecision = await shouldCaptureLead(
          apiKey,
          modelName,
          messages,
          lastUserMessage
        )
        mergedQualification = { ...mergedQualification, ...captureDecision.hints }

        if (captureDecision.capture) {
          sendCaptureHandoff(send, messages, lastUserMessage, mergedQualification)
          return
        }

        const fullReply = await generateAssistantReply(
          apiKey,
          modelName,
          lastUserMessage,
          pageUrl,
          messages
        )

        send({ type: 'delta', content: fullReply })
        send({
          type: 'done',
          action: 'continue',
          qualification: mergedQualification
        })
      } catch (err) {
        console.error('[chat.post] Gemini error:', err)
        sendCaptureHandoff(
          send,
          messages,
          lastUserMessage,
          mergedQualification,
          getUnavailableHandoffText()
        )
      } finally {
        controller.close()
      }
    }
  })

  return sendStream(event, stream)
})
