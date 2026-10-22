import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { sections } from '../data'
import { useGame } from '../game'
import { Close, Menu, Volume, VolumeOff } from './icons'
import { goTo } from './ui'

const hudButton =
  'h-9 items-center gap-2 border-2 border-line bg-raised px-2.5 font-pixel text-[9px] text-muted transition-colors hover:border-accent hover:text-fg'

export default function Hud({ onHelp }) {
  const { sound, toggleSound, setSimple, play } = useGame()
  const [active, setActive] = useState(null)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === 'top' ? null : e.target.id)
        }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['top', ...sections.map((s) => s.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const jump = (id) => {
    play('select')
    setOpen(false)
    goTo(id)
  }
  const stage = sections.findIndex((s) => s.id === active)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <button onClick={() => jump('top')} className="flex items-center gap-2.5 font-pixel text-[10px]" aria-label="Main menu">
          <span className="blink text-accent-2" aria-hidden="true">1P</span>
          <span>NICO LIAO</span>
        </button>

        <nav aria-label="Sections" className="ml-6 hidden lg:block">
          <ul className="flex items-center gap-1">
            {sections.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => jump(s.id)}
                  onMouseEnter={() => play('hover')}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={`px-2 py-1.5 font-pixel text-[9px] transition-colors ${
                    active === s.id ? 'bg-accent text-bg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {i + 1}.{s.short.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <p className="ml-2 hidden font-pixel text-[9px] text-faint sm:block lg:hidden" aria-hidden="true">
          {stage >= 0 ? `STAGE ${stage + 1}/${sections.length}` : 'MAIN MENU'}
        </p>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggleSound}
            className={`${hudButton} inline-flex`}
            aria-pressed={sound}
            aria-label={sound ? 'Mute sound effects' : 'Turn on sound effects'}
            title="Sound (M)"
          >
            {sound ? <Volume width={14} height={14} /> : <VolumeOff width={14} height={14} />}
            <span className="hidden sm:inline">SFX {sound ? 'ON' : 'OFF'}</span>
          </button>
          <button onClick={() => setSimple(true)} className={`${hudButton} inline-flex`} title="Plain, résumé-style layout">
            SIMPLE<span className="hidden sm:inline"> MODE</span>
          </button>
          <button onClick={onHelp} className={`${hudButton} hidden sm:inline-flex`} aria-label="Keyboard controls" title="Controls (?)">
            ?
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className={`${hudButton} inline-flex lg:hidden`}
            aria-label={open ? 'Close section menu' : 'Open section menu'}
            aria-expanded={open}
          >
            {open ? <Close width={14} height={14} /> : <Menu width={14} height={14} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Sections"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t-2 border-line lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <button
                    onClick={() => jump(s.id)}
                    className={`flex w-full items-center gap-3 py-3 font-pixel text-[11px] ${active === s.id ? 'text-accent' : 'text-fg'}`}
                  >
                    <span className="text-faint">{i + 1}</span>
                    {s.label.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 -bottom-[2px] h-[2px]" aria-hidden="true">
        <motion.div
          style={{ scaleX: progress }}
          className="h-full origin-left bg-linear-to-r from-accent via-accent-2 to-gold"
        />
      </div>
    </header>
  )
}
