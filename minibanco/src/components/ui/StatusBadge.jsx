const variants = {
  success: 'bg-mint text-teal',
  danger: 'bg-blush text-brand-dark',
  neutral: 'bg-cream-field text-ink-muted',
}

export function StatusBadge({ children, variant = 'neutral' }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${variants[variant]}`}>{children}</span>
}
