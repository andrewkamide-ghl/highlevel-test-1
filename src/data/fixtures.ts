import type { KnowledgeBase, PhoneNumber, Workflow, Voice, ContactField } from '../services/hl-api'

export const knowledgeBases: KnowledgeBase[] = [
  { id: 'kb-1', name: 'Product FAQ' },
  { id: 'kb-2', name: 'Pricing Guide' },
  { id: 'kb-3', name: 'Service Areas' },
]

export const phoneNumbers: PhoneNumber[] = [
  { number: '+1 (555) 234-5678', label: 'Main Business Line' },
  { number: '+1 (555) 987-6543', label: 'After-Hours Support', attachedTo: undefined },
]

export const workflows: Workflow[] = [
  { id: 'wf-1', name: 'Lead Qualification' },
  { id: 'wf-2', name: 'Appointment Reminder' },
  { id: 'wf-3', name: 'Follow-Up Sequence' },
  { id: 'wf-4', name: 'New Customer Welcome' },
]

export const voices: Voice[] = [
  { id: 'v-1', name: 'Sarah', gender: 'female', accent: 'American' },
  { id: 'v-2', name: 'James', gender: 'male', accent: 'American' },
  { id: 'v-3', name: 'Emily', gender: 'female', accent: 'British' },
  { id: 'v-4', name: 'Marcus', gender: 'male', accent: 'British' },
  { id: 'v-5', name: 'Sofia', gender: 'female', accent: 'Australian' },
  { id: 'v-6', name: 'Daniel', gender: 'male', accent: 'Australian' },
]

export const contactFields: ContactField[] = [
  { key: 'first_name', label: 'First Name', type: 'text' },
  { key: 'last_name', label: 'Last Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'phone', label: 'Phone', type: 'phone' },
  { key: 'company_name', label: 'Company Name', type: 'text' },
  { key: 'source', label: 'Lead Source', type: 'text' },
]
