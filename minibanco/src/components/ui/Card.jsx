const cardVariants = {
  default: 'rounded-[1.75rem] border border-line bg-cream-card p-6 shadow-card',
  flat: 'rounded-[1.5rem] border border-line bg-white p-5 shadow-soft',
  metric: 'rounded-[1.5rem] border border-line/80 bg-white p-5 shadow-soft',
}

const interactiveClassName = 'transition duration-200 ease-out hover:-translate-y-1 hover:shadow-card'

export function Card({ children, className = '', interactive = false, variant = 'default' }) {
  return (
    <section className={`${cardVariants[variant]} ${interactive ? interactiveClassName : ''} ${className}`}>
      {children}
    </section>
  )
}
