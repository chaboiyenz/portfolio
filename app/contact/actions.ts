'use server'

import { headers } from 'next/headers'
import { contactForm } from '@/data/site'
import { isRateLimited } from '@/lib/contact/rate-limit'
import { HONEYPOT_FIELD, readContactValues, validateContact, type ContactFormState } from '@/lib/contact/schema'
import { sendContactEmail } from '@/lib/contact/send'

/** Best-effort client IP for rate limiting. x-real-ip is set by the platform
 *  (Vercel, most proxies) and can't be spoofed there. The first x-forwarded-for
 *  hop is only trustworthy when the host overwrites that header, which is why
 *  the limiter also has a global ceiling. */
async function clientKey(): Promise<string> {
  const h = await headers()
  return h.get('x-real-ip')?.trim() || h.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

export async function sendContactMessage(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // A filled honeypot is a bot: report success so it doesn't retry, send nothing.
  if (formData.get(HONEYPOT_FIELD)) return { status: 'success', message: contactForm.success }

  const values = readContactValues(formData)
  const fieldErrors = validateContact(values)
  if (fieldErrors) return { status: 'error', fieldErrors, values }

  if (isRateLimited(await clientKey())) {
    return { status: 'error', message: contactForm.errors.rateLimited, values }
  }

  const result = await sendContactEmail(values)
  if (!result.ok) return { status: 'error', message: contactForm.errors.sendFailed, values }

  return { status: 'success', message: contactForm.success }
}
