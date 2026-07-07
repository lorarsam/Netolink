const buttonVariants = {
  primary: 'justify-center bg-brand text-white shadow-soft hover:bg-brand-dark focus-visible:ring-brand/40',
  ghost: 'justify-center bg-transparent text-brand hover:text-brand-dark focus-visible:ring-brand/30',
  sidebarPrimary: 'w-full justify-start gap-3 bg-transparent text-white/85 shadow-none hover:bg-white/15 hover:text-white focus-visible:ring-white/30 disabled:cursor-default disabled:opacity-80',
}

const activeButtonVariants = {
  sidebarPrimary: 'w-full justify-start gap-3 bg-white text-brand shadow-soft hover:bg-white focus-visible:ring-white/30',
}

const surfaceButtonVariants = {
  sidebar: {
    ghost: 'w-full justify-start gap-3 bg-transparent text-white/85 shadow-none hover:bg-white/15 hover:text-white focus-visible:ring-white/30',
  },
}

export function Button({ active = false, children, className = '', surface, type = 'button', variant = 'primary', ...props }) {
  const variantClassName = active
    ? activeButtonVariants[variant] || buttonVariants[variant]
    : surfaceButtonVariants[surface]?.[variant] || buttonVariants[variant]

  return (
    <button
      className={`inline-flex items-center rounded-full px-5 py-3 text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-4 ${variantClassName} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
