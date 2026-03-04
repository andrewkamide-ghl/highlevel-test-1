import { useKnowledgeBases } from '../../hooks/useHLData'

interface KnowledgeBaseSelectorProps {
  value: string
  onChange: (id: string) => void
  onContinue?: () => void
}

export default function KnowledgeBaseSelector({ value, onChange, onContinue }: KnowledgeBaseSelectorProps) {
  const { data, isLoading } = useKnowledgeBases()

  return (
    <div className="mt-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-700
          focus:outline-none focus:border-primary min-h-[44px]"
        aria-label="Select knowledge base"
        style={{ fontSize: '16px' }}
      >
        <option value="">{isLoading ? 'Loading...' : 'None (skip)'}</option>
        {data?.map((kb) => (
          <option key={kb.id} value={kb.id}>{kb.name}</option>
        ))}
        {!isLoading && data?.length === 0 && (
          <option disabled>No knowledge bases — Create one first</option>
        )}
      </select>

      {!isLoading && data?.length === 0 && (
        <p className="mt-2 text-sm text-primary">
          <a href="/knowledge-base/new" className="hover:underline">
            No knowledge bases — Create one →
          </a>
        </p>
      )}

      <div className="mt-4 flex justify-end">
        <button
          onClick={onContinue}
          className="px-5 py-2 bg-primary text-white rounded-full text-sm font-semibold
            min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            hover:opacity-90 transition-opacity"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
