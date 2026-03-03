import './Sidebar.css'

function MicrophoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0014 0M12 19v3M8 22h8" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-section-label">Getting Started</div>
      <nav className="sidebar-nav">
        <button className="sidebar-item sidebar-item--active">
          <span className="sidebar-icon sidebar-icon--blue">
            <MicrophoneIcon />
          </span>
          <span>Voice AI</span>
        </button>
        <button className="sidebar-item">
          <span className="sidebar-icon sidebar-icon--gray">
            <ChatIcon />
          </span>
          <span>Conversation AI</span>
        </button>
      </nav>
    </aside>
  )
}
