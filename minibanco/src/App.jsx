import { useEffect, useMemo, useState } from 'react'
import { AppShell } from './components/app/AppShell'
import { screens, transferSuccessContent } from './config/bankFlow'
import { subscribeMovements, subscribeUserProfile, subscribeUsers, transferMoney } from './services/bankService'
import { INITIAL_BALANCE, loginUser, logoutUser, registerUser, subscribeAuth } from './services/firebaseAuth'
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
  const [authUser, setAuthUser] = useState(null)
  const [screen, setScreen] = useState(screens.login)
  const [account, setAccount] = useState(null)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [transactions, setTransactions] = useState([])
  const [lastTransfer, setLastTransfer] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [dataLoading, setDataLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState('')
  const [dataError, setDataError] = useState('')

  const orderedTransactions = useMemo(() => sortByNewest(transactions), [transactions])

  function handleDataError(error) {
    setDataError(error.message || 'No se pudieron sincronizar los datos.')
    setDataLoading(false)
  }

  useEffect(() => {
    return subscribeAuth((firebaseUser) => {
      setAuthUser(firebaseUser)
      setAuthLoading(false)

      if (firebaseUser) {
        setDataLoading(true)
        setDataError('')
        setScreen(screens.dashboard)
        return
      }

      setUser(null)
      setAccount(null)
      setUsers([])
      setTransactions([])
      setLastTransfer(null)
    })
  }, [])

  useEffect(() => {
    if (!authUser) return undefined

    const unsubscribeProfile = subscribeUserProfile(authUser.uid, (profile) => {
      setUser(profile)
      setAccount(profile ? toAccount(profile) : null)
      setDataLoading(false)

      if (!profile) {
        setDataError('No existe el documento del usuario en Firestore.')
      }
    }, handleDataError)

    const unsubscribeUsers = subscribeUsers(setUsers, handleDataError)
    const unsubscribeMovements = subscribeMovements(authUser.uid, setTransactions, handleDataError)

    return () => {
      unsubscribeProfile()
      unsubscribeUsers()
      unsubscribeMovements()
    }
  }, [authUser])

  async function handleLogin(form) {
    setIsSubmitting(true)
    setAuthError('')

    try {
      await loginUser(form)
    } catch (error) {
      setAuthError(getAuthErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleRegister(form) {
    setIsSubmitting(true)
    setAuthError('')

    try {
      if (!form.name.trim()) throw new Error('Ingresa tu nombre.')
      await registerUser(form)
    } catch (error) {
      setAuthError(getAuthErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleLogout() {
    await logoutUser()
    setScreen(screens.login)
  }

  async function handleConfirmTransfer(transfer) {
    if (!user) throw new Error('La sesion no esta lista.')

    const movement = await transferMoney({
      amount: transfer.amount,
      description: transfer.description,
      recipient: transfer.recipient,
      sender: user,
    })

    setLastTransfer(movement)
    setScreen(screens.success)
  }

  if (authLoading) {
    return <FullScreenState message="Validando sesion..." />
  }

  if (!authUser) {
    if (screen === screens.register) {
      return (
        <RegisterView
          error={authError}
          initialBalance={INITIAL_BALANCE}
          isSubmitting={isSubmitting}
          onBackToLogin={() => {
            setAuthError('')
            setScreen(screens.login)
          }}
          onRegister={handleRegister}
        />
      )
    }

    return <LoginView error={authError} isSubmitting={isSubmitting} onLogin={handleLogin} onRegister={() => setScreen(screens.register)} />
  }

  if (dataLoading || !user || !account) {
    return <FullScreenState message={dataError || 'Sincronizando datos bancarios...'} />
  }

  return (
    <AppShell activeScreen={screen} onLogout={handleLogout} onNavigate={setScreen} title={titles[screen] || 'Netolink'} user={user}>
      {dataError && <div className="mb-5 rounded-2xl bg-blush px-4 py-3 text-sm font-bold text-brand-dark">{dataError}</div>}

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

function toAccount(profile) {
  return {
    id: `acc_${profile.id}`,
    ownerId: profile.id,
    name: 'Cuenta Principal',
    number: '**** 4209',
    balance: profile.balance,
    currency: 'CLP',
  }
}

function getAuthErrorMessage(error) {
  if (error.code === 'auth/invalid-credential') return 'Email o password incorrectos.'
  if (error.code === 'auth/email-already-in-use') return 'Ese email ya esta registrado.'
  if (error.code === 'auth/weak-password') return 'La password debe tener al menos 6 caracteres.'
  if (error.code === 'auth/invalid-email') return 'Ingresa un email valido.'

  return error.message || 'No se pudo completar la operacion.'
}

function FullScreenState({ message }) {
  return (
    <main className="grid min-h-screen place-items-center bg-brand px-4 text-center text-white">
      <div className="rounded-3xl bg-white/10 p-8 shadow-card backdrop-blur">
        <p className="text-lg font-black">{message}</p>
      </div>
    </main>
  )
}
