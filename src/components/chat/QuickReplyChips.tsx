import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuickReplyChipsProps {
  chips: string[]
  mode: 'single' | 'multi'
  onSelect: (selected: string | string[]) => void
}

export default function QuickReplyChips({ chips, mode, onSelect }: QuickReplyChipsProps) {
  const [selected, setSelected] = useState<string[]>([])
  const [confirmed, setConfirmed] = useState(false)
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([])

  function handleChipClick(chip: string) {
    if (confirmed) return

    if (mode === 'single') {
      setSelected([chip])
    } else {
      setSelected((prev) =>
        prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
      )
    }
  }

  function handleConfirm() {
    if (confirmed || selected.length === 0) return
    setConfirmed(true)
    if (mode === 'single') {
      onSelect(selected[0])
    } else {
      onSelect(selected)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      const next = chipRefs.current[index + 1]
      next?.focus()
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = chipRefs.current[index - 1]
      prev?.focus()
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      handleChipClick(chips[index])
    }
  }

  const isSelected = (chip: string) => selected.includes(chip)
  const hasSingleSelection = mode === 'single' && selected.length > 0
  const hasMultiSelection = mode === 'multi' && selected.length > 0

  return (
    <div
      role={mode === 'single' ? 'radiogroup' : 'group'}
      aria-label="Quick reply options"
      className="flex flex-col gap-3 mt-2"
    >
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, i) => {
          const sel = isSelected(chip)
          const dimmed = hasSingleSelection && !sel

          return (
            <motion.button
              key={chip}
              ref={(el) => { chipRefs.current[i] = el }}
              role={mode === 'single' ? 'radio' : 'checkbox'}
              aria-checked={sel}
              className={`
                px-4 py-2 rounded-full text-sm font-medium border transition-colors
                min-h-[44px] min-w-[44px]
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                ${sel
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-primary border-primary hover:bg-primary-light'
                }
              `}
              style={{
                opacity: dimmed ? 0.35 : 1,
                transition: 'opacity 0.2s ease',
              }}
              onClick={() => handleChipClick(chip)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              disabled={confirmed}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: dimmed ? 0.35 : 1, y: 0 }}
              transition={{ delay: i * 0.055, duration: 0.25 }}
            >
              {chip}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {(hasSingleSelection || hasMultiSelection) && !confirmed && (
          <motion.button
            className="self-start px-5 py-2 bg-primary text-white rounded-full text-sm font-semibold
              min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            onClick={handleConfirm}
            style={{ willChange: 'transform' }}
          >
            {mode === 'single' ? 'Continue →' : 'Done →'}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
