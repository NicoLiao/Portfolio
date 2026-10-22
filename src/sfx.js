// Tiny chiptune sound effects synthesized with the Web Audio API (no audio files).
let ctx

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(freq, { dur = 0.08, type = 'square', vol = 0.03, to, delay = 0 } = {}) {
  const ac = audio()
  if (!ac) return
  const t = ac.currentTime + delay
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  if (to) osc.frequency.exponentialRampToValueAtTime(to, t + dur)
  gain.gain.setValueAtTime(vol, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(gain).connect(ac.destination)
  osc.start(t)
  osc.stop(t + dur + 0.02)
}

export const sfx = {
  hover: () => tone(1200, { dur: 0.025, vol: 0.01 }),
  move: () => tone(740, { dur: 0.04, vol: 0.018 }),
  select: () => {
    tone(880, { dur: 0.06 })
    tone(1320, { dur: 0.09, delay: 0.06 })
  },
  open: () => tone(440, { dur: 0.12, to: 880, vol: 0.025 }),
  close: () => tone(660, { dur: 0.1, to: 330, vol: 0.02 }),
  coin: () => {
    tone(988, { dur: 0.07 })
    tone(1319, { dur: 0.3, delay: 0.07 })
  },
  unlock: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, { dur: 0.12, delay: i * 0.09 })),
}
