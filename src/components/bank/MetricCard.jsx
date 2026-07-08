import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'

const toneClassNames = {
  brand: 'text-brand-dark bg-brand-soft/60',
  ink: 'text-ink bg-cream-field',
  teal: 'text-teal bg-mint',
}

const changeToneClassNames = {
  danger: 'text-brand-dark bg-blush',
  neutral: 'text-ink-muted bg-cream-field',
  success: 'text-teal bg-mint',
}

export function MetricCard({ change, changeTone = 'neutral', description, icon, label, tone = 'ink', value }) {
  return (
    <Card interactive variant="metric">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-ink-muted">{label}</p>
          <p className="mt-3 break-words text-2xl font-black tracking-tight text-ink sm:text-3xl">{value}</p>
        </div>
        {icon ? (
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${toneClassNames[tone]}`}>
            <Icon name={icon} className="h-5 w-5" />
          </span>
        ) : null}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold text-ink-muted">{description}</p>
        {change ? <span className={`rounded-full px-3 py-1 text-xs font-black ${changeToneClassNames[changeTone]}`}>{change}</span> : null}
      </div>
    </Card>
  )
}
