import { useEffect, useRef } from 'react'

// Large, soft light that trails the cursor on pointer devices.
export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current
    let x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y, raf
    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      el.style.opacity = '1'
    }
    const tick = () => {
      cx += (x - cx) * 0.12
      cy += (y - cy) * 0.12
      el.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove)
    tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-700"
      style={{ background: 'radial-gradient(circle, rgba(143,163,255,0.07), transparent 65%)' }}
    />
  )
}
