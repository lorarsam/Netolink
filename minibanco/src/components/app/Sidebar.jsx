import { navItems } from '../../config/bankFlow'
import { BrandLogo } from '../brand/BrandLogo'
import { Icon } from '../ui/Icon'

export function Sidebar({ activeScreen, onNavigate, onLogout }) {
  return (
    <aside className="flex w-full flex-col justify-between bg-brand px-6 py-7 text-white lg:min-h-screen lg:w-[17.5rem]">
      <div>
        <div className="mb-10 justify-start pl-1">
          <BrandLogo ariaLabel="Netolink Digital Banking" name="Netolink" />
          <p className="ml-10 mt-0.5 text-[11px] font-semibold text-white/85">Digital Banking</p>
        </div>

        <nav className="grid gap-4 sm:grid-cols-5 lg:grid-cols-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center gap-3 rounded-full px-5 py-3 text-left text-sm font-black transition ${activeScreen === item.id ? 'bg-white text-brand shadow-soft' : 'text-white/85 hover:bg-white/15'} ${item.disabled ? 'cursor-default opacity-80' : ''}`}
              onClick={() => !item.disabled && onNavigate(item.id)}
              type="button"
            >
              <Icon name={item.icon} className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <button className="mt-10 flex items-center gap-3 rounded-full px-5 py-3 text-left text-sm font-bold text-white/85 hover:bg-white/15 hover:text-white" onClick={onLogout} type="button">
        <Icon name="logout" className="h-4 w-4" />
        Logout
      </button>
    </aside>
  )
}
