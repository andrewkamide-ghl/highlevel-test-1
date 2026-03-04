import axios from 'axios'

declare global {
  interface Window {
    __HL_SESSION_TOKEN__?: string
    __HL_LOCATION_ID__?: string
  }
}

const BASE_URL = 'https://services.leadconnectorhq.com'

export interface KnowledgeBase {
  id: string
  name: string
}

export interface PhoneNumber {
  number: string
  label: string
  attachedTo?: string
}

export interface Workflow {
  id: string
  name: string
}

export interface Voice {
  id: string
  name: string
  gender: string
  accent: string
}

export interface ContactField {
  key: string
  label: string
  type: string
}

export interface AiAgentConfig {
  agent_type: string
  name: string
  system_prompt: string
  voice_id?: string
  actions?: Array<{ id: string; type: string; config: Record<string, unknown> }>
  knowledge_base_id?: string
  phone_number?: string
  working_hours?: Record<string, { start: string; end: string } | 'unavailable'>
}

function getHeaders() {
  return {
    Authorization: `Bearer ${window.__HL_SESSION_TOKEN__}`,
    'Content-Type': 'application/json',
  }
}

async function isMockMode(): Promise<boolean> {
  return !window.__HL_SESSION_TOKEN__
}

export async function getKnowledgeBases(): Promise<KnowledgeBase[] | null> {
  if (await isMockMode()) {
    const { knowledgeBases } = await import('../data/fixtures')
    return knowledgeBases
  }
  try {
    const res = await axios.get(`${BASE_URL}/knowledge-base`, { headers: getHeaders() })
    return res.data as KnowledgeBase[]
  } catch (error) {
    console.error('[HL API]', '/knowledge-base', error)
    return null
  }
}

export async function getPhoneNumbers(): Promise<PhoneNumber[] | null> {
  if (await isMockMode()) {
    const { phoneNumbers } = await import('../data/fixtures')
    return phoneNumbers
  }
  try {
    const res = await axios.get(`${BASE_URL}/phone-numbers`, { headers: getHeaders() })
    return res.data as PhoneNumber[]
  } catch (error) {
    console.error('[HL API]', '/phone-numbers', error)
    return null
  }
}

export async function getWorkflows(): Promise<Workflow[] | null> {
  if (await isMockMode()) {
    const { workflows } = await import('../data/fixtures')
    return workflows
  }
  try {
    const res = await axios.get(`${BASE_URL}/workflows`, { headers: getHeaders() })
    return res.data as Workflow[]
  } catch (error) {
    console.error('[HL API]', '/workflows', error)
    return null
  }
}

export async function getVoices(): Promise<Voice[] | null> {
  if (await isMockMode()) {
    const { voices } = await import('../data/fixtures')
    return voices
  }
  try {
    const res = await axios.get(`${BASE_URL}/voices`, { headers: getHeaders() })
    return res.data as Voice[]
  } catch (error) {
    console.error('[HL API]', '/voices', error)
    return null
  }
}

export async function getContactFields(): Promise<ContactField[] | null> {
  if (await isMockMode()) {
    const { contactFields } = await import('../data/fixtures')
    return contactFields
  }
  try {
    const res = await axios.get(`${BASE_URL}/contacts/fields`, { headers: getHeaders() })
    return res.data as ContactField[]
  } catch (error) {
    console.error('[HL API]', '/contacts/fields', error)
    return null
  }
}

export async function createAiAgent(config: AiAgentConfig): Promise<{ id: string } | null> {
  if (await isMockMode()) {
    // Simulate API delay and return mock agent id
    await new Promise((resolve) => setTimeout(resolve, 1200))
    return { id: `agent-${Date.now()}` }
  }
  try {
    const res = await axios.post(`${BASE_URL}/ai-agents`, config, { headers: getHeaders() })
    return res.data as { id: string }
  } catch (error) {
    console.error('[HL API]', '/ai-agents', error)
    return null
  }
}
