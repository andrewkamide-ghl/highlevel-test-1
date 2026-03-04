import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import OnboardingPage from './pages/OnboardingPage'
import './index.css'

interface HLAiAgentsOnboardingProps {
  locationId: string
  authToken: string
  onComplete?: (agentId: string) => void
  onCancel?: () => void
  theme?: { primaryColor?: string }
}

const queryClient = new QueryClient()

export function HLAiAgentsOnboarding({
  locationId,
  authToken,
  onComplete,
  onCancel,
  theme,
}: HLAiAgentsOnboardingProps) {
  useEffect(() => {
    window.__HL_SESSION_TOKEN__ = authToken
    window.__HL_LOCATION_ID__ = locationId

    if (theme?.primaryColor) {
      document.documentElement.style.setProperty('--color-primary', theme.primaryColor)
    }
  }, [authToken, locationId, theme?.primaryColor])

  return (
    <QueryClientProvider client={queryClient}>
      <OnboardingPage onComplete={onComplete} onCancel={onCancel} />
    </QueryClientProvider>
  )
}

export default HLAiAgentsOnboarding
