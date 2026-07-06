import { flowSteps } from '../../config/bankFlow'
import { StatusBadge } from '../ui/StatusBadge'

export function FlowStatus() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {flowSteps.map((step) => (
        <div key={step} className="rounded-2xl border border-line bg-white p-4 shadow-soft">
          <StatusBadge variant="success">Activo</StatusBadge>
          <p className="mt-3 text-sm font-black text-ink-soft">{step}</p>
        </div>
      ))}
    </div>
  )
}
