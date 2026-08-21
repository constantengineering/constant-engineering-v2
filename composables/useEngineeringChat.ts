import { useRuntimeConfig } from 'nuxt/app'
import { ref, reactive, computed } from 'vue'
import { buildCaptureHandoffMessage, buildLeadSuccessMessage, buildUnavailableHandoffMessage } from '~/utils/salesContact'

export interface ChatMessage {
  id: string
  role: 'user' | 'bot'
  content: string
  time: string
}

export interface StepOption {
  label: string
  icon?: string
  next?: StepId
  action?: 'capture' | 'whatsapp'
  set?: Record<string, string>
}

export interface Qualification {
  intent?: string
  systemType?: string
  requestType?: string
  notes?: string
  capacity?: string
  productInterest?: string
  lastAnswer?: string
}

export interface LeadPayload {
  name: string
  email: string
  phone: string
  company: string
}

type StepId = 'entry' | 'system_type' | 'conversion' | 'capture' | 'done'

type StreamEvent =
  | { type: 'delta'; content: string }
  | { type: 'done'; action: 'continue' | 'convert' | 'capture'; qualification?: Qualification }
  | { type: 'error'; message: string }

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

const CONVERSION_BOT =
  'This looks like a project our engineering team should review directly. We can prepare accurate technical guidance and costing after a quick consultation.'

interface Step {
  bot: string
  options: StepOption[]
}

const STEPS: Record<Exclude<StepId, 'capture' | 'done'>, Step> = {
  entry: {
    bot: '',
    options: []
  },
  system_type: {
    bot: 'Got it. What type of system is this?',
    options: [
      { label: 'Electrical Systems', icon: 'heroicons:bolt', next: 'conversion', set: { systemType: 'Electrical Systems' } },
      { label: 'Mechanical Systems', icon: 'heroicons:cog-6-tooth', next: 'conversion', set: { systemType: 'Mechanical Systems' } },
      { label: 'Electromechanical', icon: 'heroicons:cpu-chip', next: 'conversion', set: { systemType: 'Electromechanical' } },
      { label: 'Industrial Facility', icon: 'heroicons:building-office-2', next: 'conversion', set: { systemType: 'Industrial Facility' } }
    ]
  },
  conversion: {
    bot: CONVERSION_BOT,
    options: [
      { label: 'Request Quotation', icon: 'heroicons:document-text', action: 'capture', set: { requestType: 'Quotation' } },
      { label: 'Talk to Engineer', icon: 'heroicons:phone', action: 'capture', set: { requestType: 'Engineer Callback' } },
      { label: 'WhatsApp Consultation', icon: 'heroicons:chat-bubble-left-right', action: 'whatsapp', set: { requestType: 'WhatsApp' } }
    ]
  }
}

// Module-scoped singleton state.
const isOpen = ref(false)
const isTyping = ref(false)
const isStreaming = ref(false)
const currentStep = ref<StepId>('entry')
const messages = ref<ChatMessage[]>([])
const qualification = reactive<Qualification>({})

const leadSubmitting = ref(false)
const leadStatus = ref<'idle' | 'success' | 'error'>('idle')
const leadMessage = ref('')
const freeformChat = ref(false)

let initialized = false
let typingTimer: ReturnType<typeof setTimeout> | null = null
let streamAbort: AbortController | null = null

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function pushBot(text: string) {
  messages.value.push({ id: uid(), role: 'bot', content: text, time: nowTime() })
}
function pushUser(text: string) {
  messages.value.push({ id: uid(), role: 'user', content: text, time: nowTime() })
}

function goToStep(step: Exclude<StepId, 'capture' | 'done'>) {
  isTyping.value = true
  if (typingTimer) clearTimeout(typingTimer)
  typingTimer = setTimeout(() => {
    isTyping.value = false
    currentStep.value = step
    pushBot(STEPS[step].bot)
  }, 550)
}

function ensureStart() {
  if (initialized) return
  initialized = true
  currentStep.value = 'entry'
}

function collectPageContext() {
  if (typeof window === 'undefined') {
    return { pageUrl: null as string | null, utm: {} as Record<string, string> }
  }
  const params = new URLSearchParams(window.location.search)
  const utm: Record<string, string> = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) utm[key] = value
  }
  return { pageUrl: window.location.href, utm }
}

