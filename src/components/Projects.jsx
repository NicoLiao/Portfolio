import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { featuredProject as fp, projectCategories, projects } from '../data'
import ChessBoard from './ChessBoard'
import { ArrowUpRight, Github } from './icons'
import { LinkIcon, Reveal, Section, SpotlightCard, Tag } from './ui'

function Links({ links }) {
  if (!links.code && !links.demo) return null
  return (
    <div className="flex items-center gap-4">
      {links.code && (
        <LinkIcon href={links.code} label="Source code">
          <Github width={16} height={16} /> Code
        </LinkIcon>
      )}
      {links.demo && (
        <LinkIcon href={links.demo} label="Live demo">
          <ArrowUpRight width={16} height={16} /> Demo
        </LinkIcon>
      )}
    </div>
  )
}

function Featured() {
  return (
    <SpotlightCard className="overflow-hidden">
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="rounded-full bg-accent/10 px-2.5 py-1 text-accent ring-1 ring-accent/30">Featured</span>
            <span className="text-muted">
              {fp.org} · {fp.role}
            </span>
            <span className="text-faint">{fp.period}</span>
          </div>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
            {fp.title}
            <span className="block text-lg font-medium text-muted sm:text-xl">{fp.subtitle}</span>
          </h3>
          <p className="mt-4 leading-relaxed text-muted">{fp.summary}</p>
          <ul className="mt-6 space-y-2.5 text-[15px] leading-relaxed text-muted">
            {fp.points.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2.5 h-px w-3 shrink-0 bg-faint" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {fp.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-7">
            <Links links={fp.links} />
          </div>
        </div>
        <ChessBoard />
      </div>
    </SpotlightCard>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const shown = projects.filter((p) => filter === 'All' || p.category === filter)

  return (
    <Section id="projects" index="03" title="Projects">
      <Reveal>
        <Featured />
      </Reveal>

      <Reveal>
        <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">More things I've built</h3>
            <p className="mt-1 text-sm text-muted">Smaller games, AI experiments, and tools from over the years.</p>
          </div>
          <div className="flex flex-wrap gap-1 rounded-full border border-line bg-surface/60 p-1 self-start sm:self-auto">
            {projectCategories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`relative isolate rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  filter === c ? 'text-bg' : 'text-muted hover:text-fg'
                }`}
              >
                {filter === c && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-fg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {c}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <SpotlightCard className="flex h-full flex-col p-6">
                <span className="font-mono text-xs text-faint">{p.category}</span>
                <h4 className="mt-3 text-lg font-semibold tracking-tight">{p.title}</h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <div className="mt-5 border-t border-line pt-4">
                  <Links links={p.links} />
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
