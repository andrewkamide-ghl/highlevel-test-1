import { useQuery } from '@tanstack/react-query'
import {
  getKnowledgeBases,
  getPhoneNumbers,
  getWorkflows,
  getVoices,
} from '../services/hl-api'

const FIVE_MINUTES = 5 * 60 * 1000

export function useKnowledgeBases() {
  return useQuery({
    queryKey: ['knowledgeBases'],
    queryFn: getKnowledgeBases,
    staleTime: FIVE_MINUTES,
    retry: 2,
  })
}

export function usePhoneNumbers() {
  return useQuery({
    queryKey: ['phoneNumbers'],
    queryFn: getPhoneNumbers,
    staleTime: FIVE_MINUTES,
    retry: 2,
  })
}

export function useWorkflows() {
  return useQuery({
    queryKey: ['workflows'],
    queryFn: getWorkflows,
    staleTime: FIVE_MINUTES,
    retry: 2,
  })
}

export function useVoices() {
  return useQuery({
    queryKey: ['voices'],
    queryFn: getVoices,
    staleTime: FIVE_MINUTES,
    retry: 2,
  })
}
