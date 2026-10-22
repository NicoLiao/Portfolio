import { useRef } from 'react'
import { motion } from 'motion/react'
import { isPlaceholder } from '../data'

const ease = [0.21, 0.47, 0.32, 0.98]

export function Reveal({ children, delay = 0, y = 24, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function Section({ id, index, title, children }) {
  return (
    <section id={id} className="scroll-mt-16 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-12 flex items-center gap-4 sm:mb-16">
            <span className="font-mono text-sm text-accent">{index}</span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            <span className="h-px flex-1 bg-linear-to-r from-line to-transparent" />
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

// Card with a soft glow that follows the cursor.
export function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--x', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`spotlight relative rounded-2xl border border-line bg-surface/70 transition-colors duration-300 hover:border-faint/70 ${className}`}
    >
      {children}
    </div>
  )
}

export function Tag({ children }) {
  const ph = isPlaceholder(children)
  return (
    <span
      className={`rounded-full px-2.5 py-1 font-mono text-[11px] ${
        ph ? 'border border-dashed border-line text-faint' : 'bg-raised text-muted ring-1 ring-line'
      }`}
    >
      {children}
    </span>
  )
}

// Renders text, dimming it if it's a [placeholder].
export function Text({ children, className = '' }) {
  return (
    <span className={`${className} ${isPlaceholder(children) ? 'italic text-faint' : ''}`}>{children}</span>
  )
}

export function LinkIcon({ href, label, children }) {
  const missing = !href || href === '#'
  return (
    <a
      href={href}
      target={missing ? undefined : '_blank'}
      rel="noreferrer"
      aria-label={label}
      title={missing ? `${label} — add link in src/data.js` : label}
      className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
    >
      {children}
    </a>
  )
}
