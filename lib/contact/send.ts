import 'server-only'
import type { ContactInput } from '@/lib/contact/schema'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const REQUEST_TIMEOUT_MS = 10_000
const DEFAULT_FROM = 'Portfolio <onboarding@resend.dev>'

export type SendResult = { ok: true } | { ok: false }

function readConfig() {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM
  return apiKey && to ? { apiKey, to, from } : null
}

/** Sends the message to the site owner through Resend's REST API. Replying to
 *  the email goes straight to the visitor. Plain text only, so visitor input is
 *  never rendered as HTML. */
export async function sendContactEmail(input: ContactInput): Promise<SendResult> {
  const config = readConfig()
  if (!config) {
    console.error('[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set')
    return { ok: false }
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: input.email,
        subject: `Portfolio message from ${input.email}`,
        text: `${input.message}\n\nFrom: ${input.email}`,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      cache: 'no-store',
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      console.error(`[contact] Resend responded ${response.status}: ${detail.slice(0, 500)}`)
      return { ok: false }
    }
    return { ok: true }
  } catch (error) {
    console.error('[contact] Resend request failed', error)
    return { ok: false }
  }
}
