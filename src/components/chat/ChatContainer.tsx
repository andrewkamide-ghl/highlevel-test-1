import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useConversationStore } from '../../stores/conversation'
import AiMessage from './AiMessage'
import UserMessage from './UserMessage'
import TypingIndicator from './TypingIndicator'
import QuickReplyChips from './QuickReplyChips'
import InputBar from './InputBar'

interface ChatContainerProps {
  currentInputType?: 'chips-single' | 'chips-multi' | 'text' | 'component' | 'review'
  currentChips?: string[]
  currentComponent?: React.ReactNode
  onInput: (input: string | string[] | unknown) => void
  isComplete?: boolean
}

export default function ChatContainer({
  currentInputType,
  currentChips,
  currentComponent,
  onInput,
  isComplete = false,
}: ChatContainerProps) {
  const { messages, isTyping } = useConversationStore()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isTyping])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-[680px] mx-auto flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              msg.role === 'ai'
                ? <AiMessage key={msg.id} content={msg.content} />
                : <UserMessage key={msg.id} content={msg.content} />
            ))}
          </AnimatePresence>

          {isTyping && (
            <AiMessage content={<TypingIndicator />} animate />
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {!isComplete && !isTyping && currentInputType && (
        <div className="max-w-[680px] w-full mx-auto px-4 pb-4">
          {currentInputType === 'chips-single' && currentChips && (
            <QuickReplyChips
              chips={currentChips}
              mode="single"
              onSelect={(val) => onInput(val)}
            />
          )}
          {currentInputType === 'chips-multi' && currentChips && (
            <QuickReplyChips
              chips={currentChips}
              mode="multi"
              onSelect={(val) => onInput(val)}
            />
          )}
          {currentInputType === 'text' && (
            <InputBar onSubmit={(text) => onInput(text)} />
          )}
          {(currentInputType === 'component' || currentInputType === 'review') && currentComponent}
        </div>
      )}
    </div>
  )
}