function toApiMessages() {
  return messages.value.map((message) => ({
    role: message.role === 'bot' ? ('assistant' as const) : ('user' as const),
    content: message.content
  }))
}

function parseSseChunk(chunk: string): StreamEvent[] {
  const events: StreamEvent[] = []
  const lines = chunk.split('\n')
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue
    try {
      events.push(JSON.parse(line.slice(6)) as StreamEvent)
    } catch {
      // ignore malformed chunks
    }
  }
  return events
}

function applyStreamEvent(
  event: StreamEvent,
  handlers: {
    onDelta: (content: string) => void
    onDone: (event: Extract<StreamEvent, { type: 'done' }>) => void
  }
): Error | null {
  if (event.type === 'delta') {
    handlers.onDelta(event.content)
    return null
  }
  if (event.type === 'done') {
    handlers.onDone(event)
    return null
  }
  if (event.type === 'error') {
    return new Error(event.message)
  }
  return null
}

function processSseParts(
  parts: string[],
  handlers: {
    onDelta: (content: string) => void
    onDone: (event: Extract<StreamEvent, { type: 'done' }>) => void
  }
): Error | null {
  for (const part of parts) {
    for (const event of parseSseChunk(part)) {
      const err = applyStreamEvent(event, handlers)
      if (err) return err
    }
  }
  return null
}

