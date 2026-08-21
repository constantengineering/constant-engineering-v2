import {
  AGENT_BEHAVIOR,
  formatAgentKnowledgePrompt,
  formatProductDetail,
  retrieveRelevantProducts
} from './agentKnowledge'

export function buildSystemPrompt(userMessage: string, pageUrl: string | null): string {
  const knowledge = formatAgentKnowledgePrompt()
  const focused = retrieveRelevantProducts(userMessage)
  const focusedBlock = focused.length
    ? focused.map((p) => formatProductDetail(p)).join('\n\n')
    : ''

  return `
You are ${AGENT_BEHAVIOR.role}.

GOAL: ${AGENT_BEHAVIOR.primaryGoal}
TONE: ${AGENT_BEHAVIOR.tone.join(', ')}

PRIMARY OBJECTIVE: Get the visitor to the contact form quickly. Sales qualifies details on callback — you are not a long qualification bot.

RULES (never break these):
${AGENT_BEHAVIOR.rules.map((r) => `- ${r}`).join('\n')}

KNOWLEDGE BASE (only source of truth — do not invent facts beyond this):
${knowledge}
${focusedBlock ? `\nFOCUSED PRODUCTS FOR THIS QUESTION:\n${focusedBlock}` : ''}
${pageUrl ? `\nVISITOR CONTEXT (internal only — do not mention this URL or any page link to the visitor): ${pageUrl}` : ''}

RESPONSE STYLE:
- Answer in plain text only (no JSON, no markdown headers, no links).
- Keep replies to 1–2 short sentences maximum.
- Ask at most ONE follow-up question in the entire conversation, then stop — a contact form appears for name and phone.
- Never ask: new project vs maintenance, backup vs prime power, application/facility type, or industrial vs commercial — sales handles that.
- When the visitor names a product or capacity, acknowledge briefly and stop — do not ask another qualifier.
- Answer factual product questions using the knowledge base; never send visitors to website pages.
- Never provide prices, quotes, or timelines not in the knowledge base.
- When human follow-up is needed, one short sentence only — a contact form appears automatically. Never list quotation/engineer/WhatsApp options.
- For vague greetings, welcome them and ask what product or project they need — one question only.
`.trim()
}

export function buildQualificationUpdate(
  userMessage: string,
  existing: { intent?: string; systemType?: string; requestType?: string; notes?: string }
): { intent?: string; systemType?: string; requestType?: string; notes?: string } {
  const lower = userMessage.toLowerCase()
  const update: {
    intent?: string
    systemType?: string
    requestType?: string
    notes?: string
  } = {
    notes: userMessage
  }

  if (!existing.intent) {
    if (/\bmaintenance|repair|breakdown|fault\b/.test(lower)) {
      update.intent = 'Maintenance Issue'
    } else if (/\bproject|install|build|factory|plant\b/.test(lower)) {
      update.intent = 'New Engineering Project'
    }
  }

  if (!existing.systemType) {
    if (/\b(electrical|wiring|panel|ups|switchgear)\b/.test(lower)) {
      update.systemType = 'Electrical Systems'
    } else if (/\b(hvac|cooling|chiller|refrigeration|pump|generator|mechanical)\b/.test(lower)) {
      update.systemType = 'Mechanical Systems'
    } else if (/\b(automation|plc|electromechanical)\b/.test(lower)) {
      update.systemType = 'Electromechanical'
    } else if (/\b(industrial|factory|plant|facility|warehouse)\b/.test(lower)) {
      update.systemType = 'Industrial Facility'
    }
  }

  if (!existing.requestType && /\bwhatsapp\b/i.test(lower)) {
    update.requestType = 'WhatsApp'
  }

  return update
}

/** Strip URLs and site paths the model may still emit despite prompt rules. */
export function sanitizeChatReply(text: string): string {
  return text
    .replace(/\s*(you can find more (details |info )?at|see|visit|check)\s*:?\s*/gi, ' ')
    .replace(/https?:\/\/[^\s)]+/gi, '')
    .replace(/\/?products\/[\w-]+/gi, '')
    .replace(/\bconstanteng\.com\b[^\s]*/gi, '')
    .replace(/\s+([.,!?])/g, '$1')
    .replace(/\bat\s*[.,]/gi, '.')
    .replace(/\s{2,}/g, ' ')
    .trim()
}
