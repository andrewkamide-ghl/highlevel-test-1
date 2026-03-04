import { useEffect, useMemo, useState, useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useConversationStore } from '../stores/conversation'
import { useOnboardingStore } from '../stores/onboarding'
import { ConversationEngine } from '../services/conversation-engine'
import { TURNS } from '../data/conversation-script'
import { generateAgentPrompt } from '../services/prompt-generator'
import { createAiAgent } from '../services/hl-api'
import { useKnowledgeBases, usePhoneNumbers, useVoices } from '../hooks/useHLData'
import ChatContainer from '../components/chat/ChatContainer'
import Header from '../components/layout/Header'
import SuccessScreen from '../components/layout/SuccessScreen'
import AgentTypeCards from '../components/onboarding/AgentTypeCards'
import PromptEditor from '../components/onboarding/PromptEditor'
import ActionGrid from '../components/onboarding/ActionGrid'
import ActionPickerModal from '../components/onboarding/ActionPickerModal'
import KnowledgeBaseSelector from '../components/onboarding/KnowledgeBaseSelector'
import PhoneNumberSelector from '../components/onboarding/PhoneNumberSelector'
import AgentReviewCard from '../components/onboarding/AgentReviewCard'

interface OnboardingPageProps {
  onComplete?: (agentId: string) => void
  onCancel?: () => void
}

