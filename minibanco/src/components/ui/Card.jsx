export function Card({ children, className = '' }) {
  return (
    <section className={`rounded-[1.75rem] border border-line bg-cream-card p-6 shadow-card ${className}`}>
      {children}
    </section>
  )
}
