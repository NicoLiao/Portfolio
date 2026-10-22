import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { featuredProject, projectCategories, projects } from '../data'
import { useGame } from '../game'
import ChessBoard from './ChessBoard'
import { ArrowUpRight, Close, Github } from './icons'
import { Modal, PixelLabel, Reveal, Stage, Tag } from './ui'

const COLORS = {
  Games: 'var(--color-accent-2)',
  AI: 'var(--color-accent)',
  'Tools & Web': 'var(--color-gold)',
}
const all = [{ ...featuredProject, featured: true }, ...projects]

function Cartridge({ project, onOpen }) {
  const { play } = useGame()
  const color = project.featured ? 'var(--color-lime)' : COLORS[project.category]
  return (
    <motion.button
      layout
      id={`project-${project.id}`}
      onClick={() => onOpen(project)}
      onMouseEnter={() => play('hover')}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25 }}
      aria-label={`${project.title}: ${project.category} project. Open details`}
      aria-haspopup="dialog"
      className={`group w-full min-w-0 scroll-mt-24 text-left ${project.featured ? 'sm:col-span-2' : ''}`}
      style={{ '--shadow': color }}
    >
      <div className="pixel-shadow relative flex h-full flex-col border-2 bg-raised p-3 pt-7 transition-shadow group-hover:shadow-[8px_8px_0_0_var(--shadow)]" style={{ borderColor: color }}>
        <div className="cart-ridges absolute inset-x-8 top-2 h-2.5" aria-hidden="true" />
        <div
          className="relative flex flex-1 flex-col border-2 border-bg/50 p-4 sm:p-5"
          style={{ background: `linear-gradient(140deg, color-mix(in oklab, ${color} 22%, var(--color-surface)), var(--color-surface) 70%)` }}
        >
          <div className="flex items-center justify-between gap-2">
            <PixelLabel className="text-fg/80">{project.category.toUpperCase()}</PixelLabel>
            {project.featured && <PixelLabel className="bg-lime px-1.5 py-1 text-bg">★ FEATURED</PixelLabel>}
          </div>
          <h3 className="mt-4 font-pixel text-sm leading-relaxed sm:text-base">{project.title.toUpperCase()}</h3>
          {project.subtitle && <p className="mt-1 text-sm text-fg/80">{project.subtitle}</p>}
          <p className="mt-3 line-clamp-3 text-sm text-muted">{project.summary}</p>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 px-1">
          <span className="truncate font-mono text-[11px] text-faint">{project.tags.join(' · ')}</span>
          <PixelLabel className="shrink-0 text-faint transition-colors group-hover:text-fg">
            START <span className="text-gold">▶</span>
          </PixelLabel>
        </div>
      </div>
    </motion.button>
  )
}

function Details({ project, onClose }) {
  const color = project.featured ? 'var(--color-lime)' : COLORS[project.category]
  return (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-line bg-surface px-5 py-3">
        <PixelLabel className="text-accent">GAME INFO</PixelLabel>
        <button onClick={onClose} className="inline-flex items-center gap-2 font-pixel text-[9px] text-muted hover:text-fg" aria-label="Close details">
          ESC <Close width={16} height={16} />
        </button>
      </div>
      <div className="p-5 sm:p-8">
        <PixelLabel style={{ color }}>{project.category.toUpperCase()}</PixelLabel>
        <h3 id="project-dialog-title" className="mt-3 font-pixel text-lg leading-relaxed sm:text-2xl" style={{ color }}>
          {project.title.toUpperCase()}
        </h3>
        {project.subtitle && <p className="mt-1 text-fg">{project.subtitle}</p>}
        {project.org && (
          <p className="mt-2 font-mono text-xs text-muted">
            {project.org} · {project.role} · {project.period}
          </p>
        )}
        <p className="mt-5 leading-relaxed text-muted">{project.summary}</p>

        {project.points?.length > 0 && (
          <div className="mt-6">
            <PixelLabel className="text-gold">HIGHLIGHTS</PixelLabel>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
              {project.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="text-gold" aria-hidden="true">▸</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6">
          <PixelLabel className="text-gold">BUILT WITH</PixelLabel>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>

        {(project.links.demo || project.links.code) && (
          <div className="mt-7 flex flex-wrap gap-3">
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-2 border-gold bg-gold px-4 py-2.5 font-pixel text-[10px] text-bg hover:bg-transparent hover:text-gold">
                PLAY / DEMO <ArrowUpRight width={14} height={14} />
              </a>
            )}
            {project.links.code && (
              <a href={project.links.code} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-2 border-line px-4 py-2.5 font-pixel text-[10px] text-fg hover:border-accent hover:text-accent">
                <Github width={14} height={14} /> SOURCE
              </a>
            )}
          </div>
        )}

        {project.featured && (
          <div className="mt-8 border-t-2 border-line pt-6">
            <PixelLabel className="text-gold">BONUS ROUND: POLICY VIEWER</PixelLabel>
            <p className="mt-2 mb-4 text-sm text-muted">
              A toy version of the idea behind FixMyElo — see how move preferences might shift with player rating.
            </p>
            <div className="mx-auto max-w-md">
              <ChessBoard />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default function SelectProject() {
  const { play } = useGame()
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)
  const shown = all.filter((p) => filter === 'All' || p.category === filter)

  const openProject = (p) => {
    play('open')
    setOpen(p)
  }
  const close = () => {
    play('close')
    setOpen(null)
  }

  return (
    <Stage id="projects" title="Select Project" subtitle="Pick a cartridge to load its details. Most of these are smaller projects from my earlier portfolio.">
      <Reveal>
        <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
          {projectCategories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setFilter(c)
                play('move')
              }}
              aria-pressed={filter === c}
              className={`border-2 px-3 py-2 font-pixel text-[9px] transition-colors ${
                filter === c ? 'border-accent bg-accent text-bg' : 'border-line text-muted hover:border-faint hover:text-fg'
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <Cartridge key={p.id} project={p} onOpen={openProject} />
          ))}
        </AnimatePresence>
      </motion.div>

      <Modal open={!!open} onClose={close} labelledBy="project-dialog-title">
        {open && <Details project={open} onClose={close} />}
      </Modal>
    </Stage>
  )
}
