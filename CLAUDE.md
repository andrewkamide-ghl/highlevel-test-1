# HL AI Agents Onboarding — Project Context

## What We Are Building
A conversational AI onboarding experience for HighLevel's AI Agents section.
Users are already logged-in HL sub-account owners — we have access to their data.
The onboarding is a chat interface where an AI named "Max" guides users through
configuring their first AI Agent in ~11 conversation turns.

## Core Design Principles (DO NOT DEVIATE)
- This is a CONVERSATION, not a form, wizard, or step-by-step modal
- No progress bar. No step numbers. Max's questions ARE the structure.
- Problem-first: Max asks what the user is struggling with BEFORE asking agent type
- Every AI message is scripted verbatim — no LLM generation in the UI layer
- Agent type (Voice vs Conversation AI) is a RECOMMENDATION, not the opening choice

## Tech Stack
- React 18 + TypeScript (strict mode)
- Vite
- Tailwind CSS + shadcn/ui
- Zustand (state management)
- Framer Motion (animations)
- TanStack Query / React Query (data fetching)
- Vitest + React Testing Library (tests)

## Project File Structure
/src
  /components/chat        — AiMessage, UserMessage, TypingIndicator,
                            QuickReplyChips, InputBar, ChatContainer
  /components/onboarding  — AgentTypeCards, PromptEditor, ActionGrid,
                            ActionPickerModal, KBSelector, PhoneSelector,
                            AgentReviewCard
  /components/layout      — Header, SuccessScreen
  /stores                 — conversation.ts, onboarding.ts
  /services               — hl-api.ts, conversation-engine.ts,
                            prompt-generator.ts
  /data                   — conversation-script.ts, fixtures.ts
  /pages                  — OnboardingPage.tsx
  /hooks                  — useHLData.ts

## OnboardingState Shape
  problem: string           // Turn 1 — problem selection
  industry: string          // Turn 2 — industry chip
  goal: string              // Turn 3 — primary goal chip
  agentType: 'voice' |
             'conversation' | null  // Turn 4 — agent type card
  agentName: string         // Turn 5 — free text
  voiceId: string           // Turn 5 — Voice AI only
  prompt: string            // Turn 6 — generated + editable
  actions: Action[]         // Turn 7 — up to 6 actions
  knowledgeBaseId: string   // Turn 8 — KB dropdown
  phoneNumber: string       // Turn 9 — Voice AI only
  workingHours: WorkingHours // Turn 10 — hours chip or custom

## HL API
  Base URL: https://services.leadconnectorhq.com
  Auth: Bearer token from window.__HL_SESSION_TOKEN__
  Mock mode: if token absent, import fixture data from /src/data/fixtures.ts

  Endpoints:
  GET  /knowledge-base    → KnowledgeBase[]
  GET  /phone-numbers     → PhoneNumber[]
  GET  /workflows         → Workflow[]
  GET  /voices            → Voice[]
  GET  /contacts/fields   → ContactField[]
  POST /ai-agents         → { id: string }

## Critical Files (Do Not Change Without PM Approval)
  conversation-script.ts  — All 11 turns scripted verbatim.
                            AI messages are marketing decisions, not just copy.
  prompt-generator.ts     — Generates the agent system prompt.
                            Test coverage must stay above 80%.

## Running Tests
  npx vitest run
  npx vitest run --coverage
  Coverage targets: conversation-engine.ts and prompt-generator.ts > 80%

## Current Phase
  Phase 2 — Claude Code (production build)
  Phase 1 — Lovable prototype (COMPLETE — use as visual reference only)
