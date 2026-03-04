import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface AiMessageProps {
  content: string | ReactNode
  animate?: boolean
}

export default function AiMessage({ content, animate = true }: AiMessageProps) {
  return (
    <motion.div
      role="article"
      aria-label={typeof content === 'string' ? `Max: ${content}` : 'Max: message'}
      className="flex items-start gap-3 max-w-[75%]"
      initial={animate ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Avatar */}
      <div
        className="flex-shrink-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold"
        aria-hidden="true"
      >
        M
      </div>

      {/* Bubble */}
      <div
        className="bg-white px-4 py-3 text-neutral-700"
        style={{
          borderRadius: '0px 16px 16px 16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        }}
      >
        {typeof content === 'string' ? (
          <p className="text-sm leading-relaxed">{content}</p>
        ) : (
          content
        )}
      </div>
    </motion.div>
  )
}
