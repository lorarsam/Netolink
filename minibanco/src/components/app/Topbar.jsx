import { Icon } from '../ui/Icon'

export function Topbar({ title, user }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 bg-cream-soft px-5 py-5 lg:px-8">
      <div className="flex flex-wrap items-end gap-8">
        <h1 className="text-xl font-black tracking-tight text-brand-dark">Workspace</h1>
        <nav className="flex gap-6 text-[11px] font-black text-ink-muted">
          <span className="border-b-2 border-brand pb-2 text-brand-dark">Overview</span>
          <span className="pb-2">Reports</span>
          <span className="pb-2">Analytics</span>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full bg-cream-field px-4 py-2 text-[11px] font-semibold text-ink-muted md:flex">
          <Icon name="search" className="h-3.5 w-3.5" />
          Search...
        </div>
        <button className="grid h-8 w-8 place-items-center rounded-full text-ink-soft hover:bg-cream-field" type="button" aria-label="Notifications">
          <Icon name="bell" className="h-4 w-4" />
        </button>
        <button className="grid h-8 w-8 place-items-center rounded-full text-ink-soft hover:bg-cream-field" type="button" aria-label="Help">
          <Icon name="help" className="h-4 w-4" />
        </button>
        <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-brand text-sm font-black text-white" title={title}>
          {user.name.slice(0, 1)}
        </span>
      </div>
    </header>
  )
}
