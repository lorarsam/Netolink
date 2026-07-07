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

export const dashboardContent = {
  activity: {
    actionLabel: 'Ver todo',
    description: 'Historial sincronizado automaticamente.',
    title: 'Actividad reciente',
  },
  balance: {
    historyLabel: 'Historial',
    label: 'Saldo total',
    transferLabel: 'Transferir',
  },
  metrics: [
    {
      changeKind: 'incomingShare',
      changeSuffix: '% del flujo',
      changeTone: 'success',
      description: 'Total recibido en movimientos registrados',
      icon: 'arrowUp',
      id: 'incoming',
      label: 'Ingresos',
      tone: 'teal',
      valueKind: 'currency',
    },
    {
      changeKind: 'outgoingShare',
      changeSuffix: '% del flujo',
      changeTone: 'danger',
      description: 'Total enviado o pagado desde la cuenta',
      icon: 'arrowDown',
      id: 'outgoing',
      label: 'Egresos',
      tone: 'brand',
      valueKind: 'currency',
    },
    {
      changeKind: 'netFlow',
      description: 'Balance entre ingresos y egresos',
      icon: 'receipt',
      id: 'movementCount',
      label: 'Flujo neto',
      tone: 'ink',
      valueKind: 'count',
    },
  ],
}

export const historyContent = {
  backLabel: 'Volver al Dashboard',
  filters: ['Tipo: todos', 'Fecha: recientes', 'Orden: descendente'],
  stats: {
    incoming: 'Ingresos',
    outgoing: 'Egresos',
    total: 'Total',
  },
  subtitle: 'Movimientos en tiempo real, ordenados del mas reciente al mas antiguo.',
  title: 'Historial de movimientos',
}

export const transferContent = {
  recentRecipients: {
    actionLabel: 'Ver todo',
    title: 'Destinatarios recientes',
  },
}

export const transferRules = [
  { id: 'recipient', label: 'Destinatario existe' },
  { id: 'amount', label: 'Monto mayor a 0' },
  { id: 'balance', label: 'Saldo suficiente' },
  { id: 'self', label: 'No transferirse a si mismo' },
]
