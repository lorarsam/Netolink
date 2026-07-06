import { navItems } from '../../config/bankFlow'
import { BrandLogo } from '../brand/BrandLogo'

export function Sidebar({ activeScreen, onNavigate, onLogout }) {
  return (
    <aside className="flex w-full flex-col justify-between bg-brand p-5 text-white lg:min-h-screen lg:w-64">
      <div>
        <div className="mb-8 justify-start">
          <BrandLogo ariaLabel="Netolink Digital Banking" name="Netolink" />
          <p className="ml-8 mt-1 text-xs font-semibold text-white/80">Digital Banking</p>
        </div>

        <nav className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`rounded-full px-4 py-3 text-left text-sm font-bold transition ${activeScreen === item.id ? 'bg-white text-brand shadow-soft' : 'text-white/85 hover:bg-white/15'}`}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <button className="mt-8 rounded-full px-4 py-3 text-left text-sm font-bold text-white/80 hover:bg-white/15 hover:text-white" onClick={onLogout} type="button">
        Cerrar sesion
      </button>
    </aside>
  )
}
