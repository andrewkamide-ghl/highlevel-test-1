import { describe, it, expect } from 'vitest'
import { generateAgentPrompt, getDefaultAgentName } from '../prompt-generator'

const industries = [
  'Home Services',
  'Real Estate',
  'Healthcare',
  'Legal',
  'E-commerce',
  'Coaching / Consulting',
  'Automotive',
  'Other',
]

const goals = [
  'Book appointments',
  'Qualify and route leads',
  'Answer questions 24/7',
  'Follow up with contacts',
  'All of the above',
]

describe('generateAgentPrompt', () => {
  // 40 combinations: 8 industries × 5 goals
  for (const industry of industries) {
    for (const goal of goals) {
      it(`generates valid prompt for ${industry} / ${goal}`, () => {
        const agentName = getDefaultAgentName(industry)
        const output = generateAgentPrompt({ industry, goal, agentName })

        expect(output).toContain('## ROLE')
        expect(output).toContain('## PERSONALITY')
        expect(output).toContain('## BEHAVIORS')
        expect(output).toContain('## INTENTS')
        expect(output).toContain(agentName)
        expect(output.length).toBeGreaterThanOrEqual(900)
        expect(output.length).toBeLessThanOrEqual(1600)
      })
    }
  }
})

describe('getDefaultAgentName', () => {
  it('returns Aria for Home Services', () => {
    expect(getDefaultAgentName('Home Services')).toBe('Aria')
  })

  it('returns Jordan for Real Estate', () => {
    expect(getDefaultAgentName('Real Estate')).toBe('Jordan')
  })

  it('returns Riley for Healthcare', () => {
    expect(getDefaultAgentName('Healthcare')).toBe('Riley')
  })

  it('returns Max for unknown industry', () => {
    expect(getDefaultAgentName('Other')).toBe('Max')
    expect(getDefaultAgentName('')).toBe('Max')
  })
})
