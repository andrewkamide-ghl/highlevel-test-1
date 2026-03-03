import { useState } from 'react'
import './Header.css'

const navTabs = [
  'Getting Started',
  'Agent Studio',
  'Voice AI',
  'Conversation AI',
  'Knowledge Base',
  'Agent Templates',
  'Content AI',
]

function PhoneIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.81 19.79 19.79 0 01.1 2.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.2 7.76a16 16 0 006 6l1.13-1.13a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  )
}

function RobotIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M12 2a3 3 0 013 3v3H9V5a3 3 0 013-3z" />
      <circle cx="9" cy="15" r="1.5" fill="white" />
      <circle cx="15" cy="15" r="1.5" fill="white" />
      <rect x="9" y="18" width="6" height="1.5" rx="0.75" fill="white" />
      <line x1="12" y1="5" x2="12" y2="8" stroke="white" strokeWidth="1" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  )
}

function QuestionIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
    </svg>
  )
}

export default function Header() {
  const [activeTab, setActiveTab] = useState('Getting Started')

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo">
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="7" height="7" rx="1" fill="white" stroke="white" />
            <rect x="15" y="3" width="7" height="7" rx="1" fill="none" stroke="white" />
            <rect x="2" y="14" width="7" height="7" rx="1" fill="none" stroke="white" />
            <rect x="15" y="14" width="7" height="7" rx="1" fill="none" stroke="white" />
          </svg>
          <span className="header-title">AI Agents</span>
        </div>

        <nav className="header-nav" aria-label="Main navigation">
          {navTabs.map((tab) => (
            <button
              key={tab}
              className={`nav-tab ${activeTab === tab ? 'nav-tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
              aria-current={activeTab === tab ? 'page' : undefined}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="header-actions">
        <button className="action-btn action-btn--green" aria-label="Phone">
          <PhoneIcon />
        </button>
        <button className="action-btn action-btn--blue" aria-label="Upgrade">
          <SparkleIcon />
        </button>
        <button className="action-btn action-btn--green-robot" aria-label="AI Assistant">
          <RobotIcon />
          <span className="badge badge--green" aria-label="1 notification">1</span>
        </button>
        <button className="action-btn action-btn--orange" aria-label="Notifications">
          <BellIcon />
          <span className="badge badge--orange" aria-label="3 notifications">3</span>
        </button>
        <button className="action-btn action-btn--blue-q" aria-label="Help">
          <QuestionIcon />
        </button>
        <div className="user-avatar" role="img" aria-label="User avatar">A</div>
      </div>
    </header>
  )
}
