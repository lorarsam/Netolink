import { BrandLogo } from '../brand/BrandLogo'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'

export function Sidebar({ activeItem, brand, items = [], logoutItem, onLogout, onNavigate, subtitle }) {
  return (
    <aside className="fixed inset-x-0 bottom-0 z-30 border-t border-cream-card/15 bg-brand px-3 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 text-cream-card shadow-card lg:static lg:flex lg:min-h-screen lg:w-[17.5rem] lg:flex-col lg:justify-between lg:border-t-0 lg:px-6 lg:py-7 lg:shadow-none">
      <div>
        {brand ? (
          <div className="mb-10 hidden justify-start pl-1 lg:block">
            <BrandLogo ariaLabel={brand.ariaLabel} iconSrc={brand.iconSrc} name={brand.name} />
            {subtitle ? <p className="ml-10 mt-0.5 text-[11px] font-semibold text-cream-card/85">{subtitle}</p> : null}
          </div>
        ) : null}

        <nav className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2 lg:grid-cols-1 lg:gap-4" aria-label="Navegacion principal">
          {items.map((item) => (
            <Button
              active={activeItem === item.id}
              disabled={item.disabled}
              key={item.id}
              onClick={() => !item.disabled && onNavigate?.(item.id)}
              aria-label={item.label}
              type="button"
              variant="sidebarPrimary"
            >
              <Icon name={item.icon} className="h-5 w-5 lg:h-4 lg:w-4" />
              <span className="hidden max-w-full truncate text-[10px] sm:block lg:text-sm">{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>

      {logoutItem && onLogout ? (
        <Button className="hidden lg:inline-flex" onClick={onLogout} surface="sidebar" type="button" variant="ghost">
          <Icon name={logoutItem.icon} className="h-4 w-4" />
          {logoutItem.label}
        </Button>
      ) : null}
    </aside>
  )
}
