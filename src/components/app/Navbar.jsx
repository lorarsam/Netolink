import { useState } from 'react'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'

export function Navbar({ actions = [], logoutItem, onLogout, onToggleTheme, searchPlaceholder, theme = 'light', title, user }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const userInitial = user?.name?.slice(0, 1) || ''
  const profileLabel = user?.name || user?.email || ''
  const isDarkTheme = theme === 'dark'

  function handleLogout() {
    setIsProfileOpen(false)
    onLogout?.()
  }

  return (
    <header className="flex items-center justify-between gap-3 bg-cream-soft px-4 py-4 sm:px-5 sm:py-5 lg:px-8">
      <h1 className="min-w-0 truncate text-lg font-black tracking-tight text-brand-dark sm:text-xl">{title}</h1>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
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
        <Button
          type="button"
          aria-label={isDarkTheme ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          onClick={onToggleTheme}
          title={isDarkTheme ? 'Modo claro' : 'Modo oscuro'}
          variant="iconGhost"
        >
          <Icon name={isDarkTheme ? 'sun' : 'moon'} className="h-4 w-4" />
        </Button>
        <div className="relative">
          <button
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
            aria-label={profileLabel}
            className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-brand text-sm font-black text-onBrand transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
            onClick={() => setIsProfileOpen((current) => !current)}
            title={profileLabel}
            type="button"
          >
            {userInitial}
          </button>

          {isProfileOpen && logoutItem && onLogout ? (
            <div className="absolute right-0 top-full z-40 mt-3 min-w-44 rounded-2xl border border-line bg-cream-card p-2 shadow-card" role="menu">
              <button
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-extrabold text-brand transition hover:bg-blush hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                onClick={handleLogout}
                role="menuitem"
                type="button"
              >
                <Icon name={logoutItem.icon} className="h-4 w-4 shrink-0" />
                <span>{logoutItem.label}</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
