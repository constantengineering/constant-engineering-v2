import { defineEventHandler, readBody, createError } from 'h3'
import { useRuntimeConfig } from 'nitropack/runtime'
import {
  validateLeadBody,
  LeadValidationError,
  type RawLeadBody,
  type ValidatedLead
} from '../utils/leadValidation'

function formatQualification(lead: ValidatedLead): string {
  const labels: Record<string, string> = {
    intent: 'Intent',
    systemType: 'System type',
    requestType: 'Request type',
    notes: 'Notes',
    capacity: 'Capacity',
    productInterest: 'Product interest',
    lastAnswer: 'Last answer'
  }
  const lines = Object.entries(lead.qualification)
    .filter(([, v]) => v)
    .map(([k, v]) => `${labels[k] || k}: ${v}`)
  return lines.length ? lines.join('\n') : 'Not specified'
}

function formatUtm(lead: ValidatedLead): string {
  const entries = Object.entries(lead.utm)
  return entries.length ? entries.map(([k, v]) => `${k}: ${v}`).join('\n') : 'None'
}

function normalizeDeliveryPageUrl(pageUrl: string | null): string | null {
  if (!pageUrl) return null
  try {
    const url = new URL(pageUrl)
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      return null
    }
    return url.toString()
  } catch {
    return null
  }
}

function buildLeadMessage(lead: ValidatedLead) {
  const qualification = formatQualification(lead)
  const utm = formatUtm(lead)
  const pageUrl = normalizeDeliveryPageUrl(lead.pageUrl)
  const subject = `Engineering Lead — ${lead.name}${lead.company ? ` (${lead.company})` : ''}`

  const text = [
    'New engineering consultation lead',
    '================================',
    '',
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Company: ${lead.company || 'Not provided'}`,
    `Request type: ${lead.requestType}`,
    `Submitted at: ${lead.submittedAt}`,
    `Page URL: ${pageUrl || 'Not provided'}`,
    '',
    'Qualification',
    '-------------',
    qualification,
    '',
    'UTM',
    '---',
    utm,
    '',
    'Chat transcript',
    '---------------',
    lead.transcript || '(empty)',
    ''
  ].join('\n')

  return { subject, text, qualification, utm, pageUrl }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const formspreeEndpoint = String(config.formspreeEndpoint || '').trim()

  if (!formspreeEndpoint) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Lead delivery is not configured.'
    })
  }

  let body: RawLeadBody
  try {
    body = await readBody<RawLeadBody>(event)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request body.' })
  }

  let lead: ValidatedLead
  try {
    lead = validateLeadBody(body)
  } catch (err) {
    if (err instanceof LeadValidationError) {
      throw createError({ statusCode: err.statusCode, statusMessage: err.message })
    }
    throw createError({ statusCode: 400, statusMessage: 'Invalid submission.' })
  }

  const { subject, text, qualification, utm, pageUrl } = buildLeadMessage(lead)

  try {
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        _subject: subject,
        _replyto: lead.email,
        _gotcha: '',
        source: 'engineering-chatbot',
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company || 'Not provided',
        requestType: lead.requestType,
        submittedAt: lead.submittedAt,
        pageUrl: pageUrl || 'Not provided',
        qualification,
        utm,
        transcript: lead.transcript || '(empty)',
        message: text
      })
    })

    if (!response.ok) {
      const details = await response.text().catch(() => '')
      throw new Error(`Formspree request failed (${response.status}) ${details.slice(0, 300)}`)
    }
  } catch (err) {
    console.error('[leads.post] Formspree error:', err)
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to deliver lead. Please try again later.'
    })
  }

  return { ok: true, submittedAt: lead.submittedAt }
})
