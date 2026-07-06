import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AppShell({ activeScreen, children, onLogout, onNavigate, title, user }) {
  return (
    <div className="min-h-screen bg-cream text-ink lg:flex">
      <Sidebar activeScreen={activeScreen} onLogout={onLogout} onNavigate={onNavigate} />
      <main className="min-w-0 flex-1">
        <Topbar title={title} user={user} />
        <div className="p-5 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
