import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { sections } from '../data'

const ease = [0.21, 0.47, 0.32, 0.98]

// Scroll to a section and move keyboard focus to it.
export function goTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  el.querySelector('[data-focus]')?.focus({ preventScroll: true })
}

export function Reveal({ children, delay = 0, y = 20, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function Stage({ id, title, subtitle, children }) {
  const n = sections.findIndex((s) => s.id === id) + 1
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <header className="mb-10 sm:mb-14">
            <p className="font-pixel text-[10px] tracking-widest text-accent-2">
              STAGE {n}/{sections.length}
            </p>
            <h2
              id={`${id}-title`}
              tabIndex={-1}
              data-focus
              className="neon mt-4 font-pixel text-xl leading-snug text-accent outline-none sm:text-3xl"
            >
              {title.toUpperCase()}
            </h2>
            {subtitle && <p className="mt-4 max-w-2xl text-muted">{subtitle}</p>}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

export function Tag({ children }) {
  return (
    <span className="border border-line bg-raised px-2 py-1 font-mono text-[11px] text-muted">{children}</span>
  )
}

export function PixelLabel({ children, className = '', ...rest }) {
  return (
    <span className={`font-pixel text-[9px] tracking-wider ${className}`} {...rest}>
      {children}
    </span>
  )
}

// Accessible dialog: focus moves in and is trapped, Esc / backdrop closes, focus returns on close.
export function Modal({ open, onClose, labelledBy, children, className = '' }) {
  const ref = useRef(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    ref.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onCloseRef.current()
      } else if (e.key === 'Tab' && ref.current) {
        const items = ref.current.querySelectorAll('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])')
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus?.({ preventScroll: true })
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            initial={{ y: 30, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 30, scale: 0.97 }}
            transition={{ duration: 0.25, ease }}
            className={`pixel-shadow relative max-h-[92svh] w-full overflow-y-auto border-2 border-accent bg-surface outline-none [--shadow:var(--color-accent)] sm:max-w-3xl ${className}`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
