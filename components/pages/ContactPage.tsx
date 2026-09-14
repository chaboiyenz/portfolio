'use client'

import { contactLinks } from '@/data/contact'

const ROW_LINK_CLASS =
  'group flex items-center justify-between py-[22px] border-b border-edge max-w-[640px] text-fg transition-colors duration-120 ease-out hover:text-accent'

const ARROW_CLASS =
  'text-[1.25rem] opacity-[0.18] transition-[opacity,color] duration-120 ease-out group-hover:opacity-100 group-hover:text-accent'

export default function ContactPage() {
  const year = new Date().getFullYear()

  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden px-12 pt-28 pb-24 flex flex-col max-md:px-5 max-md:pt-22 max-md:pb-20">

      <div className="font-ui text-[10px] tracking-[0.06em] uppercase text-accent-soft mb-5">
        04 — GET IN TOUCH
      </div>

      <h2 className="text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[0.88] tracking-[-0.04em] uppercase mb-14">
        LET&apos;S<br />BUILD<br />TOGETHER.
      </h2>

      {contactLinks.map((link, i) => (
        <a
          key={link.href}
          href={link.href}
          className={`${ROW_LINK_CLASS} ${i === 0 ? 'border-t' : ''}`}
          {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <div>
            <div className="font-ui text-[10px] tracking-[0.06em] uppercase text-muted mb-1">{link.label}</div>
            <div className="text-[clamp(1rem,2.5vw,1.4rem)] font-medium">{link.value}</div>
          </div>
          <div className={ARROW_CLASS}>→</div>
        </a>
      ))}

      <div
        className="mt-16 font-ui text-[10px] tracking-[0.06em] uppercase text-[rgba(242,242,242,0.1)]"
        suppressHydrationWarning
      >
        © {year} Yenzo Gervacio &nbsp;·&nbsp; Jr. Software Engineer
      </div>
    </div>
  )
}
