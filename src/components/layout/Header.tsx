interface HeaderProps {
  currentTurn: number
  totalTurns?: number
}

export default function Header({ currentTurn, totalTurns = 11 }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-200 flex-shrink-0">
      {/* HL Logo */}
      <div className="flex items-center gap-2" aria-label="HighLevel">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">HL</span>
        </div>
        <span className="text-sm font-semibold text-neutral-700 hidden sm:block">HighLevel</span>
      </div>

      {/* Title */}
      <h1 className="text-sm font-semibold text-neutral-700">Set Up Your AI Agent</h1>

      {/* Step dots */}
      <div
        className="flex items-center gap-1.5"
        role="progressbar"
        aria-valuenow={currentTurn}
        aria-valuemin={1}
        aria-valuemax={totalTurns}
        aria-label={`Step ${currentTurn} of ${totalTurns}`}
      >
        {Array.from({ length: totalTurns }, (_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all ${
              i + 1 <= currentTurn
                ? 'bg-primary w-2 h-2'
                : 'bg-neutral-200 w-1.5 h-1.5'
            }`}
          />
        ))}
      </div>
    </header>
  )
}
