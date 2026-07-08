import { appNavbar, appSidebar } from '../../config/bankFlow'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export function AppShell({ activeScreen, children, onLogout, onNavigate, title, user }) {
  return (
    <div className="min-h-screen bg-cream text-ink lg:flex">
      <Sidebar activeItem={activeScreen} onLogout={onLogout} onNavigate={onNavigate} {...appSidebar} />
      <main className="min-w-0 flex-1">
        <Navbar title={title} user={user} {...appNavbar} />
        <div className="px-4 pb-28 pt-5 sm:px-5 sm:pt-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  )
}
