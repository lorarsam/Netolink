import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'

export function Navbar({ actions = [], searchPlaceholder, title, user }) {
  const userInitial = user?.name?.slice(0, 1) || ''

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 bg-cream-soft px-5 py-5 lg:px-8">
      <h1 className="text-xl font-black tracking-tight text-brand-dark">{title}</h1>

      <div className="flex items-center gap-3">
        {searchPlaceholder ? (
          <div className="hidden items-center gap-2 rounded-full bg-cream-field px-4 py-2 text-[11px] font-semibold text-ink-muted md:flex">
            <Icon name="search" className="h-3.5 w-3.5" />
            {searchPlaceholder}
          </div>
        ) : null}
        {actions.map((action) => (
          <Button key={action.id} type="button" aria-label={action.ariaLabel} variant="iconGhost">
            <Icon name={action.icon} className="h-4 w-4" />
          </Button>
        ))}
        <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-brand text-sm font-black text-white" title={user?.name}>
          {userInitial}
        </span>
      </div>
    </header>
  )
}
