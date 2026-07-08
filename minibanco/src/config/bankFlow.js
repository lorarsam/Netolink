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
  form: {
    amountLabel: 'Monto',
    amountPlaceholder: '0',
    balanceLabel: 'Saldo disponible',
    descriptionLabel: 'Descripcion (opcional)',
    descriptionPlaceholder: 'Motivo de la transferencia',
    errorMessage: 'Revisa las validaciones antes de confirmar la transferencia.',
    emptyRecipientsLabel: 'No se encontraron usuarios',
    noRecipientEmail: 'Ingresa un correo registrado',
    noRecipientName: 'Sin destinatario seleccionado',
    pendingLabel: 'Pendiente',
    recipientLabel: 'Destinatario',
    recipientPlaceholder: 'Buscar nombre o email',
    recipientSearchLabel: 'Seleccionar destinatario',
    selectedLabel: 'Activo',
    submitLabel: 'Transferir dinero',
  },
  header: {
    cancelLabel: 'Cancelar',
    subtitle: 'Envia dinero de forma segura a usuarios registrados.',
    title: 'Transferencias',
  },
  modal: {
    cancelLabel: 'Cancelar',
    confirmLabel: 'Confirmar',
    subtitle: 'Revisa los detalles antes de confirmar.',
    title: 'Confirmar transferencia',
  },
  recentRecipients: {
    actionLabel: 'Ver todo',
    title: 'Destinatarios recientes',
  },
  summary: {
    amountLabel: 'Monto',
    defaultRecipient: 'Selecciona destinatario',
    feeLabel: 'Comision',
    remainingBalanceLabel: 'Saldo restante',
    sender: 'Cuenta principal',
    senderLabel: 'Origen',
    recipientLabel: 'Destinatario',
    title: 'Resumen de transferencia',
    totalLabel: 'Total',
  },
}
