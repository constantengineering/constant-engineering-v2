/** Validation for streaming chat API requests. */

export const CHAT_LIMITS = {
  maxMessageLength: 2000,
  maxHistoryMessages: 40,
  maxPageUrlLength: 2000
} as const

const INJECTION_PATTERNS = [
  /<script\b/i,
  /javascript:/i,
  /vbscript:/i,
  /on\w+\s*=/i
]

export interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatQualification {
  intent?: string
  systemType?: string
  requestType?: string
  notes?: string
  capacity?: string
  productInterest?: string
  lastAnswer?: string
}

export interface RawChatBody {
  messages?: unknown
  qualification?: unknown
  pageUrl?: unknown
}

export interface ValidatedChatRequest {
  messages: ChatTurn[]
  qualification: ChatQualification
  pageUrl: string | null
  lastUserMessage: string
}

export class ChatValidationError extends Error {
  statusCode: number
  constructor(message: string, statusCode = 400) {
    super(message)
    this.name = 'ChatValidationError'
    this.statusCode = statusCode
  }
}

function assertSafeText(value: string, field: string, maxLen: number): string {
  const trimmed = value.trim()
  if (!trimmed) {
    throw new ChatValidationError(`${field} is required.`)
  }
  if (trimmed.length > maxLen) {
    throw new ChatValidationError(`${field} is too long.`)
  }
  if (INJECTION_PATTERNS.some((pattern) => pattern.test(trimmed))) {
    throw new ChatValidationError(`${field} contains invalid content.`)
  }
  return trimmed
}

function validateQualification(value: unknown): ChatQualification {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) {
    return {}
  }
  const allowed = [
    'intent',
    'systemType',
    'requestType',
    'notes',
    'capacity',
    'productInterest',
    'lastAnswer'
  ] as const
  const out: ChatQualification = {}
  for (const key of allowed) {
    const raw = (value as Record<string, unknown>)[key]
    if (raw == null || raw === '') continue
    if (typeof raw !== 'string') {
      throw new ChatValidationError('Qualification data is invalid.')
    }
    out[key] = assertSafeText(raw, key, 200)
  }
  return out
}

function validatePageUrl(value: unknown): string | null {
  if (value == null || value === '') return null
  const text = assertSafeText(String(value), 'Page URL', CHAT_LIMITS.maxPageUrlLength)
  if (!/^https?:\/\//i.test(text)) {
    throw new ChatValidationError('Page URL is invalid.')
  }
  return text
}

function validateMessages(value: unknown): ChatTurn[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new ChatValidationError('Messages are required.')
  }

  const trimmed = value.slice(-CHAT_LIMITS.maxHistoryMessages)
  const messages: ChatTurn[] = []

  for (const item of trimmed) {
    if (item == null || typeof item !== 'object' || Array.isArray(item)) {
      throw new ChatValidationError('Message history is invalid.')
    }
    const role = (item as { role?: unknown }).role
    const content = (item as { content?: unknown }).content
    if (role !== 'user' && role !== 'assistant') {
      throw new ChatValidationError('Message role is invalid.')
    }
    if (typeof content !== 'string') {
      throw new ChatValidationError('Message content is invalid.')
    }
    messages.push({
      role,
      content: assertSafeText(content, 'Message', CHAT_LIMITS.maxMessageLength)
    })
  }

  const last = messages[messages.length - 1]
  if (!last || last.role !== 'user') {
    throw new ChatValidationError('The last message must be from the user.')
  }

  return messages
}

export function validateChatBody(body: RawChatBody): ValidatedChatRequest {
  const messages = validateMessages(body.messages)
  const qualification = validateQualification(body.qualification)
  const pageUrl = validatePageUrl(body.pageUrl)

  return {
    messages,
    qualification,
    pageUrl,
    lastUserMessage: messages[messages.length - 1].content
  }
}
