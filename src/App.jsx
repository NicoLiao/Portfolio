import About from './components/About'
import Contact from './components/Contact'
import CursorGlow from './components/CursorGlow'
import Experience from './components/Experience'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { profile } from './data'

export default function App() {
  return (
    <div className="grain relative min-h-screen overflow-x-clip">
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="relative z-10 border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-8 font-mono text-xs text-faint sm:flex-row sm:px-8">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>Built with React, Vite & Tailwind CSS</span>
        </div>
      </footer>
    </div>
  )
}
