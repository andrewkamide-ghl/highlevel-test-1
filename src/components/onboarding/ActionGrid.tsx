import type { Action } from '../../stores/onboarding'

interface ActionGridProps {
  actions: Action[]
  onAdd: () => void
  onRemove: (id: string) => void
  onContinue?: () => void
}

const actionIcons: Record<string, React.ReactNode> = {
  call_transfer: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41C1.61 2.38 2.37 1.5 3.4 1.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91A16 16 0 0 0 15 17l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  trigger_workflow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  send_sms: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  update_contact: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  appointment_booking: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  custom_action: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
    </svg>
  ),
}

const actionLabels: Record<string, string> = {
  call_transfer: 'Call Transfer',
  trigger_workflow: 'Trigger Workflow',
  send_sms: 'Send SMS',
  update_contact: 'Update Contact Field',
  appointment_booking: 'Appointment Booking',
  custom_action: 'Custom Action',
}

const MAX_ACTIONS = 6

export default function ActionGrid({ actions, onAdd, onRemove, onContinue }: ActionGridProps) {
  const slots = Array.from({ length: MAX_ACTIONS }, (_, i) => actions[i] ?? null)

  return (
    <div className="mt-2">
      <div className="grid grid-cols-2 gap-3">
        {slots.map((action, i) => (
          action ? (
            <div
              key={action.id}
              className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200"
            >
              <span className="text-primary">{actionIcons[action.type] ?? actionIcons.custom_action}</span>
              <span className="flex-1 text-sm font-medium text-neutral-700 truncate">
                {actionLabels[action.type] ?? action.type}
              </span>
              <button
                onClick={() => onRemove(action.id)}
                aria-label={`Remove ${actionLabels[action.type] ?? action.type}`}
                className="text-neutral-200 hover:text-neutral-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary rounded"
              >
                ×
              </button>
            </div>
          ) : (
            <button
              key={`empty-${i}`}
              onClick={i === actions.length ? onAdd : undefined}
              disabled={i !== actions.length}
              className={`
                flex items-center justify-center gap-1.5 p-3 rounded-lg border-2 border-dashed
                text-sm font-medium transition-colors min-h-[44px]
                focus:outline-none focus:ring-2 focus:ring-primary
                ${i === actions.length
                  ? 'border-neutral-200 text-neutral-700 hover:border-primary hover:text-primary cursor-pointer'
                  : 'border-neutral-100 text-neutral-200 cursor-default'
                }
              `}
            >
              {i === actions.length && (
                <>
                  <span aria-hidden="true">+</span>
                  <span>Add Action</span>
                </>
              )}
            </button>
          )
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onContinue}
          className="px-5 py-2 bg-primary text-white rounded-full text-sm font-semibold
            min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            hover:opacity-90 transition-opacity"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
