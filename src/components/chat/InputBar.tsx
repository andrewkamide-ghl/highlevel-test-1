import { useState } from 'react'

interface InputBarProps {
  placeholder?: string
  onSubmit: (text: string) => void
  disabled?: boolean
}

export default function InputBar({ placeholder = 'Type a message...', onSubmit, disabled = false }: InputBarProps) {
  const [value, setValue] = useState('')

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSubmit(trimmed)
    setValue('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <form
      className="flex items-center gap-2 px-4 py-3 bg-white border-t border-neutral-200"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        aria-label="Message input"
        className={`
          flex-1 px-4 py-2 rounded-full border border-neutral-200 outline-none
          text-sm bg-neutral-50 transition-colors
          focus:border-primary focus:bg-white
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        style={{ fontSize: '16px', minHeight: '44px' }}
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className={`
          w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center
          transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:opacity-90
        `}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </form>
  )
}
