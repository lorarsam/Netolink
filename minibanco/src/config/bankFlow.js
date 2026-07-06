export const screens = {
  login: 'login',
  register: 'register',
  dashboard: 'dashboard',
  transfer: 'transfer',
  success: 'success',
  history: 'history',
}

export const navItems = [
  { id: screens.dashboard, label: 'Dashboard' },
  { id: screens.transfer, label: 'Transferir' },
  { id: screens.history, label: 'Historial' },
]

export const flowSteps = [
  'Firebase Auth listo',
  'Documento Firestore sincronizado',
  'Saldo en tiempo real activo',
  'Historial en tiempo real activo',
]

export const transferRules = [
  { id: 'recipient', label: 'Destinatario existe' },
  { id: 'amount', label: 'Monto mayor a 0' },
  { id: 'balance', label: 'Saldo suficiente' },
  { id: 'self', label: 'No transferirse a si mismo' },
]
