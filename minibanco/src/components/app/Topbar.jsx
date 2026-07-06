import { StatusBadge } from '../ui/StatusBadge'

export function Topbar({ title, user }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-cream-soft px-5 py-4 lg:px-8">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark">Workspace</p>
        <h1 className="text-2xl font-black tracking-tight text-ink">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <StatusBadge variant="success">Tiempo real activo</StatusBadge>
        <div className="hidden text-right sm:block">
          <p className="text-sm font-black">{user.name}</p>
          <p className="text-xs text-ink-muted">{user.email}</p>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-sm font-black text-white">{user.name.slice(0, 1)}</span>
      </div>
    </header>
  )
}
