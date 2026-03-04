import type { OnboardingState } from '../../stores/onboarding'

interface AgentReviewCardProps {
  state: OnboardingState
  onEdit: (turn: number) => void
}

const actionLabels: Record<string, string> = {
  call_transfer: 'Call Transfer',
  trigger_workflow: 'Trigger Workflow',
  send_sms: 'Send SMS',
  update_contact: 'Update Contact Field',
  appointment_booking: 'Appointment Booking',
  custom_action: 'Custom Action',
}

interface SectionProps {
  label: string
  value: React.ReactNode
  turn: number
  onEdit: (turn: number) => void
}

function Section({ label, value, turn, onEdit }: SectionProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-neutral-100 last:border-0">
      <div className="flex-1">
        <p className="text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-0.5">{label}</p>
        <div className="text-sm text-neutral-700">{value}</div>
      </div>
      <button
        onClick={() => onEdit(turn)}
        aria-label={`Edit ${label}`}
        className="text-xs text-primary font-medium hover:underline focus:outline-none focus:underline min-h-[44px] px-2 flex items-center"
      >
        Edit ✎
      </button>
    </div>
  )
}

export default function AgentReviewCard({ state, onEdit }: AgentReviewCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden mt-2">
      <div className="px-5 py-4 border-b border-neutral-200 bg-neutral-50">
        <h3 className="text-base font-semibold text-neutral-700">Agent Summary</h3>
      </div>

      <div className="px-5">
        <Section
          label="Agent Type"
          value={state.agentType === 'voice' ? '🎙️ Voice AI' : '💬 Conversation AI'}
          turn={4}
          onEdit={onEdit}
        />
        <Section
          label="Name"
          value={state.agentName || '—'}
          turn={5}
          onEdit={onEdit}
        />
        <Section
          label="Goal"
          value={state.goal || '—'}
          turn={3}
          onEdit={onEdit}
        />
        <Section
          label="Actions"
          value={
            state.actions.length > 0
              ? (
                <ul className="space-y-0.5">
                  {state.actions.map((a) => (
                    <li key={a.id}>• {actionLabels[a.type] ?? a.type}</li>
                  ))}
                </ul>
              )
              : 'None'
          }
          turn={7}
          onEdit={onEdit}
        />
        <Section
          label="Knowledge Base"
          value={state.knowledgeBaseId || 'None'}
          turn={8}
          onEdit={onEdit}
        />
        {state.agentType === 'voice' && (
          <Section
            label="Phone Number"
            value={state.phoneNumber || 'Not assigned'}
            turn={9}
            onEdit={onEdit}
          />
        )}
      </div>
    </div>
  )
}
