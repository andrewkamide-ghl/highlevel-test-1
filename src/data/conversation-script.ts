import type { OnboardingState } from '../stores/onboarding'
import { getDefaultAgentName } from '../services/prompt-generator'

export interface TurnConfig {
  id: number
  aiMessage: string | ((ctx: OnboardingState) => string)
  inputType: 'chips-single' | 'chips-multi' | 'text' | 'component' | 'review'
  chips?: string[]
  component?: 'AgentTypeCards' | 'PromptEditor' | 'ActionGrid' | 'KBSelector' | 'PhoneSelector' | 'AgentReview'
  textPlaceholder?: string | ((ctx: OnboardingState) => string)
  storeKey?: keyof OnboardingState
  nextTurn?: number
  skipIf?: (ctx: OnboardingState) => boolean
}

export const TURNS: TurnConfig[] = [
  {
    id: 1,
    aiMessage: "Hey! I'm Max, your AI setup guide. Before we build your agent, tell me — what's the biggest challenge you're trying to solve right now?",
    inputType: 'chips-single',
    chips: [
      "I'm missing calls after hours",
      'My team spends too much time on repetitive questions',
      'I want to qualify leads automatically',
      'I need to book more appointments',
      "Something else — I'll explain",
    ],
    storeKey: 'problem',
  },
  {
    id: 2,
    aiMessage: "Got it. What industry are you in? This helps me tailor your agent's language and tone.",
    inputType: 'chips-single',
    chips: [
      'Home Services',
      'Real Estate',
      'Healthcare',
      'Legal',
      'E-commerce',
      'Coaching / Consulting',
      'Automotive',
      'Other',
    ],
    storeKey: 'industry',
  },
  {
    id: 3,
    aiMessage: "And what's the #1 goal for this agent?",
    inputType: 'chips-single',
    chips: [
      'Answer questions 24/7',
      'Book appointments',
      'Qualify and route leads',
      'Follow up with contacts',
      'All of the above',
    ],
    storeKey: 'goal',
  },
  {
    id: 4,
    aiMessage: (ctx: OnboardingState) => {
      const recVoice =
        ctx.goal === 'Book appointments' || (ctx.problem?.includes('calls') ?? false)
      const type = recVoice ? 'Voice AI' : 'Conversation AI'
      const reason = recVoice
        ? 'your goals are phone-call focused — handling calls directly gets results fastest.'
        : 'text-based interaction fits your goals and is easiest to deploy on your site or via SMS.'
      return `Based on what you've told me, I'd recommend ${type} — ${reason} That said, the final call is yours.`
    },
    inputType: 'component',
    component: 'AgentTypeCards',
    storeKey: 'agentType',
  },
  {
    id: 5,
    aiMessage: (ctx: OnboardingState) =>
      `Great choice. What do you want to name your ${ctx.agentType === 'voice' ? 'Voice AI' : 'Conversation AI'} agent?`,
    inputType: 'text',
    textPlaceholder: (ctx: OnboardingState) => getDefaultAgentName(ctx.industry),
    storeKey: 'agentName',
  },
  {
    id: 6,
    aiMessage: (ctx: OnboardingState) =>
      `Perfect. I've drafted an opening prompt for ${ctx.agentName} based on everything you've told me. Take a look — edit anything that doesn't sound like your brand, then hit Continue.`,
    inputType: 'component',
    component: 'PromptEditor',
    storeKey: 'prompt',
  },
  {
    id: 7,
    aiMessage: (ctx: OnboardingState) =>
      `Now let's set up what ${ctx.agentName} can actually do. Add up to 6 actions — things like booking appointments, triggering workflows, or transferring calls. You can always add more later.`,
    inputType: 'component',
    component: 'ActionGrid',
    storeKey: 'actions',
  },
  {
    id: 8,
    aiMessage: (ctx: OnboardingState) =>
      `Does ${ctx.agentName} need a knowledge base? This is where you store FAQs, pricing info, and anything else the agent should know.`,
    inputType: 'component',
    component: 'KBSelector',
    storeKey: 'knowledgeBaseId',
  },
  {
    id: 9,
    aiMessage: (ctx: OnboardingState) =>
      `${ctx.agentName} is a Voice AI, so let's assign it a phone number. Which number should it answer?`,
    inputType: 'component',
    component: 'PhoneSelector',
    storeKey: 'phoneNumber',
    skipIf: (ctx: OnboardingState) => ctx.agentType !== 'voice',
  },
  {
    id: 10,
    aiMessage: (ctx: OnboardingState) => `Almost there. When should ${ctx.agentName} be active?`,
    inputType: 'chips-single',
    chips: [
      '24/7 — always on',
      'Business hours (Mon–Fri, 9am–5pm)',
      'Evenings and weekends only',
      'Let me set custom hours',
    ],
    storeKey: 'workingHours',
  },
  {
    id: 11,
    aiMessage: (ctx: OnboardingState) =>
      `Here's everything we set up for ${ctx.agentName}. Looking good? Hit Launch to make it live.`,
    inputType: 'review',
    component: 'AgentReview',
  },
]
