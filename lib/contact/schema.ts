import { contactForm } from '@/data/site'

export type ContactField = 'email' | 'message'

export interface ContactInput {
  email: string
  message: string
}

export type ContactFieldErrors = Partial<Record<ContactField, string>>

export interface ContactFormState {
  status: 'idle' | 'success' | 'error'
  /** Form-level message (send failure, rate limit). Field problems go in fieldErrors. */
  message?: string
  fieldErrors?: ContactFieldErrors
  /** Echoed back on error so the visitor doesn't lose what they typed. */
  values?: ContactInput
}

/** Name of the hidden field bots fill in and people never see. Deliberately
 *  meaningless: names like "company" or "website" get filled by browser
 *  autofill, which would silently drop a real visitor's message. */
export const HONEYPOT_FIELD = 'contact_hp'

export const CONTACT_LIMITS = {
  emailMax: 254,
  messageMin: 10,
  messageMax: 5000,
} as const

// A single plain address. Strict on purpose: it becomes reply_to (which Resend
// parses as an address list) and goes into the subject, so commas, angle
// brackets, quotes and control characters must not get through. Resend does
// the real deliverability check.
const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/

function readString(formData: FormData, key: string): string {
  const value = formData.get(key)
  // Browsers submit textarea newlines as CRLF but count them as one character
  // for maxLength; normalising keeps client and server lengths in agreement.
  return typeof value === 'string' ? value.replace(/\r\n?/g, '\n').trim() : ''
}

/** Pulls the fields out of untrusted form data. */
export function readContactValues(formData: FormData): ContactInput {
  return {
    email: readString(formData, 'email'),
    message: readString(formData, 'message'),
  }
}

/** Returns field errors, or null when the input is valid. */
export function validateContact(input: ContactInput): ContactFieldErrors | null {
  const { errors } = contactForm
  const emailValid = input.email.length <= CONTACT_LIMITS.emailMax && EMAIL_PATTERN.test(input.email)
  const fieldErrors: ContactFieldErrors = {
    ...(!emailValid && { email: errors.emailInvalid }),
    ...(input.message.length < CONTACT_LIMITS.messageMin && { message: errors.messageTooShort }),
    ...(input.message.length > CONTACT_LIMITS.messageMax && { message: errors.messageTooLong }),
  }
  return Object.keys(fieldErrors).length > 0 ? fieldErrors : null
}
