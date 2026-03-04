import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

interface SuccessScreenProps {
  agentId: string
  agentName: string
  onSetupAnother: () => void
}

export default function SuccessScreen({ agentId, agentName, onSetupAnother }: SuccessScreenProps) {
  useEffect(() => {
    confetti({
      colors: ['#0052CC', '#2E7D32', '#F57C00'],
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    })
  }, [])

  return (
    <motion.div
      className="flex flex-col items-center justify-center px-6 py-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated checkmark SVG */}
      <div className="w-20 h-20 mb-6">
        <svg viewBox="0 0 52 52" fill="none" aria-hidden="true">
          <circle cx="26" cy="26" r="25" stroke="#2E7D32" strokeWidth="2" fill="#E8F5E9" />
          <motion.path
            d="M14 27l8 8 16-16"
            stroke="#2E7D32"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.2 }}
          />
        </svg>
      </div>

      <motion.h2
        className="text-2xl font-bold text-neutral-700 mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.4 }}
      >
        {agentName} is live!
      </motion.h2>

      <motion.p
        className="text-sm text-neutral-700 mb-8 max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        Your AI agent has been created and is ready to start handling conversations.
      </motion.p>

      <motion.div
        className="flex flex-col gap-3 w-full max-w-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      >
        <a
          href={`/ai-agents/${agentId}`}
          className="w-full px-6 py-3 bg-primary text-white rounded-full text-sm font-semibold
            text-center min-h-[44px] flex items-center justify-center
            hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          View in AI Agents →
        </a>
        <button
          onClick={onSetupAnother}
          className="text-sm text-primary font-medium hover:underline focus:outline-none focus:underline min-h-[44px]"
        >
          Set up another agent
        </button>
      </motion.div>
    </motion.div>
  )
}
