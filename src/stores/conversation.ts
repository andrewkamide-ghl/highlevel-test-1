import { create } from 'zustand'

export interface Message {
  id: string
  role: 'ai' | 'user'
  content: string
  timestamp: number
  /** Optional: name of rich component to render inline */
  component?: string
}

interface ConversationState {
  messages: Message[]
  isTyping: boolean
  /** Current turn number (1-11) */
  currentTurn: number
  /** True after turn 11 is handled */
  isComplete: boolean
}

interface ConversationActions {
  /** Call when a new message arrives from AI or user */
  addMessage(msg: Omit<Message, 'id' | 'timestamp'>): void
  /** Call to show/hide the typing indicator */
  setTyping(val: boolean): void
  /** Call when moving to a new conversation turn */
  setCurrentTurn(n: number): void
  /** Call when all 11 turns have been completed */
  setComplete(): void
  /** Call to restart the onboarding from scratch */
  reset(): void
}

type ConversationStore = ConversationState & ConversationActions

export const useConversationStore = create<ConversationStore>((set) => ({
  messages: [],
  isTyping: false,
  currentTurn: 1,
  isComplete: false,

  addMessage(msg) {
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...msg,
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          timestamp: Date.now(),
        },
      ],
    }))
  },

  setTyping(val) {
    set({ isTyping: val })
  },

  setCurrentTurn(n) {
    set({ currentTurn: n })
  },

  setComplete() {
    set({ isComplete: true })
  },

  reset() {
    set({
      messages: [],
      isTyping: false,
      currentTurn: 1,
      isComplete: false,
    })
  },
}))
