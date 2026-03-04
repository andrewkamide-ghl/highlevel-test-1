import { create } from 'zustand'

export interface Action {
  id: string
  type: string
  config: Record<string, unknown>
}

export interface OnboardingState {
  problem: string
  industry: string
  goal: string
  agentType: 'voice' | 'conversation' | null
  agentName: string
  voiceId: string
  prompt: string
  actions: Action[]
  knowledgeBaseId: string
  phoneNumber: string
  workingHours: Record<string, { start: string; end: string } | 'unavailable'>
}

interface OnboardingGetters {
  /** Returns true when agentType, agentName, and prompt are all non-empty */
  isReadyToLaunch(): boolean
}

interface OnboardingActions {
  /** Call to update any single field in the onboarding state */
  setField<K extends keyof OnboardingState>(key: K, val: OnboardingState[K]): void
  /** Call when user adds a new action in Turn 7 */
  addAction(action: Action): void
  /** Call when user removes an action by its id */
  removeAction(id: string): void
  /** Call to reset all fields to initial values */
  reset(): void
}

type OnboardingStore = OnboardingState & OnboardingGetters & OnboardingActions

const initialState: OnboardingState = {
  problem: '',
  industry: '',
  goal: '',
  agentType: null,
  agentName: '',
  voiceId: '',
  prompt: '',
  actions: [],
  knowledgeBaseId: '',
  phoneNumber: '',
  workingHours: {},
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  ...initialState,

  isReadyToLaunch() {
    const { agentType, agentName, prompt } = get()
    return agentType !== null && agentName.trim() !== '' && prompt.trim() !== ''
  },

  setField(key, val) {
    set({ [key]: val } as Partial<OnboardingState>)
  },

  addAction(action) {
    set((state) => ({
      actions: [...state.actions, action],
    }))
  },

  removeAction(id) {
    set((state) => ({
      actions: state.actions.filter((a) => a.id !== id),
    }))
  },

  reset() {
    set({ ...initialState })
  },
}))