export function useEngineeringChat() {
  const config = useRuntimeConfig()

  function buildWhatsappLink() {
    const number = config.public.whatsappNumber
    const lines = ['Hello CONSTANT ENGINEERING, I would like an engineering consultation.']
    if (qualification.intent) lines.push(`Need: ${qualification.intent}`)
    if (qualification.systemType) lines.push(`System: ${qualification.systemType}`)
    return `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`
  }

  function stopStream() {
    streamAbort?.abort()
    streamAbort = null
    isStreaming.value = false
  }

  function open() {
    isOpen.value = true
    ensureStart()
  }
  function close() {
    isOpen.value = false
  }
  function toggle() {
    isOpen.value ? close() : open()
  }

  function restart() {
    stopStream()
    if (typingTimer) clearTimeout(typingTimer)
    isTyping.value = false
    freeformChat.value = false
    messages.value = []
    Object.keys(qualification).forEach((k) => delete (qualification as Record<string, string>)[k])
    leadStatus.value = 'idle'
    leadMessage.value = ''
    currentStep.value = 'entry'
  }

  function selectOption(option: StepOption) {
    if (isTyping.value || isStreaming.value) return
    pushUser(option.label)
    if (option.set) Object.assign(qualification, option.set)

    if (option.action === 'whatsapp') {
      if (typeof window !== 'undefined') window.open(buildWhatsappLink(), '_blank')
      isTyping.value = true
      if (typingTimer) clearTimeout(typingTimer)
      typingTimer = setTimeout(() => {
        isTyping.value = false
        currentStep.value = 'done'
        pushBot('Opening WhatsApp. Our engineering team will assist you there.')
      }, 450)
      return
    }

    if (option.action === 'capture') {
      isTyping.value = true
      if (typingTimer) clearTimeout(typingTimer)
      typingTimer = setTimeout(() => {
        isTyping.value = false
        currentStep.value = 'capture'
        pushBot(buildCaptureHandoffMessage())
      }, 450)
      return
    }

    if (option.next) goToStep(option.next as Exclude<StepId, 'capture' | 'done'>)
  }

  async function sendText(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isTyping.value || isStreaming.value) return
    ensureStart()
    freeformChat.value = true
    pushUser(trimmed)

    stopStream()
    streamAbort = new AbortController()
    isTyping.value = true
    isStreaming.value = true

    const botId = uid()
    let botIndex = -1

    const openLeadCapture = (handoff: string) => {
      qualification.requestType = qualification.requestType || 'Quotation'
      qualification.intent = qualification.intent || 'New Engineering Project'
      currentStep.value = 'capture'
      if (botIndex === -1) {
        messages.value.push({
          id: botId,
          role: 'bot',
          content: handoff,
          time: nowTime()
        })
        botIndex = messages.value.length - 1
      } else {
        messages.value[botIndex].content = handoff
      }
    }

    const appendBotDelta = (delta: string) => {
      isTyping.value = false
      if (botIndex === -1) {
        messages.value.push({
          id: botId,
          role: 'bot',
          content: delta,
          time: nowTime()
        })
        botIndex = messages.value.length - 1
      } else {
        messages.value[botIndex].content += delta
      }
    }

    try {
      const { pageUrl } = collectPageContext()
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: toApiMessages(),
          qualification: { ...qualification },
          pageUrl
        }),
        signal: streamAbort.signal
      })

      if (!response.ok) {
        throw new Error(`Chat request failed (${response.status})`)
      }

      if (!response.body) {
        throw new Error('No response stream')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let sawDone = false

      const streamHandlers = {
        onDelta: appendBotDelta,
        onDone: (event: Extract<StreamEvent, { type: 'done' }>) => {
          sawDone = true
          if (event.qualification) {
            Object.assign(qualification, event.qualification)
          }
          if (event.action === 'capture' || event.action === 'convert') {
            currentStep.value = 'capture'
            const last = messages.value[messages.value.length - 1]
            if (last?.role === 'bot' && !last.content.trim()) {
              last.content = buildCaptureHandoffMessage()
            } else if (last?.role !== 'bot') {
              pushBot(buildCaptureHandoffMessage())
            }
          } else if (currentStep.value === 'conversion') {
            currentStep.value = 'entry'
          }
        }
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const parts = buffer.split('\n\n')
        buffer = parts.pop() || ''

        const err = processSseParts(parts, streamHandlers)
        if (err) throw err
      }

      if (buffer.trim()) {
        const err = processSseParts([buffer], streamHandlers)
        if (err) throw err
      }

      // No usable assistant reply — never drop the lead.
      if (!sawDone || botIndex === -1) {
        openLeadCapture(buildUnavailableHandoffMessage())
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return
      }
      // Chat failed for any reason — always collect contact details.
      openLeadCapture(buildUnavailableHandoffMessage())
    } finally {
      isTyping.value = false
      isStreaming.value = false
      streamAbort = null
    }
  }

  async function submitLead(payload: LeadPayload) {
    leadSubmitting.value = true
    leadStatus.value = 'idle'
    leadMessage.value = ''

    const transcript = messages.value
      .map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`)
      .join('\n')

    const { pageUrl, utm } = collectPageContext()

    try {
      await $fetch('/api/leads', {
        method: 'POST',
        body: {
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          company: payload.company,
          requestType: qualification.requestType || 'Consultation',
          qualification: { ...qualification },
          transcript,
          pageUrl,
          utm,
          website: ''
        },
        timeout: 30000
      })
      leadStatus.value = 'success'
      leadMessage.value = buildLeadSuccessMessage()
      currentStep.value = 'done'
    } catch {
      leadStatus.value = 'error'
      leadMessage.value = `Could not send your request. Please call ${config.public.supportPhone}.`
    } finally {
      leadSubmitting.value = false
    }
  }

  const options = computed<StepOption[]>(() => {
    if (isTyping.value || isStreaming.value) return []
    const step = currentStep.value
    if (step === 'capture' || step === 'done') return []
    // Free-text chat: no scripted chips — only conversion actions when routed there
    if (freeformChat.value && step !== 'conversion') return []
    return STEPS[step].options
  })

  const isCapture = computed(() => currentStep.value === 'capture')
  const isDone = computed(() => currentStep.value === 'done')

  const showWelcome = computed(
    () =>
      currentStep.value === 'entry' &&
      messages.value.length === 0 &&
      !isTyping.value &&
      !isStreaming.value &&
      !isCapture.value
  )

  return {
    isOpen,
    isTyping,
    isStreaming,
    currentStep,
    messages,
    qualification,
    options,
    showWelcome,
    isCapture,
    isDone,
    leadSubmitting,
    leadStatus,
    leadMessage,
    open,
    close,
    toggle,
    restart,
    selectOption,
    sendText,
    submitLead
  }
}
