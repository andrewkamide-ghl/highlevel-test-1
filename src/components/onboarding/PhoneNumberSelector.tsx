import { usePhoneNumbers } from '../../hooks/useHLData'

interface PhoneNumberSelectorProps {
  value: string
  onChange: (number: string) => void
  onContinue?: () => void
}

export default function PhoneNumberSelector({ value, onChange, onContinue }: PhoneNumberSelectorProps) {
  const { data, isLoading } = usePhoneNumbers()

  return (
    <div className="mt-2">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-700
          focus:outline-none focus:border-primary min-h-[44px]"
        aria-label="Select phone number"
        style={{ fontSize: '16px' }}
      >
        <option value="">{isLoading ? 'Loading...' : 'Select a number...'}</option>
        {data?.map((phone) => (
          <option key={phone.number} value={phone.number}>
            {phone.number} — {phone.label}
          </option>
        ))}
      </select>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onContinue}
          disabled={!value}
          className="px-5 py-2 bg-primary text-white rounded-full text-sm font-semibold
            min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
