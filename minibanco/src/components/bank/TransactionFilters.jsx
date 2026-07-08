import { useState } from 'react'
import { Button } from '../ui/Button'

export function TransactionFilters({ filters, onChange, toggleLabel, value }) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedLabels = filters
    .map((filter) => filter.options.find((option) => option.value === value[filter.id])?.label)
    .filter(Boolean)

  return (
    <div className="rounded-2xl bg-cream-card p-3 shadow-soft sm:p-4">
      <button
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 rounded-2xl bg-cream-field px-4 py-3 text-left lg:hidden"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="min-w-0">
          <span className="block text-xs font-black uppercase tracking-[0.12em] text-ink-muted">{toggleLabel}</span>
          <span className="mt-1 block truncate text-sm font-extrabold text-ink">{selectedLabels.join(' · ')}</span>
        </span>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cream-card text-lg font-black text-brand-dark">{isOpen ? '-' : '+'}</span>
      </button>

      <div className={`${isOpen ? 'grid' : 'hidden'} mt-4 gap-4 lg:mt-0 lg:grid lg:grid-cols-3`}>
        {filters.map((filter) => (
          <div className="grid gap-2" key={filter.id}>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-ink-muted">{filter.label}</p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] gap-2 sm:flex sm:flex-wrap">
              {filter.options.map((option) => (
                <Button
                  active={value[filter.id] === option.value}
                  className="justify-center px-3 py-2 text-xs sm:px-4"
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
    </div>
  )
}
