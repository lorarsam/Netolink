const buttonVariants = {
  primary: 'justify-center bg-brand px-5 py-3 text-cream-card shadow-soft hover:bg-brand-dark focus-visible:ring-brand/40',
  ghost: 'justify-center bg-transparent px-5 py-3 text-brand hover:text-brand-dark focus-visible:ring-brand/30',
  iconGhost: 'h-8 w-8 justify-center bg-transparent p-0 text-ink-soft hover:bg-cream-field focus-visible:ring-brand/30',
  recipient: 'w-full justify-start gap-3 rounded-xl bg-cream-field px-4 py-2.5 text-left text-sm text-ink shadow-none hover:bg-cream focus-visible:ring-brand/30',
  recipientOption: 'w-full justify-start gap-3 rounded-none bg-transparent px-4 py-3 text-left text-sm text-ink shadow-none hover:bg-cream-field focus-visible:ring-brand/30',
  textGhost: 'justify-center bg-transparent px-0 py-0 text-brand hover:text-brand-dark focus-visible:ring-brand/30',
  sidebarPrimary: 'w-full flex-col justify-center gap-1 bg-transparent px-2 py-2 text-[11px] text-cream-card/85 shadow-none hover:bg-cream-card/15 hover:text-cream-card focus-visible:ring-cream-card/30 disabled:cursor-default disabled:opacity-80 lg:flex-row lg:justify-start lg:gap-3 lg:px-5 lg:py-3 lg:text-sm',
}

const activeButtonVariants = {
  sidebarPrimary: 'w-full flex-col justify-center gap-1 bg-cream-card px-2 py-2 text-[11px] text-brand shadow-soft hover:bg-cream-card focus-visible:ring-cream-card/30 lg:flex-row lg:justify-start lg:gap-3 lg:px-5 lg:py-3 lg:text-sm',
}

const surfaceButtonVariants = {
  sidebar: {
    ghost: 'w-full justify-start gap-3 bg-transparent px-5 py-3 text-cream-card/85 shadow-none hover:bg-cream-card/15 hover:text-cream-card focus-visible:ring-cream-card/30',
  },
}

export function Button({ active = false, children, className = '', surface, type = 'button', variant = 'primary', ...props }) {
  const variantClassName = active
    ? activeButtonVariants[variant] || buttonVariants[variant]
    : surfaceButtonVariants[surface]?.[variant] || buttonVariants[variant]

  return (
    <button
      className={`inline-flex items-center rounded-full text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-4 ${variantClassName} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
