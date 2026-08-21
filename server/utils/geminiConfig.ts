/** Normalize API key from .env (strip whitespace and wrapping quotes). */
export function normalizeGeminiApiKey(raw: string | undefined): string {
  if (!raw) return ''
  return raw.trim().replace(/^['"]|['"]$/g, '')
}

/**
 * Google AI Studio keys:
 * - New auth keys (default since 2026): start with "AQ."
 * - Legacy standard keys: start with "AIza" (phasing out by Sep 2026)
 * OAuth access tokens ("ya29.") are not valid API keys.
 *
 * AQ keys work with the native Gemini API / @google/generative-ai SDK.
 */
export function getGeminiKeySetupError(key: string): string | null {
  if (!key) {
    return 'GEMINI_API_KEY is not set. Add a Google AI Studio key to .env.'
  }
  if (/^ya29\./.test(key)) {
    return 'Invalid GEMINI_API_KEY type. Use a Google AI Studio API key from https://aistudio.google.com/apikey, not an OAuth token.'
  }
  if (!/^(AIza|AQ\.)/.test(key)) {
    return 'GEMINI_API_KEY does not look like a Google AI Studio key. Create one at https://aistudio.google.com/apikey'
  }
  return null
}

/** Models known to work on free-tier AI Studio projects when others report quota 0. */
export const GEMINI_MODEL_FALLBACKS = [
  'gemini-flash-lite-latest',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash'
] as const

export function resolveGeminiModel(configured: string | undefined): string {
  const fromEnv = (process.env.GEMINI_MODEL || process.env.NUXT_GEMINI_MODEL || '').trim()
  const primary = (fromEnv || configured || 'gemini-flash-lite-latest').trim()
  return primary || 'gemini-flash-lite-latest'
}

export function geminiModelCandidates(configured: string | undefined): string[] {
  const primary = resolveGeminiModel(configured)
  return [primary, ...GEMINI_MODEL_FALLBACKS.filter((m) => m !== primary)]
}

export function isRetryableGeminiModelError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err)
  return (
    message.includes('429') ||
    (message.includes('404') && message.includes('models/')) ||
    /quota|rate.?limit|Too Many Requests|not found/i.test(message)
  )
}

export function geminiAuthErrorMessage(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err)
  // Log-friendly checks stay server-side; visitors only see a generic recovery message.
  if (
    message.includes('401') ||
    message.includes('ACCESS_TOKEN_TYPE_UNSUPPORTED') ||
    (message.includes('404') && message.includes('models/')) ||
    message.includes('429') ||
    /quota|rate.?limit|Too Many Requests/i.test(message)
  ) {
    return 'The assistant is busy right now. Please try again in a minute, or call our team directly.'
  }
  return 'The assistant is temporarily unavailable. Please try again or contact our team directly.'
}
