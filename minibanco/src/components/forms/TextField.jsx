import { Icon } from '../ui/Icon'

export function TextField({ actionIcon, icon, label, rightLabel, className = '', ...inputProps }) {
  return (
    <label className={`grid gap-2 text-[10px] font-extrabold text-ink-soft ${className}`} htmlFor={inputProps.id}>
      <span className="flex items-center justify-between gap-3">
        <span>{label}</span>
        {rightLabel}
      </span>

      <span className="flex items-center gap-2 rounded-xl bg-cream-field px-3 py-2.5 text-ink-muted ring-brand/35 transition focus-within:ring-2">
        {icon && <Icon name={icon} className="h-3.5 w-3.5 shrink-0" />}
        <input
          className="min-w-0 flex-1 bg-transparent text-[11px] font-semibold text-ink outline-none placeholder:text-ink-muted/75"
          {...inputProps}
        />
        {actionIcon && <Icon name={actionIcon} className="h-3.5 w-3.5 shrink-0" />}
      </span>
    </label>
  )
}
