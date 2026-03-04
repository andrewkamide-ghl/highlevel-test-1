import { describe, it, expect, beforeEach } from 'vitest'
import { useOnboardingStore } from '../onboarding'

describe('useOnboardingStore', () => {
  beforeEach(() => {
    useOnboardingStore.getState().reset()
  })

  describe('setField()', () => {
    it('updates only the specified field', () => {
      useOnboardingStore.getState().setField('agentName', 'Aria')

      const state = useOnboardingStore.getState()
      expect(state.agentName).toBe('Aria')
      expect(state.industry).toBe('')
      expect(state.goal).toBe('')
    })
  })

  describe('addAction()', () => {
    it('appends to actions array', () => {
      useOnboardingStore.getState().addAction({ id: 'a1', type: 'call_transfer', config: {} })
      useOnboardingStore.getState().addAction({ id: 'a2', type: 'send_sms', config: {} })

      expect(useOnboardingStore.getState().actions).toHaveLength(2)
      expect(useOnboardingStore.getState().actions[0].id).toBe('a1')
    })
  })

  describe('removeAction()', () => {
    it('removes action by id', () => {
      useOnboardingStore.getState().addAction({ id: 'a1', type: 'call_transfer', config: {} })
      useOnboardingStore.getState().addAction({ id: 'a2', type: 'send_sms', config: {} })

      useOnboardingStore.getState().removeAction('a1')

      const actions = useOnboardingStore.getState().actions
      expect(actions).toHaveLength(1)
      expect(actions[0].id).toBe('a2')
    })
  })

  describe('reset()', () => {
    it('clears all fields to initial values', () => {
      useOnboardingStore.getState().setField('agentName', 'TestBot')
      useOnboardingStore.getState().setField('industry', 'Healthcare')
      useOnboardingStore.getState().addAction({ id: 'a1', type: 'send_sms', config: {} })

      useOnboardingStore.getState().reset()

      const state = useOnboardingStore.getState()
      expect(state.agentName).toBe('')
      expect(state.industry).toBe('')
      expect(state.actions).toHaveLength(0)
      expect(state.agentType).toBeNull()
    })
  })

  describe('isReadyToLaunch()', () => {
    it('returns false when agentName is empty', () => {
      useOnboardingStore.getState().setField('agentType', 'voice')
      useOnboardingStore.getState().setField('prompt', 'Some prompt')

      expect(useOnboardingStore.getState().isReadyToLaunch()).toBe(false)
    })

    it('returns false when agentType is null', () => {
      useOnboardingStore.getState().setField('agentName', 'Aria')
      useOnboardingStore.getState().setField('prompt', 'Some prompt')

      expect(useOnboardingStore.getState().isReadyToLaunch()).toBe(false)
    })

    it('returns false when prompt is empty', () => {
      useOnboardingStore.getState().setField('agentType', 'conversation')
      useOnboardingStore.getState().setField('agentName', 'Aria')

      expect(useOnboardingStore.getState().isReadyToLaunch()).toBe(false)
    })

    it('returns true when agentType, agentName, and prompt are all set', () => {
      useOnboardingStore.getState().setField('agentType', 'conversation')
      useOnboardingStore.getState().setField('agentName', 'Aria')
      useOnboardingStore.getState().setField('prompt', 'You are Aria...')

      expect(useOnboardingStore.getState().isReadyToLaunch()).toBe(true)
    })
  })
})
