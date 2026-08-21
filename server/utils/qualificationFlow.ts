import type { ChatTurn, ChatQualification } from './chatValidation'
import { buildCaptureHandoffMessage, buildUnavailableHandoffMessage } from '../../utils/salesContact'
import {
  detectProductCategory,
  hasBuyingIntent,
  hasEngagementIntent,
  isStructurallyReadyForCapture,
  extractCapacity
} from '../../utils/captureReadiness'

export { isStructurallyReadyForCapture as isReadyForCapture }

/**
 * Decide whether to show the lead form.
 * Deterministic signals only — info questions are answered by the model first.
 */
export async function shouldCaptureLead(
  _apiKey: string,
  _modelName: string,
  messages: ChatTurn[],
  lastUserMessage: string
): Promise<{ capture: boolean; hints: Partial<ChatQualification> }> {
  if (isStructurallyReadyForCapture(messages, lastUserMessage)) {
    return { capture: true, hints: {} }
  }

  const conversation = messages.map((m) => m.content).join(' ')
  const productInThread = detectProductCategory(conversation)
  const buying = hasBuyingIntent(lastUserMessage)
  const engaged = hasEngagementIntent(lastUserMessage)

  if ((buying || engaged) && productInThread) {
    return { capture: true, hints: {} }
  }

  return { capture: false, hints: {} }
}

export function buildCaptureQualification(
  messages: ChatTurn[],
  lastUserMessage: string,
  existing: ChatQualification
): Record<string, string> {
  const conversation = messages.map((m) => m.content).join('\n')
  const out: Record<string, string> = {
    requestType: existing.requestType || 'Quotation',
    intent: existing.intent || 'New Engineering Project',
    notes: conversation.slice(-2000)
  }

  if (existing.systemType) out.systemType = existing.systemType

  const kva = conversation.match(/\b(\d+)\s*kva\b/i)
  if (kva) out.capacity = `${kva[1]} KVA`

  const kw = conversation.match(/\b(\d+)\s*kw\b/i)
  if (kw && !out.capacity) out.capacity = `${kw[1]} KW`

  const parsedCapacity = extractCapacity(lastUserMessage, conversation)
  if (parsedCapacity && !out.capacity) out.capacity = parsedCapacity

  const product = detectProductCategory(conversation)
  if (product) out.productInterest = product

  if (/\belectrical\b/i.test(conversation) && !out.systemType) {
    out.systemType = 'Electrical Systems'
  } else if (/\bmechanical\b/i.test(conversation) && !out.systemType) {
    out.systemType = 'Mechanical Systems'
  } else if (/\belectromechanical\b/i.test(conversation) && !out.systemType) {
    out.systemType = 'Electromechanical'
  }

  if (lastUserMessage.trim()) {
    out.lastAnswer = lastUserMessage.trim().slice(0, 200)
  }

  return out
}

export function getCaptureHandoffText(): string {
  return buildCaptureHandoffMessage()
}

export function getUnavailableHandoffText(): string {
  return buildUnavailableHandoffMessage()
}
