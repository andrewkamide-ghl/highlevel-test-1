import { useConversationStore } from '../stores/conversation'
import { useOnboardingStore } from '../stores/onboarding'
import type { OnboardingState } from '../stores/onboarding'
import { TURNS } from '../data/conversation-script'

export class ConversationEngine {
  /** Start the onboarding flow from scratch */
  start(): void {
    useConversationStore.getState().reset()
    useOnboardingStore.getState().reset()
    setTimeout(() => this.runTurn(1), 500)
  }

  /** Run a specific turn by its id */
  runTurn(id: number): void {
    const turn = TURNS.find((t) => t.id === id)
    if (!turn) {
      this.onComplete()
      return
    }

    const ctx = this.context
    if (turn.skipIf && turn.skipIf(ctx)) {
      this.runTurn(id + 1)
      return
    }

    useConversationStore.getState().setCurrentTurn(id)
    useConversationStore.getState().setTyping(true)

    const message = typeof turn.aiMessage === 'function'
      ? turn.aiMessage(ctx)
      : turn.aiMessage

    const delay = Math.min(1200 + message.length * 10, 3500)

    setTimeout(() => {
      useConversationStore.getState().setTyping(false)
      useConversationStore.getState().addMessage({
        role: 'ai',
        content: message,
        component: turn.component,
      })
    }, delay)
  }

  /** Handle user input for the current turn */
  handleInput(input: string | string[] | unknown): void {
    const { currentTurn } = useConversationStore.getState()
    const turn = TURNS.find((t) => t.id === currentTurn)
    if (!turn) return

    const displayValue = Array.isArray(input)
      ? (input as string[]).join(', ')
      : typeof input === 'string'
        ? input
        : JSON.stringify(input)

    useConversationStore.getState().addMessage({
      role: 'user',
      content: displayValue,
    })

    if (turn.storeKey) {
      useOnboardingStore.getState().setField(
        turn.storeKey,
        input as OnboardingState[typeof turn.storeKey]
      )
    }

    const nextId = turn.nextTurn ?? turn.id + 1
    setTimeout(() => this.runTurn(nextId), 400)
  }

  /** Called when all turns are complete */
  onComplete(): void {
    useConversationStore.getState().setComplete()
  }

  /** Returns current snapshot of onboarding state */
  get context(): OnboardingState {
    return useOnboardingStore.getState()
  }
}
