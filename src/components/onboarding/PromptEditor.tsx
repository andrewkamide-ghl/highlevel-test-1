import { useState } from 'react'

interface PromptEditorProps {
  value: string
  onChange: (val: string) => void
  onContinue?: () => void
}

export default function PromptEditor({ value, onChange, onContinue }: PromptEditorProps) {
  const [expanded, setExpanded] = useState(false)

  const lines = value.split('\n')
  const previewLines = lines.slice(0, 4).join('\n')
  const displayValue = expanded ? value : previewLines

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden mt-2">
      <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wide">Agent Prompt</span>
        <span className="text-xs text-neutral-700">{value.length} chars</span>
      </div>

      <div className="relative">
        <textarea
          value={displayValue}
          onChange={(e) => {
            if (expanded) {
              onChange(e.target.value)
            } else {
              // Update just the preview portion
              const rest = lines.slice(4).join('\n')
              onChange(rest ? e.target.value + '\n' + rest : e.target.value)
            }
          }}
          className="w-full px-4 py-3 font-mono text-sm resize-none outline-none border-none bg-transparent"
          style={{ fontSize: '14px', minHeight: expanded ? '300px' : '100px' }}
          aria-label="Agent system prompt editor"
        />
      </div>

      <div className="px-4 py-2 border-t border-neutral-200 flex items-center justify-between">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-xs text-primary font-medium focus:outline-none focus:underline"
        >
          {expanded ? 'Collapse ↑' : 'Show full prompt ↓'}
        </button>
        {onContinue && (
          <button
            onClick={onContinue}
            className="px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold
              min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              hover:opacity-90 transition-opacity"
          >
            Continue →
          </button>
        )}
      </div>
    </div>
  )
}
