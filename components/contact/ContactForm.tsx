'use client'

import { useActionState, useEffect, useRef, type ReactNode } from 'react'
import { sendContactMessage } from '@/app/contact/actions'
import { PRIMARY_ACTION_CLASS } from '@/components/ui/actions'
import { CheckCircle } from '@/components/ui/icons'
import { contactForm } from '@/data/site'
import { CONTACT_LIMITS, HONEYPOT_FIELD, type ContactField, type ContactFormState } from '@/lib/contact/schema'

const INITIAL_STATE: ContactFormState = { status: 'idle' }

const CONTROL =
  'block w-full rounded-xl bg-fill px-4 py-3 text-body text-label placeholder:text-tertiary hover:bg-fill-strong aria-invalid:shadow-[inset_0_0_0_1.5px_var(--color-danger)]'

interface ControlProps {
  id: string
  name: ContactField
  'aria-invalid': boolean
  'aria-describedby': string | undefined
  className: string
}

interface FieldProps {
  name: ContactField
  error?: string
  children: (props: ControlProps) => ReactNode
}

/** Label, control, and error line, wired together for assistive tech. */
function Field({ name, error, children }: FieldProps) {
  const id = `contact-${name}`
  const errorId = `${id}-error`
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-footnote font-semibold text-secondary">
        {contactForm.labels[name]}
      </label>
      {children({
        id,
        name,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? errorId : undefined,
        className: CONTROL,
      })}
      {error && (
        <p id={errorId} className="text-footnote text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, INITIAL_STATE)
  const formRef = useRef<HTMLFormElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)
  const errors = state.fieldErrors ?? {}
  const values = state.values
  const formError = !pending && state.status === 'error' ? state.message : undefined
  const success = !pending && state.status === 'success' ? state.message : undefined

  // After a rejected submit, put the cursor on the first problem field. For a
  // form-level error (rate limit, send failure) return focus to the button,
  // which lost it while disabled.
  useEffect(() => {
    if (state.status !== 'error') return
    const invalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
    ;(invalid ?? submitRef.current)?.focus()
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="grid gap-5">
      <Field name="email" error={errors.email}>
        {(props) => (
          <input
            {...props}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            maxLength={CONTACT_LIMITS.emailMax}
            placeholder={contactForm.placeholders.email}
            defaultValue={values?.email}
          />
        )}
      </Field>

      <Field name="message" error={errors.message}>
        {(props) => (
          <textarea
            {...props}
            rows={6}
            required
            minLength={CONTACT_LIMITS.messageMin}
            maxLength={CONTACT_LIMITS.messageMax}
            placeholder={contactForm.placeholders.message}
            defaultValue={values?.message}
            className={`${props.className} min-h-36 resize-y`}
          />
        )}
      </Field>

      {/* Honeypot: off-screen and out of the tab order and accessibility tree. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          ref={submitRef}
          type="submit"
          disabled={pending}
          className={`${PRIMARY_ACTION_CLASS} disabled:opacity-60`}
        >
          {pending ? contactForm.pending : contactForm.submit}
        </button>
        {/* Both regions stay mounted so screen readers announce what appears in them. */}
        <div role="status" className="text-callout">
          {success && (
            <p className="flex items-start gap-2 text-label">
              <CheckCircle className="mt-0.5 size-5 shrink-0 text-accent-ink" />
              {success}
            </p>
          )}
        </div>
        <div role="alert" className="text-callout text-danger empty:hidden">
          {formError}
        </div>
      </div>
    </form>
  )
}
