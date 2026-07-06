const buttonVariants = {
  primary: 'bg-brand text-white shadow-soft hover:bg-brand-dark focus-visible:ring-brand/40',
  ghost: 'bg-transparent text-brand hover:text-brand-dark focus-visible:ring-brand/30',
}

export function Button({ children, className = '', type = 'button', variant = 'primary', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-extrabold transition focus-visible:outline-none focus-visible:ring-4 ${buttonVariants[variant]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
