const cardVariants = {
  default: 'rounded-[1.4rem] border border-line bg-cream-card p-4 shadow-card sm:rounded-[1.75rem] sm:p-6',
  flat: 'rounded-[1.25rem] border border-line bg-white p-4 shadow-soft sm:rounded-[1.5rem] sm:p-5',
  metric: 'rounded-[1.25rem] border border-line/80 bg-white p-4 shadow-soft sm:rounded-[1.5rem] sm:p-5',
}

const interactiveClassName = 'transition duration-200 ease-out hover:-translate-y-1 hover:shadow-card'

export function Card({ children, className = '', interactive = false, variant = 'default' }) {
  return (
    <section className={`${cardVariants[variant]} ${interactive ? interactiveClassName : ''} ${className}`}>
      {children}
    </section>
  )
}
