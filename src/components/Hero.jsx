import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { profile, typewriterWords } from '../data'
import NeuralCanvas from './NeuralCanvas'
import { ArrowDown, ArrowUpRight } from './icons'

function Typewriter({ words }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[i % words.length]
    let t
    if (!deleting && text === word) t = setTimeout(() => setDeleting(true), 1800)
    else if (deleting && text === '')
      t = setTimeout(() => {
        setDeleting(false)
        setI((n) => n + 1)
      }, 250)
    else
      t = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 35 : 75,
      )
    return () => clearTimeout(t)
  }, [text, deleting, i, words])

  return (
    <span className="bg-linear-to-r from-accent to-accent-2 bg-clip-text text-transparent">
      {text}
      <span className="caret ml-0.5 font-light text-accent">|</span>
    </span>
  )
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }
const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden">
      <NeuralCanvas className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-bg)_85%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-bg" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-6xl px-5 pt-16 sm:px-8"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 font-mono text-xs text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.program} @ {profile.school}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-7 text-5xl font-semibold tracking-tighter sm:text-7xl lg:text-8xl"
        >
          Hi, I'm {profile.name}.
        </motion.h1>

        <motion.p variants={item} className="mt-5 text-2xl font-medium tracking-tight text-muted sm:text-4xl">
          I like building <Typewriter words={typewriterWords} />
        </motion.p>

        <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            View my work
            <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-5 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:border-faint"
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.4 }, y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-faint hover:text-fg"
      >
        <ArrowDown />
      </motion.a>
    </section>
  )
}
