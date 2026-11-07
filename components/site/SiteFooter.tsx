import Container from '@/components/ui/Container'
import { SITE_NAME, SITE_ROLE } from '@/data/site'

export default function SiteFooter() {
  // Rendered at build time. A redeploy refreshes the year.
  const year = new Date().getFullYear()

  return (
    <footer className="pt-24 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <Container>
        <p className="text-footnote text-secondary">
          © {year} {SITE_NAME} | {SITE_ROLE}
        </p>
      </Container>
    </footer>
  )
}
