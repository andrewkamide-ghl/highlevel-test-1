import { motion } from 'framer-motion'

interface UserMessageProps {
  content: string
}

export default function UserMessage({ content }: UserMessageProps) {
  return (
    <motion.div
      role="article"
      aria-label={`You: ${content}`}
      className="flex justify-end"
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ willChange: 'transform, opacity' }}
    >
      <div
        className="bg-primary text-white px-4 py-3 max-w-[70%]"
        style={{ borderRadius: '16px 16px 0px 16px' }}
      >
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    </motion.div>
  )
}
