import Image from 'next/image'
import type { ProjectImage } from '@/types/portfolio'

export type MediaAspect = '16/9' | '16/10'

const ASPECT_CLASS: Record<MediaAspect, string> = {
  '16/9': 'aspect-video',
  '16/10': 'aspect-[16/10]',
}

interface ProjectMediaProps {
  image?: ProjectImage
  /** Placeholder ratio, used only until an image is supplied. A real image
   *  sets its own ratio from its dimensions so a screenshot is never cropped. */
  aspect: MediaAspect
  sizes: string
  /** Load immediately instead of lazily, for the first card on the page. */
  eager?: boolean
  className?: string
}

// Taller than 4:3 (e.g. a portrait phone screenshot): taking the image's own
// ratio would make the card several times taller than its siblings.
const TALL_RATIO = 0.8

/** Screenshot slot. Without an image it renders a neutral surface at the
 *  placeholder ratio. A landscape image sets the slot to its own ratio so it is
 *  never cropped; a tall one sits whole, centered on a neutral stage at the
 *  placeholder ratio. */
export default function ProjectMedia({ image, aspect, sizes, eager = false, className = '' }: ProjectMediaProps) {
  if (!image) {
    return (
      <div
        className={`rounded-media media-placeholder ${ASPECT_CLASS[aspect]} ${className}`}
        data-media-slot={aspect}
      />
    )
  }

  if (image.height / image.width > TALL_RATIO) {
    return (
      <div className={`relative overflow-hidden rounded-media media-placeholder ${ASPECT_CLASS[aspect]} ${className}`}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          className="absolute inset-0 size-full object-contain p-[5%] drop-shadow-xl"
        />
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden rounded-media bg-fill shadow-chip ${className}`}
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  )
}
