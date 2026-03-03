import './MainContent.css'

function PlusCircleIcon() {
  return (
    <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

function SignalIcon() {
  return (
    <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1 6c0 0 5-4 11-4s11 4 11 4" />
      <path d="M5 10c0 0 3-2.5 7-2.5s7 2.5 7 2.5" />
      <path d="M9 14c0 0 1-1 3-1s3 1 3 1" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.81 19.79 19.79 0 01.1 2.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.2 7.76a16 16 0 006 6l1.13-1.13a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

const steps = [
  {
    id: 1,
    icon: <PlusCircleIcon />,
    iconColor: '#7c3aed',
    iconBg: '#ede9fe',
    title: 'Create Your First Voice AI Agent',
    description: 'Build a customized Voice AI agent to automate calls, capture leads, and deliver seamless customer experiences.',
  },
  {
    id: 2,
    icon: <SignalIcon />,
    iconColor: '#059669',
    iconBg: '#d1fae5',
    title: 'Test & Talk to Your Voice AI Agent',
    description: 'Experience your agent firsthand — make a test call, refine responses, and ensure it sounds just right before going live.',
  },
  {
    id: 3,
    icon: <PhoneIcon />,
    iconColor: '#2563eb',
    iconBg: '#dbeafe',
    title: 'Assign a Phone Number & Go Live',
    description: 'Connect a phone number to your agent and start automating real calls — your AI is ready to work around the clock.',
  },
]

export default function MainContent() {
  return (
    <main className="main-content">
      <div className="main-inner">
        <h1 className="main-heading">Hey Andrew, here are a few things to get started with</h1>

        <div className="steps-card">
          {steps.map((step, index) => (
            <button key={step.id} className={`step-item ${index < steps.length - 1 ? 'step-item--bordered' : ''}`}>
              <div className="step-left">
                <div className="step-number" aria-hidden="true">{step.id}</div>
                <div
                  className="step-icon"
                  style={{ color: step.iconColor, backgroundColor: step.iconBg }}
                >
                  {step.icon}
                </div>
                <div className="step-text">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
              <span className="step-chevron" aria-hidden="true">
                <ChevronRightIcon />
              </span>
            </button>
          ))}
        </div>
      </div>

      <button className="chat-bubble" aria-label="Open chat">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>
    </main>
  )
}
