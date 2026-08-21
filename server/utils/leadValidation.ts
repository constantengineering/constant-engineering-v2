/** Shared validation + sanitization for chatbot lead submissions. */

export const LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  company: 150,
  requestType: 80,
  transcript: 10_000,
  pageUrl: 2000,
  utm: 200,
  qualKey: 40,
  qualValue: 200
} as const

const INJECTION_PATTERNS = [
  /<script\b/i,
  /<\/script>/i,
  /javascript:/i,
  /vbscript:/i,
  /on\w+\s*=/i,
  /data:text\/html/i,
  /<\?/,
  /<%/
]

const ALLOWED_QUAL_KEYS = new Set([
  'intent',
  'systemType',
  'requestType',
  'notes',
  'capacity',
  'productInterest',
  'lastAnswer'
])

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

export type UtmKey = (typeof UTM_KEYS)[number]

export interface LeadQualification {
  intent?: string
  systemType?: string
  requestType?: string
  notes?: string
  capacity?: string
  productInterest?: string
  lastAnswer?: string
}

export interface RawLeadBody {
  name?: unknown
  email?: unknown
  phone?: unknown
  company?: unknown
  requestType?: unknown
  qualification?: unknown
  transcript?: unknown
  pageUrl?: unknown
  utm?: unknown
  /** Honeypot — must be empty when present. */
  website?: unknown
}

export interface ValidatedLead {
  name: string
  email: string
  phone: string
  company: string | null
  requestType: string
  qualification: LeadQualification
  transcript: string
  pageUrl: string | null
  utm: Partial<Record<UtmKey, string>>
  submittedAt: string
}

export class LeadValidationError extends Error {
  statusCode: number
  constructor(message: string, statusCode = 400) {
    super(message)
    this.name = 'LeadValidationError'
    this.statusCode = statusCode
  }
}

function stripControlChars(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
}

function containsInjection(value: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(value))
}

function assertSafeText(value: unknown, field: string, maxLen: number, minLen = 1): string {
  const trimmed = stripControlChars(String(value)).trim()
  if (trimmed.length < minLen) {
    throw new LeadValidationError(`${field} is required.`)
  }
  if (trimmed.length > maxLen) {
    throw new LeadValidationError(`${field} is too long.`)
  }
  if (containsInjection(trimmed)) {
    throw new LeadValidationError(`${field} contains invalid content.`)
  }
  return trimmed
}

function validateName(value: unknown): string {
  const text = assertSafeText(value, 'Name', LIMITS.name, 2)
  if (!/^[\p{L}\p{M}\s'.-]+$/u.test(text)) {
    throw new LeadValidationError('Name contains invalid characters.')
  }
  return text
}

function validatePhone(value: unknown): string {
  const text = assertSafeText(value, 'Phone', LIMITS.phone, 7)
  const digits = text.replace(/\D/g, '')
  if (digits.length < 9 || digits.length > 15) {
    throw new LeadValidationError('Phone number is invalid.')
  }
  if (!/^[\d\s+().-]+$/.test(text)) {
    throw new LeadValidationError('Phone number contains invalid characters.')
  }
  return text
}

function validateEmail(value: unknown): string {
  const text = assertSafeText(value, 'Email', LIMITS.email, 5).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
    throw new LeadValidationError('Email is invalid.')
  }
  return text
}

function validateOptionalCompany(value: unknown): string | null {
  if (value == null || value === '') return null
  return assertSafeText(value, 'Company', LIMITS.company, 1)
}

function validateRequestType(value: unknown, qualification: LeadQualification): string {
  const fromBody = value != null && value !== '' ? String(value) : ''
  const fromQual = qualification.requestType || ''
  const text = assertSafeText(fromBody || fromQual || 'Consultation', 'Request type', LIMITS.requestType)
  return text
}

function validateQualification(value: unknown): LeadQualification {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) {
    return {}
  }
  const out: LeadQualification = {}
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (!ALLOWED_QUAL_KEYS.has(key)) continue
    if (raw == null || raw === '') continue
    if (typeof raw !== 'string') {
      throw new LeadValidationError('Qualification data is invalid.')
    }
    if (key.length > LIMITS.qualKey) continue
    out[key as keyof LeadQualification] = assertSafeText(raw, key, LIMITS.qualValue)
  }
  return out
}

function validateTranscript(value: unknown): string {
  if (value == null || value === '') return ''
  if (typeof value !== 'string') {
    throw new LeadValidationError('Transcript is invalid.')
  }
  const text = assertSafeText(value, 'Transcript', LIMITS.transcript, 0)
  // One line per message; strip excessive blank lines.
  return text.replace(/\n{3,}/g, '\n\n')
}

function validatePageUrl(value: unknown): string | null {
  if (value == null || value === '') return null
  const text = assertSafeText(value, 'Page URL', LIMITS.pageUrl, 8)
  if (!/^https?:\/\//i.test(text)) {
    throw new LeadValidationError('Page URL is invalid.')
  }
  try {
    const url = new URL(text)
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new LeadValidationError('Page URL is invalid.')
    }
    return url.toString()
  } catch {
    throw new LeadValidationError('Page URL is invalid.')
  }
}

function validateUtm(value: unknown): Partial<Record<UtmKey, string>> {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) {
    return {}
  }
  const out: Partial<Record<UtmKey, string>> = {}
  for (const key of UTM_KEYS) {
    const raw = (value as Record<string, unknown>)[key]
    if (raw == null || raw === '') continue
    if (typeof raw !== 'string') {
      throw new LeadValidationError('UTM parameters are invalid.')
    }
    const text = assertSafeText(raw, key, LIMITS.utm)
    if (!/^[a-zA-Z0-9_.-]+$/.test(text)) {
      throw new LeadValidationError('UTM parameters are invalid.')
    }
    out[key] = text
  }
  return out
}

export function validateLeadBody(body: RawLeadBody): ValidatedLead {
  if (body.website != null && String(body.website).trim() !== '') {
    throw new LeadValidationError('Submission rejected.', 400)
  }

  const qualification = validateQualification(body.qualification)

  return {
    name: validateName(body.name),
    email: validateEmail(body.email),
    phone: validatePhone(body.phone),
    company: validateOptionalCompany(body.company),
    requestType: validateRequestType(body.requestType, qualification),
    qualification,
    transcript: validateTranscript(body.transcript),
    pageUrl: validatePageUrl(body.pageUrl),
    utm: validateUtm(body.utm),
    submittedAt: new Date().toISOString()
  }
}

/** Escape text for safe inclusion in HTML email bodies. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
