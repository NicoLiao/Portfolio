import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { profile } from '../data'
import { useGame } from '../game'
import { ArrowUpRight, Check, Copy, FileText, Github, Linkedin, Mail } from './icons'
import { Reveal, Stage } from './ui'

const option =
  'group flex w-full items-center gap-3 border-2 border-line bg-raised px-4 py-3.5 text-left transition-colors hover:border-gold focus-visible:border-gold'

export default function Contact() {
  const { play } = useGame()
  const ref = useRef(null)
  const inView = useInView(ref)
  const [count, setCount] = useState(9)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setCount((c) => (c === 0 ? 9 : c - 1)), 1000)
    return () => clearInterval(t)
  }, [inView])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      play('coin')
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }

  const links = [
    { label: 'Email', sub: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { label: 'GitHub', sub: 'github.com/NicoLiao', href: profile.github, icon: Github, external: true },
    { label: 'LinkedIn', sub: 'linkedin.com/in/nico-liao', href: profile.linkedin, icon: Linkedin, external: true },
    { label: 'Resume', sub: 'Résumé (PDF)', href: profile.resume, icon: FileText, external: true },
  ]

  return (
    <Stage id="contact" title="Contact">
      <Reveal>
        <div ref={ref} className="pixel-shadow relative overflow-hidden border-2 border-accent-2 bg-surface px-5 py-14 text-center sm:px-10">
          <div className="stars absolute inset-0 opacity-50" aria-hidden="true" />
          <p className="neon relative font-pixel text-2xl text-gold sm:text-4xl">CONTINUE?</p>
          <p className="relative mt-5 font-pixel text-5xl tabular-nums sm:text-7xl" aria-hidden="true">
            {count}
          </p>
          <p className="relative mx-auto mt-6 max-w-md text-muted">Want to team up or just say hi? Pick an option below.</p>

          <ul className="relative mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
            {links.map(({ label, sub, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel="noreferrer"
                  onMouseEnter={() => play('hover')}
                  onClick={() => play('select')}
                  className={option}
                >
                  <Icon className="shrink-0 text-accent" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-pixel text-[10px]">{label.toUpperCase()}</span>
                    <span className="mt-1 block truncate text-sm text-muted">{sub}</span>
                  </span>
                  <ArrowUpRight className="shrink-0 text-faint transition-colors group-hover:text-gold" />
                </a>
              </li>
            ))}
            <li className="sm:col-span-2">
              <button onClick={copy} onMouseEnter={() => play('hover')} className={`${option} justify-center`}>
                {copied ? <Check className="text-lime" /> : <Copy className="text-accent" />}
                <span className="font-pixel text-[10px]" aria-live="polite">
                  {copied ? 'EMAIL COPIED!' : 'COPY EMAIL ADDRESS'}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </Reveal>
    </Stage>
  )
}
