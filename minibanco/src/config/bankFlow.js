export const screens = {
  login: 'login',
  register: 'register',
  dashboard: 'dashboard',
  transfer: 'transfer',
  success: 'success',
  history: 'history',
}

export const navItems = [
  { id: screens.dashboard, label: 'Dashboard', icon: 'grid' },
  { id: screens.transfer, label: 'Transacciones', icon: 'send' },
  { id: screens.history, label: 'Historial', icon: 'receipt' },
]

export const appSidebar = {
  brand: {
    ariaLabel: 'Netolink Digital Banking',
    name: 'Netolink',
  },
  items: navItems,
  logoutItem: {
    icon: 'logout',
    label: 'Cerrar sesion',
  },
}

export const appNavbar = {
  actions: [
    { id: 'notifications', ariaLabel: 'Notificaciones', icon: 'bell' },
    { id: 'help', ariaLabel: 'Ayuda', icon: 'help' },
  ],
  searchPlaceholder: 'Buscar...',
}

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
