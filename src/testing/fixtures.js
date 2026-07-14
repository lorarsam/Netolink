import { transactionContent } from '../config/bankFlow'

export const currentUser = Object.freeze({
  balance: 100000,
  email: 'origin@example.com',
  id: 'user-origin',
  name: 'Origin User',
})

export const account = Object.freeze({
  balance: currentUser.balance,
  currency: 'CLP',
  id: 'account-origin',
  name: 'Cuenta Principal',
  number: '**** 4209',
  ownerId: currentUser.id,
})

export const recipient = Object.freeze({
  balance: 50000,
  email: 'recipient@example.com',
  id: 'user-recipient',
  name: 'Recipient User',
})

export const users = Object.freeze([currentUser, recipient])

export const validTransfer = Object.freeze({
  amount: 25000,
  description: 'Pago de servicios',
  recipient,
})

export const loginCredentials = Object.freeze({
  email: 'user@example.com',
  password: 'secure-password',
})

export const transactions = Object.freeze([
  {
    amount: 12000,
    counterparty: 'Old Incoming User',
    date: '2026-01-10T10:00:00.000Z',
    description: 'Transferencia recibida',
    id: 'movement-old',
    status: 'Completado',
    type: 'ingreso',
  },
  {
    amount: 4500,
    counterparty: 'Newest Outgoing User',
    date: '2026-03-10T10:00:00.000Z',
    description: 'Transferencia enviada',
    id: 'movement-newest',
    status: 'Completado',
    type: 'egreso',
  },
  {
    amount: 8000,
    counterparty: 'Middle Incoming User',
    date: '2026-02-10T10:00:00.000Z',
    description: 'Segunda transferencia recibida',
    id: 'movement-middle',
    status: 'Completado',
    type: 'ingreso',
  },
])

export const transferResult = Object.freeze({
  ...validTransfer,
  date: transactions[0].date,
  id: 'transfer-result',
  status: transactionContent.defaults.transferStatus,
  type: transactionContent.defaults.transferType,
})

export const serviceErrors = Object.freeze({
  authCode: 'auth/invalid-credential',
  transfer: 'El servicio de transferencias no esta disponible.',
})
