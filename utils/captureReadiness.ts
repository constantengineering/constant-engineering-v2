/** Capture signals — show the lead form only on clear buying / contact intent. */

export interface CaptureMessage {
  role: string
  content: string
}

const SPEC_SIGNALS = /\b\d+\s*(kva|kw|kwh|hp)\b/i

const ENGAGEMENT_SIGNALS =
  /\b(reach out|get in touch|talk to|speak to|talk with|speak with|connect me|contact me|callback|call me|call us|sales team|sales persons?|salespeople|salesperson|sales representatives?|representative|quote|quotation|whatsapp|order|buy|purchase)\b/i

const FORM_REQUEST_SIGNALS =
  /\b(where(?:'s| is) (?:the )?form|show (?:me )?(?:the )?form|contact form)\b/i

const BUYING_SIGNALS =
  /\b(i want|i need|we want|we need|looking for|interested in|get a quote|need a quote|need a|want a)\b/i

/** Pure info / browsing questions — never force the lead form. */
const INFO_QUESTION_SIGNALS =
  /\b(tell me about|what (do you|are your|is your)|do you (sell|supply|offer|have)|how (does|do|much)|can you (explain|describe)|info(rmation)? on)\b/i

const PRODUCT_PATTERNS: { category: string; pattern: RegExp }[] = [
  { category: 'Diesel Generators', pattern: /\b(diesel|generat\w*|perkins|cummins)\b/i },
  { category: 'Solar & Hybrid Energy', pattern: /\b(solar|hybrid energy|hybrid system)\b/i },
  { category: 'HVAC & Cooling', pattern: /\b(hvac|cooling|chiller|refrigeration|cold room)\b/i },
  { category: 'Power Quality & Protection', pattern: /\b(ups|power quality|voltage stabiliz|harmonic filter)\b/i },
  { category: 'Electrical Distribution', pattern: /\b(switchgear|distribution panel|mccb|power cable)\b/i },
  { category: 'Pumping Solutions', pattern: /\b(pump|pumping|submersible)\b/i },
  { category: 'Industrial Automation', pattern: /\b(automation|plc|control panel|mcc)\b/i },
  { category: 'Metal Engineering', pattern: /\b(fabrication|steel structure|storage tank)\b/i }
]

export function hasSpecDetail(text: string): boolean {
  return SPEC_SIGNALS.test(text)
}

export function hasEngagementIntent(text: string): boolean {
  const trimmed = text.trim()
  return ENGAGEMENT_SIGNALS.test(trimmed) || FORM_REQUEST_SIGNALS.test(trimmed)
}

export function hasBuyingIntent(text: string): boolean {
  return BUYING_SIGNALS.test(text.trim())
}

export function isInfoQuestion(text: string): boolean {
  return INFO_QUESTION_SIGNALS.test(text.trim())
}

export function isBareCapacityReply(text: string): boolean {
  const t = text.trim()
  return /^\d{1,4}$/.test(t) || /^\d{1,4}\s*(kva|kw|kwh|hp)$/i.test(t)
}

export function detectProductCategory(text: string): string | null {
  for (const { category, pattern } of PRODUCT_PATTERNS) {
    if (pattern.test(text)) return category
  }
  return null
}

/** Parse capacity from message or thread (including bare "1500" when product context exists). */
export function extractCapacity(lastUserMessage: string, conversation: string): string | null {
  const kva =
    lastUserMessage.match(/\b(\d+)\s*kva\b/i) || conversation.match(/\b(\d+)\s*kva\b/i)
  if (kva) return `${kva[1]} KVA`

  const kw = lastUserMessage.match(/\b(\d+)\s*kw\b/i) || conversation.match(/\b(\d+)\s*kw\b/i)
  if (kw) return `${kw[1]} KW`

  if (isBareCapacityReply(lastUserMessage) && detectProductCategory(conversation)) {
    const n = lastUserMessage.trim().match(/^(\d{1,4})/)
    if (n) return `${n[1]} KVA`
  }

  return null
}

/**
 * Deterministic capture — only when the visitor is ready for sales follow-up.
 * Info questions ("tell me about your generators") must get an answer first.
 */
export function isStructurallyReadyForCapture(
  messages: CaptureMessage[],
  lastUserMessage: string
): boolean {
  if (isInfoQuestion(lastUserMessage) && !hasBuyingIntent(lastUserMessage) && !hasEngagementIntent(lastUserMessage)) {
    return false
  }

  const conversation = messages.map((m) => m.content).join(' ')
  const productInThread = detectProductCategory(conversation)
  const productOnLast = detectProductCategory(lastUserMessage)
  const engaged = hasEngagementIntent(lastUserMessage)
  const buying = hasBuyingIntent(lastUserMessage)
  const capacity = extractCapacity(lastUserMessage, conversation)

  // A direct request to speak with sales is sufficient. Product details can be
  // collected by the sales team after the visitor has provided their contact
  // information; requiring product context here leaves the form hidden.
  if (engaged) return true

  // Capacity given (incl. bare "1500") with product context
  if (capacity && productInThread) return true

  if (hasSpecDetail(lastUserMessage) && productInThread) return true

  // "I want a diesel generator" — product + buying intent
  if (buying && productOnLast) return true

  return false
}

export function isReadyForCapture(
  messages: CaptureMessage[],
  lastUserMessage: string
): boolean {
  return isStructurallyReadyForCapture(messages, lastUserMessage)
}
