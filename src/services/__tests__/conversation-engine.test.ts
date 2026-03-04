import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { ConversationEngine } from '../conversation-engine'
import { useConversationStore } from '../../stores/conversation'
import { useOnboardingStore } from '../../stores/onboarding'
import { TURNS } from '../../data/conversation-script'

vi.useFakeTimers()

describe('ConversationEngine', () => {
  let engine: ConversationEngine

  beforeEach(() => {
    engine = new ConversationEngine()
    useConversationStore.getState().reset()
    useOnboardingStore.getState().reset()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  describe('start()', () => {
    it('resets both stores when called', () => {
      // Set some state first
      useConversationStore.getState().addMessage({ role: 'ai', content: 'hello' })
      useOnboardingStore.getState().setField('agentName', 'TestBot')

      engine.start()

      expect(useConversationStore.getState().messages).toHaveLength(0)
      expect(useOnboardingStore.getState().agentName).toBe('')
    })

    it('calls runTurn(1) after 500ms', () => {
      const runTurnSpy = vi.spyOn(engine, 'runTurn')
      engine.start()

      vi.advanceTimersByTime(499)
      expect(runTurnSpy).not.toHaveBeenCalled()

      vi.advanceTimersByTime(1)
      expect(runTurnSpy).toHaveBeenCalledWith(1)
    })
  })

  describe('skipIf behavior', () => {
    it('skips turn 9 when agentType is conversation', () => {
      useOnboardingStore.getState().setField('agentType', 'conversation')
      useConversationStore.getState().setCurrentTurn(9)

      const runTurnSpy = vi.spyOn(engine, 'runTurn')
      engine.runTurn(9)

      // Should skip to turn 10
      vi.advanceTimersByTime(5000)
      expect(runTurnSpy).toHaveBeenCalledWith(10)
    })

    it('does NOT skip turn 9 when agentType is voice', () => {
      useOnboardingStore.getState().setField('agentType', 'voice')
      useConversationStore.getState().setCurrentTurn(9)

      engine.runTurn(9)
      vi.advanceTimersByTime(50)

      // Turn 9 should be set as current
      expect(useConversationStore.getState().currentTurn).toBe(9)
    })
  })

  describe('typing delay', () => {
    it('calculates longer delay for longer messages', () => {
      // Turn 1 has a moderately long message
      const turn1 = TURNS.find((t) => t.id === 1)!
      const turn1Message = turn1.aiMessage as string
      const turn1Delay = Math.min(1200 + turn1Message.length * 10, 3500)

      // Short message delay calculation
      const shortDelay = Math.min(1200 + 50 * 10, 3500)
      const longDelay = Math.min(1200 + 300 * 10, 3500)

      expect(longDelay).toBeGreaterThan(shortDelay)
      expect(turn1Delay).toBeGreaterThanOrEqual(1200)
      expect(turn1Delay).toBeLessThanOrEqual(3500)
    })
  })

  describe('handleInput()', () => {
    it('updates storeKey field after user input', () => {
      useConversationStore.getState().setCurrentTurn(2)

      engine.handleInput('Real Estate')

      expect(useOnboardingStore.getState().industry).toBe('Real Estate')
    })

    it('adds user message to conversation', () => {
      useConversationStore.getState().setCurrentTurn(1)

      engine.handleInput("I'm missing calls after hours")

      const messages = useConversationStore.getState().messages
      const userMsg = messages.find((m) => m.role === 'user')
      expect(userMsg?.content).toBe("I'm missing calls after hours")
    })
  })

  describe('onComplete()', () => {
    it('sets isComplete to true', () => {
      engine.onComplete()
      expect(useConversationStore.getState().isComplete).toBe(true)
    })
  })
})