export default function OnboardingPage({ onComplete }: OnboardingPageProps) {
  // Prefetch data in parallel
  useKnowledgeBases()
  usePhoneNumbers()
  useVoices()

  const { currentTurn, isComplete } = useConversationStore()
  const onboardingState = useOnboardingStore()
  const [actionPickerOpen, setActionPickerOpen] = useState(false)
  const [launchError, setLaunchError] = useState<string | null>(null)
  const [createdAgentId, setCreatedAgentId] = useState<string | null>(null)

  const engine = useMemo(() => new ConversationEngine(), [])

  useEffect(() => {
    const timeout = setTimeout(() => engine.start(), 800)
    return () => clearTimeout(timeout)
  }, [engine])

  const currentTurnConfig = TURNS.find((t) => t.id === currentTurn) ?? TURNS[0]

  const handleInput = useCallback((input: string | string[] | unknown) => {
    // Special handling for Turn 6: auto-generate prompt on first access
    if (currentTurn === 6 && typeof input === 'string') {
      useOnboardingStore.getState().setField('prompt', input)
    }
    engine.handleInput(input)
  }, [engine, currentTurn])

  const launchMutation = useMutation({
    mutationFn: async () => {
      const state = useOnboardingStore.getState()
      const result = await createAiAgent({
        agent_type: state.agentType ?? 'conversation',
        name: state.agentName,
        system_prompt: state.prompt,
        voice_id: state.voiceId || undefined,
        actions: state.actions,
        knowledge_base_id: state.knowledgeBaseId || undefined,
        phone_number: state.phoneNumber || undefined,
        working_hours: Object.keys(state.workingHours).length > 0 ? state.workingHours : undefined,
      })
      if (!result) throw new Error('Failed to create agent')
      return result
    },
    onSuccess: (data) => {
      setCreatedAgentId(data.id)
      onComplete?.(data.id)
    },
    onError: () => {
      setLaunchError('Something went wrong — try again')
      setTimeout(() => setLaunchError(null), 4000)
    },
  })

  // Auto-generate prompt when reaching turn 6
  useEffect(() => {
    if (currentTurn === 6 && !onboardingState.prompt) {
      const generated = generateAgentPrompt(onboardingState)
      useOnboardingStore.getState().setField('prompt', generated)
    }
  }, [currentTurn, onboardingState])

  // Build the rich component for the current turn
  function buildCurrentComponent() {
    const comp = currentTurnConfig.component

    if (comp === 'AgentTypeCards') {
      return (
        <AgentTypeCards
          onSelect={(type) => handleInput(type)}
        />
      )
    }

    if (comp === 'PromptEditor') {
      return (
        <PromptEditor
          value={onboardingState.prompt}
          onChange={(val) => useOnboardingStore.getState().setField('prompt', val)}
          onContinue={() => handleInput(onboardingState.prompt)}
        />
      )
    }

    if (comp === 'ActionGrid') {
      return (
        <>
          <ActionGrid
            actions={onboardingState.actions}
            onAdd={() => setActionPickerOpen(true)}
            onRemove={(id) => useOnboardingStore.getState().removeAction(id)}
            onContinue={() => handleInput(onboardingState.actions)}
          />
          <ActionPickerModal
            open={actionPickerOpen}
            onClose={() => setActionPickerOpen(false)}
            onSelect={(type) => {
              useOnboardingStore.getState().addAction({
                id: `action-${Date.now()}`,
                type,
                config: {},
              })
            }}
          />
        </>
      )
    }

    if (comp === 'KBSelector') {
      return (
        <KnowledgeBaseSelector
          value={onboardingState.knowledgeBaseId}
          onChange={(id) => useOnboardingStore.getState().setField('knowledgeBaseId', id)}
          onContinue={() => handleInput(onboardingState.knowledgeBaseId)}
        />
      )
    }

    if (comp === 'PhoneSelector') {
      return (
        <PhoneNumberSelector
          value={onboardingState.phoneNumber}
          onChange={(num) => useOnboardingStore.getState().setField('phoneNumber', num)}
          onContinue={() => handleInput(onboardingState.phoneNumber)}
        />
      )
    }

    if (comp === 'AgentReview' || currentTurnConfig.inputType === 'review') {
      return (
        <AgentReviewCard
          state={onboardingState}
          onEdit={(turn) => {
            // Jump back to that turn — re-run from there
            engine.runTurn(turn)
          }}
        />
      )
    }

    return null
  }

  if (createdAgentId) {
    return (
      <div className="min-h-dvh bg-neutral-50 flex flex-col">
        <Header currentTurn={11} />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <SuccessScreen
              agentId={createdAgentId}
              agentName={onboardingState.agentName || 'Your Agent'}
              onSetupAnother={() => {
                setCreatedAgentId(null)
                engine.start()
              }}
            />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-neutral-50 flex flex-col">
      <Header currentTurn={currentTurn} />

      <main className="flex-1 overflow-hidden">
        <ChatContainer
          currentInputType={isComplete ? undefined : currentTurnConfig.inputType}
          currentChips={currentTurnConfig.chips}
          currentComponent={buildCurrentComponent()}
          onInput={handleInput}
          isComplete={isComplete}
        />
      </main>

      {/* Launch section after all turns complete */}
      {isComplete && (
        <div className="max-w-[680px] w-full mx-auto px-4 pb-6">
          <AgentReviewCard
            state={onboardingState}
            onEdit={(turn) => engine.runTurn(turn)}
          />

          {launchError && (
            <div
              role="alert"
              className="mt-3 px-4 py-3 bg-warning-light border border-warning rounded-lg text-sm text-warning"
            >
              {launchError}
            </div>
          )}

          <button
            onClick={() => launchMutation.mutate()}
            disabled={launchMutation.isPending}
            className={`
              mt-4 w-full h-[52px] bg-primary text-white rounded-xl text-base font-semibold
              flex items-center justify-center gap-2
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              transition-all
              ${launchMutation.isPending ? 'opacity-80 cursor-wait' : 'hover:opacity-90 active:scale-[0.97]'}
            `}
            style={{
              boxShadow: launchMutation.isPending ? 'none' : '0 0 0 0 rgba(0,82,204,0)',
              animation: launchMutation.isPending ? 'none' : 'pulse-glow 2s infinite',
              willChange: 'transform',
            }}
          >
            {launchMutation.isPending ? (
              <>
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Creating your agent...
              </>
            ) : (
              'Launch My Agent →'
            )}
          </button>
        </div>
      )}
    </div>
  )
}
