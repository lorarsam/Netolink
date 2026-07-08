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
    iconSrc: '/icono.svg',
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
    depositLabel: 'Depositar',
    label: 'Saldo total',
    withdrawLabel: 'Retirar',
  },
  operations: {
    deposit: {
      amountLabel: 'Cantidad a depositar',
      amountPlaceholder: '0',
      cardLabel: 'Agregar tarjeta',
      cardPlaceholder: '16 digitos de la tarjeta',
      confirmLabel: 'Confirmar deposito',
      description: 'Ingresa el monto y una tarjeta simulada para abonar saldo a tu cuenta.',
      submittingLabel: 'Depositando...',
      title: 'Depositar dinero',
    },
    errors: {
      amount: 'Ingresa una cantidad mayor a cero.',
      card: 'La tarjeta debe tener exactamente 16 digitos.',
      insufficientBalance: 'No tienes saldo suficiente para retirar esa cantidad.',
      noBalance: 'No tienes saldo disponible para retirar.',
    },
    form: {
      amountPrefix: '$',
      cancelLabel: 'Cancelar',
      cardHelper: 'Los datos de la tarjeta son solo una simulacion.',
    },
    withdraw: {
      amountLabel: 'Cantidad a retirar',
      amountPlaceholder: '0',
      cardLabel: 'Agregar tarjeta',
      cardPlaceholder: '16 digitos de la tarjeta',
      confirmLabel: 'Confirmar retiro',
      description: 'Ingresa el monto y una tarjeta simulada para retirar saldo de tu cuenta.',
      submittingLabel: 'Retirando...',
      title: 'Retirar dinero',
    },
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

export const transactionContent = {
  defaults: {
    transferDescription: 'Transferencia Netolink',
    transferStatus: 'Completado',
    transferType: 'egreso',
  },
  emptyMessage: 'No hay movimientos para mostrar.',
  typeLabels: {
    deposito: 'Deposito',
    egreso: 'Egreso',
    ingreso: 'Ingreso',
    retiro: 'Retiro',
  },
  typePresentation: {
    deposito: {
      amountClassName: 'text-teal',
      icon: 'arrowUp',
      iconClassName: 'bg-mint text-teal',
      sign: '+',
      status: 'success',
    },
    egreso: {
      amountClassName: 'text-brand-dark',
      icon: 'arrowDown',
      iconClassName: 'bg-blush text-brand-dark',
      sign: '-',
      status: 'danger',
    },
    ingreso: {
      amountClassName: 'text-teal',
      icon: 'arrowUp',
      iconClassName: 'bg-mint text-teal',
      sign: '+',
      status: 'success',
    },
    retiro: {
      amountClassName: 'text-brand-dark',
      icon: 'arrowDown',
      iconClassName: 'bg-blush text-brand-dark',
      sign: '-',
      status: 'danger',
    },
  },
  typeValues: {
    deposit: 'deposito',
    incoming: 'ingreso',
    outgoing: 'egreso',
    withdraw: 'retiro',
  },
}

export const historyContent = {
  backLabel: 'Volver al Dashboard',
  emptyMessage: 'No hay movimientos para los filtros seleccionados.',
  filterToggleLabel: 'Filtros',
  filters: [
    {
      defaultValue: 'all',
      id: 'type',
      label: 'Tipo',
      options: [
        { label: 'Todos', value: 'all' },
        { label: 'Depositos', value: 'deposito' },
        { label: 'Ingresos', value: 'ingreso' },
        { label: 'Egresos', value: 'egreso' },
        { label: 'Retiros', value: 'retiro' },
      ],
    },
    {
      defaultValue: 'newest',
      id: 'dateOrder',
      label: 'Fecha',
      options: [
        { label: 'Recientes', value: 'newest' },
        { label: 'Antiguas', value: 'oldest' },
      ],
    },
    {
      defaultValue: 'date',
      id: 'sortBy',
      label: 'Orden',
      options: [
        { label: 'Por fecha', value: 'date' },
        { label: 'Mayor monto', value: 'highestAmount' },
        { label: 'Menor monto', value: 'lowestAmount' },
      ],
    },
  ],
  filterValues: {
    allTypes: 'all',
    highestAmount: 'highestAmount',
    lowestAmount: 'lowestAmount',
    oldestDate: 'oldest',
  },
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
    nextLabel: 'Siguiente',
    pageSize: 10,
    pageStatusLabel: ({ currentPage, pageCount }) => `Pagina ${currentPage} de ${pageCount}`,
    previousLabel: 'Anterior',
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

export const transferSuccessContent = {
  actions: {
    dashboardLabel: 'Dashboard',
    historyLabel: 'Ver historial',
    transferAgainLabel: 'Otra transferencia',
  },
  description: (recipientName) => `El monto fue enviado correctamente a ${recipientName}. La transaccion quedo registrada en tu historial.`,
  details: {
    amountLabel: 'Monto',
    dateLabel: 'Fecha',
    idLabel: 'ID de transaccion',
    recipientLabel: 'Destinatario',
    title: 'Detalles de la transaccion',
    typeLabel: 'Tipo',
    typeLabels: {
      egreso: 'Egreso',
      ingreso: 'Ingreso',
    },
  },
  title: 'Transferencia exitosa',
}
