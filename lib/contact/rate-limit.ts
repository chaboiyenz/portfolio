import 'server-only'

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
// Ceiling across all visitors, so rotating IPs can't flood the inbox or the
// Resend quota. Generous for a portfolio; raise it if it ever bites.
const GLOBAL_WINDOW_MS = 60 * 60 * 1000
const GLOBAL_MAX_PER_WINDOW = 30
// Hard cap on tracked visitors, so a flood of unique keys can't grow memory.
const MAX_TRACKED_KEYS = 1000

// In-memory and per server instance: enough to stop casual abuse, not a
// distributed limit. On serverless hosts each cold instance starts empty, so
// put a shared store (e.g. Upstash) here if abuse shows up.
const hits = new Map<string, readonly number[]>()
let globalHits: readonly number[] = []

function prune(now: number) {
  for (const [key, times] of hits) {
    if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
  }
}

/** Records an attempt for `key` and reports whether it is over any limit. */
export function isRateLimited(key: string, now: number = Date.now()): boolean {
  globalHits = globalHits.filter((t) => now - t < GLOBAL_WINDOW_MS)
  if (globalHits.length >= GLOBAL_MAX_PER_WINDOW) return true

  if (!hits.has(key) && hits.size >= MAX_TRACKED_KEYS) {
    prune(now)
    if (hits.size >= MAX_TRACKED_KEYS) return true
  }

  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent)
    return true
  }
  hits.set(key, [...recent, now])
  globalHits = [...globalHits, now]
  return false
}
