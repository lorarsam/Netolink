import { useState } from 'react'
import { Icon } from '../ui/Icon'

export function TextField({ actionIcon, actionLabels, icon, label, rightLabel, className = '', ...inputProps }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const canTogglePassword = inputProps.type === 'password' && actionIcon
  const inputType = canTogglePassword && isPasswordVisible ? 'text' : inputProps.type
  const actionLabel = isPasswordVisible ? actionLabels?.hide : actionLabels?.show

  return (
    <div className={`grid gap-2 text-[10px] font-extrabold text-ink-soft ${className}`}>
      <span className="flex items-center justify-between gap-3">
        <label htmlFor={inputProps.id}>{label}</label>
        {rightLabel}
      </span>

      <span className="flex items-center gap-2 rounded-xl bg-cream-field px-3 py-2.5 text-ink-muted ring-brand/35 transition focus-within:ring-2">
        {icon && <Icon name={icon} className="h-3.5 w-3.5 shrink-0" />}
        <input
          className="min-w-0 flex-1 bg-transparent text-[11px] font-semibold text-ink outline-none placeholder:text-ink-muted/75"
          {...inputProps}
          type={inputType}
        />
        {canTogglePassword ? (
          <button
            aria-label={actionLabel}
            aria-pressed={isPasswordVisible}
            className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-ink-muted transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
            onClick={() => setIsPasswordVisible((current) => !current)}
            type="button"
          >
            <Icon name={isPasswordVisible ? 'eyeOff' : actionIcon} className="h-3.5 w-3.5" />
          </button>
        ) : actionIcon ? <Icon name={actionIcon} className="h-3.5 w-3.5 shrink-0" /> : null}
      </span>
    </div>
  )
}
