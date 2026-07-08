import { Icon } from './Icon'

const variants = {
  auth: {
    label: 'gap-2 text-[10px] font-extrabold text-ink-soft',
    control: 'rounded-xl bg-cream-field px-3 py-2.5 text-ink-muted',
    input: 'text-[11px] font-semibold',
    icon: 'h-3.5 w-3.5',
  },
  bank: {
    label: 'gap-3 text-xs font-black uppercase tracking-[0.14em] text-ink-soft',
    control: 'h-14 rounded-2xl bg-cream-field px-5 text-ink-muted',
    input: 'text-sm font-semibold normal-case tracking-normal',
    icon: 'h-4 w-4',
  },
  bankAmount: {
    label: 'gap-3 text-xs font-black uppercase tracking-[0.14em] text-ink-soft',
    control: 'h-14 rounded-2xl bg-cream-field px-5 text-ink-muted',
    input: 'text-2xl font-black normal-case tracking-normal',
    icon: 'h-4 w-4',
  },
}

const valueFilters = {
  number: (value) => value.replace(/[^0-9]/g, ''),
  decimal: (value) => {
    const cleanValue = value.replace(/[^0-9.]/g, '')
    const [integerPart, ...decimalParts] = cleanValue.split('.')

    return decimalParts.length ? `${integerPart}.${decimalParts.join('')}` : integerPart
  },
  text: (value) => value,
}

export function InputField({
  action,
  badge,
  className = '',
  controlClassName = '',
  dropdown,
  iconLeft,
  iconRight,
  inputClassName = '',
  label,
  prefix,
  rightLabel,
  suffix,
  valueType,
  variant = 'bank',
  ...inputProps
}) {
  const styles = variants[variant] || variants.bank
  const handleChange = valueType && inputProps.onChange
    ? (event) => {
      const filter = valueFilters[valueType]
      if (!filter) {
        inputProps.onChange(event)
        return
      }

      const nextValue = filter(event.target.value)
      inputProps.onChange({ ...event, target: { ...event.target, value: nextValue, name: event.target.name } })
    }
    : inputProps.onChange

  return (
    <div className={`relative grid content-start ${styles.label} ${className}`}>
      {(label || rightLabel) && (
        <span className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          {label && <label htmlFor={inputProps.id}>{label}</label>}
          {rightLabel && <span className="text-right normal-case tracking-normal">{rightLabel}</span>}
        </span>
      )}

      <span className={`flex min-w-0 items-center gap-3 ring-brand/35 transition focus-within:ring-2 ${styles.control} ${controlClassName}`}>
        {iconLeft && <Icon name={iconLeft} className={`${styles.icon} shrink-0`} />}
        {prefix && <span className="shrink-0 text-2xl font-black text-ink-muted">{prefix}</span>}
        <input
          className={`min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink-muted/75 ${styles.input} ${inputClassName}`}
          {...inputProps}
          onChange={handleChange}
        />
        {suffix && <span className="shrink-0 text-sm font-bold text-ink-muted">{suffix}</span>}
        {badge && <span className="hidden shrink-0 rounded-full bg-cream-card px-3 py-1 text-[11px] font-black normal-case tracking-normal text-teal sm:inline-flex">{badge}</span>}
        {iconRight && <Icon name={iconRight} className={`${styles.icon} shrink-0`} />}
        {action}
      </span>

      {dropdown}
    </div>
  )
}
