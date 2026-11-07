interface PageHeaderProps {
  eyebrow: string
  title: string
}

/** Route-level heading: a quiet eyebrow over a large, tight display line. */
export default function PageHeader({ eyebrow, title }: PageHeaderProps) {
  return (
    <header className="pt-[clamp(4rem,10vw,8rem)] pb-[clamp(2.5rem,6vw,4.5rem)]">
      <p className="text-callout font-semibold text-secondary">{eyebrow}</p>
      <h1 className="mt-3 text-display">{title}</h1>
    </header>
  )
}
