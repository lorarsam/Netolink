import { Button } from '../ui/Button'

export function TransactionFilters({ filters, onChange, value }) {
  return (
    <div className="grid gap-3 rounded-3xl bg-white p-4 shadow-soft lg:grid-cols-3">
      {filters.map((filter) => (
        <div className="grid gap-2" key={filter.id}>
          <p className="text-xs font-black uppercase tracking-[0.12em] text-ink-muted">{filter.label}</p>
          <div className="flex flex-wrap gap-2">
            {filter.options.map((option) => (
              <Button
                active={value[filter.id] === option.value}
                className="px-4 py-2 text-xs"
                key={option.value}
                onClick={() => onChange(filter.id, option.value)}
                type="button"
                variant={value[filter.id] === option.value ? 'primary' : 'ghost'}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
