import { useGame } from '../game'
import { Close } from './icons'
import { Modal, PixelLabel } from './ui'

const CONTROLS = [
  ['↑ ↓', 'Move in the main menu'],
  ['Enter', 'Select'],
  ['1 – 6', 'Jump to a stage'],
  ['0', 'Back to the main menu'],
  ['M', 'Sound on / off'],
  ['?', 'Show these controls'],
  ['Esc', 'Close a window'],
]

export default function HelpOverlay({ open, onClose }) {
  const { setSimple } = useGame()
  return (
    <Modal open={open} onClose={onClose} labelledBy="help-title" className="sm:max-w-md">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 id="help-title" className="font-pixel text-sm text-accent">CONTROLS</h2>
          <button onClick={onClose} aria-label="Close controls" className="text-muted hover:text-fg">
            <Close />
          </button>
        </div>
        <dl className="mt-6 space-y-3">
          {CONTROLS.map(([key, action]) => (
            <div key={key} className="flex items-center gap-4">
              <dt className="w-16 shrink-0">
                <kbd className="inline-block min-w-10 border-2 border-line border-b-4 bg-raised px-2 py-1 text-center font-mono text-xs">{key}</kbd>
              </dt>
              <dd className="text-sm text-muted">{action}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-muted">
          <PixelLabel className="text-gold">PSST:</PixelLabel> three secrets are hidden on this page.
        </p>
        <button
          onClick={() => {
            onClose()
            setSimple(true)
          }}
          className="mt-6 w-full border-2 border-line px-4 py-3 font-pixel text-[10px] hover:border-accent hover:text-accent"
        >
          SWITCH TO SIMPLE MODE
        </button>
      </div>
    </Modal>
  )
}
