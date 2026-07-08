import { useMemo, useState } from 'react'
import { AppShell } from './components/app/AppShell'
import { screens, transactionContent, transferSuccessContent } from './config/bankFlow'
import { initialAccount } from './data/mockAccount'
import { initialTransactions } from './data/mockTransactions'
import { currentUser, registeredUsers } from './data/mockUsers'
import { DashboardView } from './views/DashboardView'
import { HistoryView } from './views/HistoryView'
import { LoginView } from './views/LoginView'
import { RegisterView } from './views/RegisterView'
import { TransferSuccessView } from './views/TransferSuccessView'
import { TransferView } from './views/TransferView'
import { sortByNewest } from './utils/formatters'

const titles = {
  [screens.dashboard]: 'Dashboard',
  [screens.transfer]: 'Transferir dinero',
  [screens.success]: 'Transferencia exitosa',
  [screens.history]: 'Historial',
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [screen, setScreen] = useState(screens.login)
  const [account, setAccount] = useState(initialAccount)
  const [user, setUser] = useState(currentUser)
  const [users, setUsers] = useState(registeredUsers)
  const [transactions, setTransactions] = useState(initialTransactions)
  const [lastTransfer, setLastTransfer] = useState(null)

  const orderedTransactions = useMemo(() => sortByNewest(transactions), [transactions])

  function handleLogin(event) {
    event.preventDefault()
    setIsAuthenticated(true)
    setScreen(screens.dashboard)
  }

  function handleRegister(form) {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: form.name || 'Nuevo usuario',
      email: form.email || 'nuevo@netolink.cl',
    }

    setUser(newUser)
    setUsers((current) => [newUser, ...current])
    setAccount({ ...initialAccount, ownerId: newUser.id, balance: 100000 })
    setTransactions([])
    setIsAuthenticated(true)
    setScreen(screens.dashboard)
  }

  function handleLogout() {
    setIsAuthenticated(false)
    setScreen(screens.login)
    setLastTransfer(null)
  }

  function handleConfirmTransfer(transfer) {
    const movement = {
      id: `TRX-${Date.now().toString().slice(-6)}`,
      type: transactionContent.defaults.transferType,
      counterparty: transfer.recipient.name,
      description: transfer.description || transactionContent.defaults.transferDescription,
      amount: transfer.amount,
      date: new Date().toISOString(),
      status: transactionContent.defaults.transferStatus,
    }

    setAccount((current) => ({ ...current, balance: current.balance - transfer.amount }))
    setTransactions((current) => [movement, ...current])
    setLastTransfer({ ...movement, recipient: transfer.recipient })
    setScreen(screens.success)
  }

  if (!isAuthenticated) {
    if (screen === screens.register) {
      return (
        <RegisterView
          initialBalance={initialAccount.balance}
          onBackToLogin={() => setScreen(screens.login)}
          onRegister={handleRegister}
        />
      )
    }

    return <LoginView onLogin={handleLogin} onRegister={() => setScreen(screens.register)} />
  }

  return (
    <AppShell activeScreen={screen} onLogout={handleLogout} onNavigate={setScreen} title={titles[screen] || 'Netolink'} user={user}>
      {screen === screens.dashboard && (
        <DashboardView
          account={account}
          onHistory={() => setScreen(screens.history)}
          onTransfer={() => setScreen(screens.transfer)}
          transactions={orderedTransactions}
        />
      )}

      {screen === screens.transfer && (
        <TransferView
          account={account}
          currentUser={user}
          onCancel={() => setScreen(screens.dashboard)}
          onConfirm={handleConfirmTransfer}
          users={users}
        />
      )}

      {screen === screens.success && lastTransfer && (
        <TransferSuccessView
          content={transferSuccessContent}
          lastTransfer={lastTransfer}
          onDashboard={() => setScreen(screens.dashboard)}
          onHistory={() => setScreen(screens.history)}
          onTransferAgain={() => setScreen(screens.transfer)}
        />
      )}

      {screen === screens.history && (
        <HistoryView onDashboard={() => setScreen(screens.dashboard)} transactions={orderedTransactions} />
      )}
    </AppShell>
  )
}
