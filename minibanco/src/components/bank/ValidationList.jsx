import { transferRules } from '../../config/bankFlow'

export function ValidationList({ checks }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {transferRules.map((rule) => {
        const isValid = Boolean(checks[rule.id])
        return (
          <div key={rule.id} className={`rounded-2xl border px-4 py-3 text-sm font-bold ${isValid ? 'border-teal/30 bg-mint text-teal' : 'border-line bg-cream-field text-ink-muted'}`}>
            {isValid ? '✓' : '○'} {rule.label}
          </div>
        )
      })}
    </div>
  )
}
