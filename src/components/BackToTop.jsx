import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useGame } from '../game'
import { ArrowDown } from './icons'

const styles = {
  arcade:
    'pixel-shadow border-2 border-accent bg-surface/90 text-accent [--shadow:var(--color-accent-2)] hover:bg-accent hover:text-bg',
  simple: 'rounded-full border border-zinc-300 bg-white text-zinc-700 shadow-md hover:bg-zinc-100',
}

// Small up-arrow button, shown once you've scrolled past the first screen.
export default function BackToTop({ variant = 'arcade' }) {
  const { play } = useGame()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    play('select')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    document.querySelector('[data-menu-item]')?.focus({ preventScroll: true })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={toTop}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          aria-label="Back to top"
          title="Back to top"
          className={`fixed bottom-5 right-5 z-40 flex h-10 w-10 items-center justify-center transition-colors ${styles[variant]}`}
        >
          <ArrowDown className="rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
