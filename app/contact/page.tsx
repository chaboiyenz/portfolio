import type { Metadata } from 'next'
import Container from '@/components/ui/Container'
import PageHeader from '@/components/ui/PageHeader'
import PageTransition from '@/components/motion/PageTransition'
import ContactForm from '@/components/contact/ContactForm'
import ContactTile from '@/components/contact/ContactTile'
import { contactLinks } from '@/data/contact'
import { contactPage, routeMeta } from '@/data/site'
import { routeMetadata } from '@/lib/metadata'

export const metadata: Metadata = routeMetadata({ ...routeMeta.contact, path: '/contact' })

export default function ContactPage() {
  return (
    <PageTransition>
      <Container>
        <PageHeader eyebrow={contactPage.eyebrow} title={contactPage.title} />
        {/* Form first: it's the primary action, on phones and on desktop. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
          <section aria-labelledby="contact-form-title" className="rounded-card bg-surface p-6 shadow-card sm:p-8 lg:p-10">
            <h2 id="contact-form-title" className="text-title-2">
              {contactPage.formTitle}
            </h2>
            <p className="mt-2 mb-8 text-body text-secondary">{contactPage.formIntro}</p>
            <ContactForm />
          </section>

          <section aria-labelledby="contact-elsewhere-title">
            <h2 id="contact-elsewhere-title" className="mb-4 text-callout font-semibold text-secondary">
              {contactPage.elsewhereTitle}
            </h2>
            <ul className="grid gap-4">
              {contactLinks.map((link) => (
                <li key={link.label} className="grid">
                  <ContactTile link={link} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>
    </PageTransition>
  )
}
