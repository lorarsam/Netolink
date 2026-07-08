const buttonVariants = {
  primary: 'justify-center border-transparent bg-button-primary px-5 py-3 text-button-primaryText shadow-soft hover:bg-button-primaryHover focus-visible:ring-button-focus/40',
  secondary: 'justify-center border-button-secondaryBorder bg-button-secondary/0 px-5 py-3 text-button-secondaryText shadow-none hover:bg-button-secondaryHover/10 focus-visible:ring-button-focus/40',
  ghost: 'justify-center border-transparent bg-transparent px-5 py-3 text-button-ghostText shadow-none hover:bg-button-ghostHover/10 focus-visible:ring-button-focus/30',
  iconGhost: 'h-8 w-8 justify-center border-transparent bg-transparent p-0 text-textTheme-soft hover:bg-surface-hover focus-visible:ring-action/30',
  recipient: 'w-full justify-start gap-3 rounded-xl border-transparent bg-surface-field px-4 py-2.5 text-left text-sm text-textTheme shadow-none hover:bg-surface-soft focus-visible:ring-action/30',
  recipientOption: 'w-full justify-start gap-3 rounded-none border-transparent bg-transparent px-4 py-3 text-left text-sm text-textTheme shadow-none hover:bg-surface-hover focus-visible:ring-action/30',
  textGhost: 'justify-center border-transparent bg-transparent px-0 py-0 text-action hover:text-brand-dark focus-visible:ring-action/30',
  sidebarPrimary: 'w-full flex-col justify-center gap-1 border-transparent bg-transparent px-2 py-2 text-[11px] text-navAction-text shadow-none hover:bg-navAction-hover/15 hover:text-navAction-hoverText focus-visible:ring-navAction-hover/30 disabled:cursor-default disabled:opacity-80 lg:flex-row lg:justify-start lg:gap-3 lg:px-5 lg:py-3 lg:text-sm',
}

const activeButtonVariants = {
  sidebarPrimary: 'w-full flex-col justify-center gap-1 border-transparent bg-navAction-active px-2 py-2 text-[11px] text-navAction-activeText shadow-soft hover:bg-navAction-active focus-visible:ring-navAction-activeText/30 lg:flex-row lg:justify-start lg:gap-3 lg:px-5 lg:py-3 lg:text-sm',
}

const surfaceButtonVariants = {
  sidebar: {
    ghost: 'w-full justify-start gap-3 border-transparent bg-transparent px-5 py-3 text-action-text shadow-none hover:bg-action-hover/15 hover:text-action-activeText focus-visible:ring-action-hover/30',
  },
}

export function Button({ active = false, children, className = '', surface, type = 'button', variant = 'primary', ...props }) {
  const variantClassName = active
    ? activeButtonVariants[variant] || buttonVariants[variant]
    : surfaceButtonVariants[surface]?.[variant] || buttonVariants[variant]

  return (
    <button
      className={`inline-flex items-center rounded-full border text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-4 ${variantClassName} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
