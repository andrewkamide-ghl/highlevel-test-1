import { useState } from 'react'
import './Sidebar.css'

function MicrophoneIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0014 0M12 19v3M8 22h8" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}

const sidebarItems = [
  { label: 'Voice AI', Icon: MicrophoneIcon },
  { label: 'Conversation AI', Icon: ChatIcon },
]

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('Voice AI')

  return (
    <aside className="sidebar">
      <div className="sidebar-section-label">Getting Started</div>
      <nav className="sidebar-nav" aria-label="Section navigation">
        {sidebarItems.map(({ label, Icon }) => {
          const isActive = activeItem === label
          return (
            <button
              key={label}
              className={`sidebar-item ${isActive ? 'sidebar-item--active' : ''}`}
              onClick={() => setActiveItem(label)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={`sidebar-icon ${isActive ? 'sidebar-icon--blue' : 'sidebar-icon--gray'}`} aria-hidden="true">
                <Icon />
              </span>
              <span>{label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
