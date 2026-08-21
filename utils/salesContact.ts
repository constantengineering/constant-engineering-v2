/** Sales contact SLA copy — shared by chat handoff and lead confirmation. */

const BUSINESS_TIMEZONE = 'Africa/Addis_Ababa'

/** Office hours in Addis Ababa (EAT): Monday–Friday 8:30 AM – 5:30 PM */
const OFFICE_OPEN_MINUTES = 8 * 60 + 30
const OFFICE_CLOSE_MINUTES = 17 * 60 + 30

interface EatClock {
  weekday: string
  hour: number
  minute: number
}

function getEatClock(date: Date): EatClock {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: BUSINESS_TIMEZONE,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  })
  const parts = formatter.formatToParts(date)
  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon'
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0)
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0)
  return { weekday, hour, minute }
}

export function isBusinessWeekday(date = new Date()): boolean {
  const { weekday } = getEatClock(date)
  return weekday !== 'Sat' && weekday !== 'Sun'
}

export function isWithinBusinessHours(date = new Date()): boolean {
  if (!isBusinessWeekday(date)) return false
  const { hour, minute } = getEatClock(date)
  const now = hour * 60 + minute
  return now >= OFFICE_OPEN_MINUTES && now < OFFICE_CLOSE_MINUTES
}

/** Short phrase for inline use in chat and lead confirmation messages. */
export function getSalesContactTimingPhrase(date = new Date()): string {
  if (isWithinBusinessHours(date)) {
    return 'within 1 hour during business hours (Mon–Fri, 8:30 AM–5:30 PM EAT)'
  }
  if (isBusinessWeekday(date)) {
    return 'within 24 hours (our sales team operates Mon–Fri, 8:30 AM–5:30 PM EAT)'
  }
  return 'within 24 hours'
}

export function buildCaptureHandoffMessage(date = new Date()): string {
  return `Please fill out the form below so our sales team can contact you ${getSalesContactTimingPhrase(date)}.`
}

/** Shown when the AI assistant is unavailable — still collect the lead. */
export function buildUnavailableHandoffMessage(date = new Date()): string {
  return `Our assistant is busy right now. In the meantime, fill out the form below so our sales team can contact you ${getSalesContactTimingPhrase(date)}.`
}

export function buildLeadSuccessMessage(date = new Date()): string {
  return `Thank you — your request has been received. Our sales team will contact you ${getSalesContactTimingPhrase(date)}.`
}
