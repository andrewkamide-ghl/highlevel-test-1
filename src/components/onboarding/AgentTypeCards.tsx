import { useState } from 'react'
import { motion } from 'framer-motion'

interface AgentTypeCardsProps {
  onSelect: (type: 'voice' | 'conversation') => void
}

const cards = [
  {
    type: 'voice' as const,
    title: 'Voice AI',
    description: 'Answers calls, books appointments, qualifies leads by phone',
    useCases: ['After-hours coverage', 'Inbound call handling', 'Phone lead qualification'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41C1.61 2.38 2.37 1.5 3.4 1.5h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91A16 16 0 0 0 15 17l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        <path d="M19.59 14.9a4 4 0 0 0-4.9-4.9" />
        <path d="M14.69 9.41a8 8 0 0 1 9.9 9.9" />
      </svg>
    ),
  },
  {
    type: 'conversation' as const,
    title: 'Conversation AI',
    description: 'Powers website chat, SMS, and 24/7 text-based support',
    useCases: ['Website live chat', 'SMS follow-up', 'FAQ automation'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
]

export default function AgentTypeCards({ onSelect }: AgentTypeCardsProps) {
  const [selected, setSelected] = useState<'voice' | 'conversation' | null>(null)

  function handleSelect(type: 'voice' | 'conversation') {
    setSelected(type)
    setTimeout(() => onSelect(type), 400)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-2">
      {cards.map((card) => {
        const isSelected = selected === card.type
        return (
          <motion.button
            key={card.type}
            onClick={() => handleSelect(card.type)}
            className={`
              flex-1 text-left p-5 rounded-xl border-2 transition-shadow cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              ${isSelected
                ? 'border-primary bg-primary-light'
                : 'border-neutral-200 bg-white hover:border-primary'
              }
            `}
            whileHover={{ y: -2 }}
            animate={isSelected ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{ willChange: 'transform' }}
            aria-pressed={isSelected}
          >
            <div className="relative">
              {isSelected && (
                <motion.div
                  className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              )}

              <div className={`mb-3 ${isSelected ? 'text-primary' : 'text-neutral-700'}`}>
                {card.icon}
              </div>

              <h3 className={`text-base font-semibold mb-1 ${isSelected ? 'text-primary-dark' : 'text-neutral-700'}`}>
                {card.title}
              </h3>
              <p className="text-sm text-neutral-700 mb-3 leading-snug">
                {card.description}
              </p>

              <ul className="space-y-1">
                {card.useCases.map((uc) => (
                  <li key={uc} className="text-xs text-neutral-700 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {uc}
                  </li>
                ))}
              </ul>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
