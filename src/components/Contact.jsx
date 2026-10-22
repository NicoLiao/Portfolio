import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { isPlaceholder, profile } from '../data'
import { Check, Copy, FileText, Github, Linkedin, Mail } from './icons'
import { LinkIcon, Reveal, Section } from './ui'

// Button that leans toward the cursor.
function Magnetic({ children }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x, y }} className="inline-block">
      {children}
    </motion.div>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const placeholder = isPlaceholder(profile.email)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <Section id="contact" index="05" title="Contact">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/60 px-6 py-16 text-center sm:px-12 sm:py-24">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <Reveal>
          <h3 className="relative text-4xl font-semibold tracking-tighter sm:text-6xl">
            Let's build
            <br />
            <span className="bg-linear-to-r from-accent to-accent-2 bg-clip-text text-transparent">something together.</span>
          </h3>
          <p className="relative mx-auto mt-5 max-w-md text-muted">
            I'm open to internships, research, and interesting projects. Reach out — I'll get back to you.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <a
                href={placeholder ? undefined : `mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg"
              >
                <Mail /> Say hello
              </a>
            </Magnetic>
            <button
              onClick={copy}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-bg/60 px-5 py-3 font-mono text-sm text-muted transition-colors hover:border-faint hover:text-fg"
            >
              <span className={`truncate ${placeholder ? 'italic text-faint' : ''}`}>{profile.email}</span>
              {copied ? <Check className="shrink-0 text-emerald-400" /> : <Copy className="shrink-0" />}
            </button>
          </div>
        </Reveal>

        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-6">
          <LinkIcon href={profile.github} label="GitHub">
            <Github /> GitHub
          </LinkIcon>
          <LinkIcon href={profile.linkedin} label="LinkedIn">
            <Linkedin /> LinkedIn
          </LinkIcon>
          <LinkIcon href={profile.resume} label="Résumé">
            <FileText /> Résumé
          </LinkIcon>
        </div>
      </div>
    </Section>
  )
}
