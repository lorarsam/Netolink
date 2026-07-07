import { BrandLogo } from '../brand/BrandLogo'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'

export function Sidebar({ activeItem, brand, items = [], logoutItem, onLogout, onNavigate, subtitle }) {
  return (
    <aside className="flex w-full flex-col justify-between bg-brand px-6 py-7 text-white lg:min-h-screen lg:w-[17.5rem]">
      <div>
        {brand ? (
          <div className="mb-10 justify-start pl-1">
            <BrandLogo ariaLabel={brand.ariaLabel} name={brand.name} />
            {subtitle ? <p className="ml-10 mt-0.5 text-[11px] font-semibold text-white/85">{subtitle}</p> : null}
          </div>
        ) : null}

        <nav className="grid gap-4 sm:grid-cols-5 lg:grid-cols-1">
          {items.map((item) => (
            <Button
              active={activeItem === item.id}
              disabled={item.disabled}
              key={item.id}
              onClick={() => !item.disabled && onNavigate?.(item.id)}
              type="button"
              variant="sidebarPrimary"
            >
              <Icon name={item.icon} className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>

      {logoutItem && onLogout ? (
        <Button onClick={onLogout} surface="sidebar" type="button" variant="ghost">
          <Icon name={logoutItem.icon} className="h-4 w-4" />
          {logoutItem.label}
        </Button>
      ) : null}
    </aside>
  )
}
