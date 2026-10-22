import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import Achievements from './components/Achievements'
import BackToTop from './components/BackToTop'
import Contact from './components/Contact'
import HelpOverlay from './components/HelpOverlay'
import Hud from './components/Hud'
import MainMenu from './components/MainMenu'
import PlayerProfile from './components/PlayerProfile'
import QuestLog from './components/QuestLog'
import SelectProject from './components/SelectProject'
import SimpleMode from './components/SimpleMode'
import SkillTree from './components/SkillTree'
import { goTo } from './components/ui'
import { sections } from './data'
import { GameProvider, useGame } from './game'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
const PIXEL_COLORS = ['#3df5ff', '#ff4fd8', '#ffd23f', '#5dff9b']

// Brief burst of falling pixels for the Konami code.
function PixelRain() {
  const [pixels] = useState(() =>
    Array.from({ length: 48 }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      size: 6 + Math.round(Math.random() * 3) * 3,
      color: PIXEL_COLORS[i % PIXEL_COLORS.length],
    })),
  )
  return (
    <div className="pointer-events-none fixed inset-0 z-[85] overflow-hidden" aria-hidden="true">
      {pixels.map((p, i) => (
        <motion.span
          key={i}
          className="absolute top-0"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, background: p.color }}
          initial={{ y: -20, opacity: 1 }}
          animate={{ y: '105vh', opacity: [1, 1, 0] }}
          transition={{ duration: 1.8, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}

function Arcade() {
  const { play, toggleSound, unlock } = useGame()
  const [help, setHelp] = useState(false)
  const [rain, setRain] = useState(false)

  useEffect(() => {
    console.log('%cNICO LIAO — PLAYER 1 READY', 'font: bold 14px monospace; color: #3df5ff')
    console.log('%cHint: some classic cheat codes still work here.', 'color: #a6a1c9')
  }, [])

  useEffect(() => {
    let pos = 0
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key

      pos = key === KONAMI[pos] ? pos + 1 : key === KONAMI[0] ? 1 : 0
      if (pos === KONAMI.length) {
        pos = 0
        unlock('konami')
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setRain(true)
          setTimeout(() => setRain(false), 2600)
        }
      }

      if (document.querySelector('[aria-modal="true"]')) return
      if (/^[1-6]$/.test(key)) {
        play('select')
        goTo(sections[Number(key) - 1].id)
      } else if (key === '0') {
        play('select')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        document.querySelector('[data-menu-item]')?.focus({ preventScroll: true })
      } else if (key === 'm') {
        toggleSound()
      } else if (key === '?') {
        play('open')
        setHelp(true)
      } else if (
        (key === 'ArrowDown' || key === 'ArrowUp') &&
        document.activeElement === document.body &&
        window.scrollY < window.innerHeight / 2
      ) {
        // From the title screen, arrow keys pick up the menu instead of scrolling.
        e.preventDefault()
        document.querySelector('[data-menu-item]')?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [play, toggleSound, unlock])

  return (
    <div className="crt relative min-h-screen overflow-x-clip">
      <a
        href="#profile"
        className="sr-only z-[100] bg-gold px-4 py-2 font-pixel text-[10px] text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        SKIP TO CONTENT
      </a>
      <Hud
        onHelp={() => {
          play('open')
          setHelp(true)
        }}
      />
      <main>
        <MainMenu />
        <PlayerProfile />
        <SelectProject />
        <QuestLog />
        <SkillTree />
        <Achievements />
        <Contact />
      </main>
      <footer className="border-t-2 border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 font-pixel text-[8px] text-faint sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} NICO LIAO · THANKS FOR PLAYING</span>
          <span>BUILT WITH REACT, VITE &amp; TAILWIND CSS</span>
        </div>
      </footer>
      <HelpOverlay
        open={help}
        onClose={() => {
          play('close')
          setHelp(false)
        }}
      />
      <BackToTop />
      <AnimatePresence>{rain && <PixelRain />}</AnimatePresence>
    </div>
  )
}

function Shell() {
  const { simple } = useGame()
  return simple ? <SimpleMode /> : <Arcade />
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <GameProvider>
        <Shell />
      </GameProvider>
    </MotionConfig>
  )
}
