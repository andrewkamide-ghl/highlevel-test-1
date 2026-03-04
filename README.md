# HL AI Agents Onboarding

A conversational AI onboarding experience for HighLevel's AI Agents section. An AI guide named **Max** walks users through configuring their first AI Agent in 11 conversation turns.

## Install

```bash
npm install hl-ai-agents-onboarding
```

## Usage

```tsx
import { HLAiAgentsOnboarding } from 'hl-ai-agents-onboarding';

<HLAiAgentsOnboarding
  locationId="your-location-id"
  authToken="your-bearer-token"
  onComplete={(agentId) => console.log('Created:', agentId)}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `locationId` | `string` | Yes | HL sub-account location ID |
| `authToken` | `string` | Yes | Bearer token for HL API calls. Pass empty string to use fixture data in development. |
| `onComplete` | `(agentId: string) => void` | No | Called after successful agent creation |
| `onCancel` | `() => void` | No | Called if user dismisses the onboarding |
| `theme.primaryColor` | `string` | No | Optional brand color override (CSS color value) |

## Features

- **11-turn conversational flow** — Max guides users through setup via chat
- **Voice AI & Conversation AI** — branches based on user goals
- **AI-generated agent prompt** — auto-fills system prompt from user context
- **HL API integration** — fetches knowledge bases, phone numbers, voices
- **Fixture data fallback** — works offline without an HL token
- **Framer Motion animations** — smooth message and transition animations
- **WCAG AA accessible** — keyboard navigation, ARIA roles, screen reader support
- **Mobile responsive** — works on iOS and Android with keyboard-safe layout

## Development

```bash
npm install
npm run dev        # Start dev server at localhost:5173
npx tsc --noEmit   # Type check
npx vitest run     # Run tests
npm run build      # Build library
```

## Architecture

```
src/
  components/chat/        — AiMessage, UserMessage, TypingIndicator, QuickReplyChips, InputBar, ChatContainer
  components/onboarding/  — AgentTypeCards, PromptEditor, ActionGrid, ActionPickerModal, KBSelector, PhoneSelector, AgentReviewCard
  components/layout/      — Header, SuccessScreen
  stores/                 — conversation.ts, onboarding.ts (Zustand)
  services/               — hl-api.ts, conversation-engine.ts, prompt-generator.ts
  data/                   — conversation-script.ts, fixtures.ts
  pages/                  — OnboardingPage.tsx
  hooks/                  — useHLData.ts
  entry.tsx               — Library entry point (HLAiAgentsOnboarding component)
```

## Conversation Flow

| Turn | Input | Description |
|------|-------|-------------|
| 1 | Chips | Problem discovery |
| 2 | Chips | Industry selection |
| 3 | Chips | Primary goal |
| 4 | Cards | Agent type (Voice AI or Conversation AI) |
| 5 | Text | Agent name |
| 6 | Editor | Review & edit generated system prompt |
| 7 | Grid | Add actions (up to 6) |
| 8 | Dropdown | Knowledge base |
| 9 | Dropdown | Phone number (Voice AI only — skipped for Conversation AI) |
| 10 | Chips | Working hours |
| 11 | Review | Full summary + Launch |
