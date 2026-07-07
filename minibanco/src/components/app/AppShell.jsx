import { appNavbar, appSidebar } from '../../config/bankFlow'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export function AppShell({ activeScreen, children, onLogout, onNavigate, title, user }) {
  return (
    <div className="min-h-screen bg-cream text-ink lg:flex">
      <Sidebar activeItem={activeScreen} onLogout={onLogout} onNavigate={onNavigate} {...appSidebar} />
      <main className="min-w-0 flex-1">
        <Navbar title={title} user={user} {...appNavbar} />
        <div className="px-5 pb-8 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
