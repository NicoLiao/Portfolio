import { useMemo, useState } from 'react'
import { motion } from 'motion/react'

// Interactive opening board: pick a white pawn or knight to see a policy-style
// heatmap over its moves, then play one. An Elo slider sharpens or flattens the
// distribution, echoing FixMyElo's rating-aware move model. Values are illustrative.

const START = ['rnbqkbnr', 'pppppppp', '........', '........', '........', '........', 'PPPPPPPP', 'RNBQKBNR']
const GLYPH = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' }
const FILES = 'abcdefgh'
const sq = (r, c) => FILES[c] + (8 - r)

const PRIOR = {
  e2e4: 0.31, d2d4: 0.27, g1f3: 0.13, c2c4: 0.11, e2e3: 0.03, g2g3: 0.03,
  b1c3: 0.02, d2d3: 0.02, c2c3: 0.015, b2b3: 0.015, f2f4: 0.01,
}

// Each piece keeps a stable id so it can animate between squares.
const initialBoard = () =>
  START.map((row, r) => [...row].map((p, c) => (p === '.' ? null : { p, id: `${p}${sq(r, c)}` })))

// Raise base priors to a rating-dependent power and renormalize over all 20
// opening moves: low ratings spread probability out, high ratings concentrate it.
function priorsAt(elo) {
  const board = initialBoard()
  const keys = []
  for (let r = 6; r < 8; r++)
    for (let c = 0; c < 8; c++)
      for (const to of movesFrom(board, r, c)) keys.push(sq(r, c) + sq(...to))
  const k = 0.35 + ((elo - 800) / 1600) * 1.05
  const raw = keys.map((key) => (PRIOR[key] ?? 0.005) ** k)
  const total = raw.reduce((a, b) => a + b, 0)
  return Object.fromEntries(keys.map((key, i) => [key, raw[i] / total]))
}

function movesFrom(board, r, c) {
  const piece = board[r][c]?.p
  if (piece === 'P') {
    if (board[r - 1][c]) return []
    return r === 6 && !board[r - 2][c] ? [[r - 1, c], [r - 2, c]] : [[r - 1, c]]
  }
  if (piece === 'N') {
    return [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]
      .map(([dr, dc]) => [r + dr, c + dc])
      .filter(([a, b]) => a >= 0 && a < 8 && b >= 0 && b < 8 && !board[a][b])
  }
  return []
}

export default function ChessBoard() {
  const [board, setBoard] = useState(initialBoard)
  const [sel, setSel] = useState(null)
  const [played, setPlayed] = useState(null)
  const [elo, setElo] = useState(1500)

  const priors = useMemo(() => priorsAt(elo), [elo])
  const prior = (from, to) => priors[sq(...from) + sq(...to)]
  const targets = sel ? movesFrom(board, ...sel).map(([r, c]) => ({ r, c, p: prior(sel, [r, c]) })) : []
  const maxP = Math.max(0.01, ...targets.map((t) => t.p))

  const onSquare = (r, c) => {
    if (played) return
    const t = targets.find((t) => t.r === r && t.c === c)
    if (t) {
      const next = board.map((row) => [...row])
      next[r][c] = next[sel[0]][sel[1]]
      next[sel[0]][sel[1]] = null
      setBoard(next)
      setPlayed({ from: sel, to: [r, c] })
      setSel(null)
      return
    }
    const piece = board[r][c]?.p
    const same = sel && sel[0] === r && sel[1] === c
    setSel((piece === 'P' || piece === 'N') && !same ? [r, c] : null)
  }

  const reset = () => {
    setBoard(initialBoard())
    setPlayed(null)
    setSel(null)
  }

  return (
    <div className="w-full">
      <div className="@container relative aspect-square w-full overflow-hidden border-2 border-line">
        <div className="grid h-full w-full grid-cols-8 grid-rows-8">
          {board.map((row, r) =>
            row.map((cell, c) => {
              const dark = (r + c) % 2 === 1
              const target = targets.find((t) => t.r === r && t.c === c)
              const isSel = sel && sel[0] === r && sel[1] === c
              const isLast =
                played && ((played.from[0] === r && played.from[1] === c) || (played.to[0] === r && played.to[1] === c))
              const hint = !sel && !played && r === 6 && c === 4
              const clickable = !played && (target || cell?.p === 'P' || cell?.p === 'N')
              return (
                <button
                  key={`${r}${c}`}
                  onClick={() => onSquare(r, c)}
                  aria-label={`${sq(r, c)}${cell ? ` ${cell.p}` : ''}`}
                  className={`relative flex items-center justify-center ${dark ? 'bg-[#1a1630]' : 'bg-[#2b2550]'} ${
                    clickable ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  {isLast && <span className="absolute inset-0 bg-accent/20" />}
                  {isSel && <span className="absolute inset-0 bg-accent/30 ring-2 ring-inset ring-accent" />}
                  {hint && <span className="absolute inset-[12%] animate-pulse ring-2 ring-gold/70" />}

                  {target && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute inset-[8%] flex items-center justify-center"
                      style={{ background: `rgba(255,79,216,${0.15 + 0.6 * (target.p / maxP)})` }}
                    >
                      <span className="font-mono text-[3.2cqw] font-medium text-white">
                        {Math.round(target.p * 1000) / 10}%
                      </span>
                    </motion.span>
                  )}

                  {cell && (
                    <motion.span
                      layoutId={cell.id}
                      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                      className={`relative select-none text-[8.5cqw] leading-none ${
                        cell.p === cell.p.toUpperCase()
                          ? 'text-[#f1efe9] [text-shadow:0_1px_0_#000,0_0_8px_rgba(0,0,0,0.5)]'
                          : 'text-[#ff7fe3] [text-shadow:0_1px_0_#000,0_0_8px_rgba(255,79,216,0.45)]'
                      }`}
                    >
                      {GLYPH[cell.p.toLowerCase()]}
                      {'︎'}
                    </motion.span>
                  )}

                  {c === 0 && (
                    <span className="absolute left-[4%] top-[3%] font-mono text-[2.2cqw] text-white/35">{8 - r}</span>
                  )}
                  {r === 7 && (
                    <span className="absolute bottom-[2%] right-[5%] font-mono text-[2.2cqw] text-white/35">{FILES[c]}</span>
                  )}
                </button>
              )
            }),
          )}
        </div>
      </div>

      <div className="mt-3 flex min-h-8 items-center justify-between gap-3 font-mono text-xs text-muted">
        {played ? (
          <>
            <span>
              Played <span className="text-fg">{sq(...played.from)}→{sq(...played.to)}</span> · prior{' '}
              {Math.round(prior(played.from, played.to) * 1000) / 10}%
            </span>
            <button onClick={reset} className="border-2 border-line px-3 py-1 hover:border-gold hover:text-gold">
              Reset
            </button>
          </>
        ) : (
          <span>{sel ? 'Pick a highlighted square to play the move.' : 'Click a white pawn or knight to see move priors.'}</span>
        )}
      </div>
      <label className="mt-3 flex items-center gap-3 font-mono text-xs text-muted">
        <span className="shrink-0">Rating</span>
        <input
          type="range"
          min={800}
          max={2400}
          step={100}
          value={elo}
          onChange={(e) => setElo(Number(e.target.value))}
          className="h-1 flex-1 cursor-pointer accent-accent"
          aria-label="Player rating"
        />
        <span className="w-10 text-right text-fg tabular-nums">{elo}</span>
      </label>
      <p className="mt-2 text-[11px] text-faint">Illustrative policy values — not output from the actual engine.</p>
    </div>
  )
}
