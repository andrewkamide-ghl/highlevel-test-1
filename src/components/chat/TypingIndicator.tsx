import { motion } from 'framer-motion'

export default function TypingIndicator() {
  const dotVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.35, 1] },
  }

  return (
    <div
      aria-live="polite"
      aria-label="Max is typing"
      className="flex items-center gap-1 py-1"
    >
      <span className="sr-only">Max is typing</span>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-neutral-200"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
          style={{ willChange: 'transform' }}
        />
      ))}
    </div>
  )
}
