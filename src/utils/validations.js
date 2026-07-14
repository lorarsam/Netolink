export const validationMessages = Object.freeze({
  login: {
    requiredFields: 'Ingresa tu email y password.',
  },
  transfer: {
    amountInteger: 'El monto debe ser un numero entero.',
    amountNumber: 'Ingresa un monto numerico valido.',
    amountPositive: 'El monto debe ser mayor a cero.',
    insufficientBalance: 'Saldo insuficiente para completar la transferencia.',
    invalidRecipientEmail: 'Ingresa un email de destinatario valido.',
    recipientNotFound: 'El destinatario no esta registrado.',
    recipientRequired: 'Selecciona un destinatario.',
    selfTransfer: 'No puedes transferirte a ti mismo.',
  },
})

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value) {
  return emailPattern.test(value.trim())
}

export function validateLogin({ email, password }) {
  if (!email.trim() || !password) return validationMessages.login.requiredFields

  return ''
}

export function validateTransfer({ amount, balance, recipient, recipientEmail, senderId }) {
  const normalizedRecipientEmail = recipientEmail.trim()
  const numericAmount = typeof amount === 'number' ? amount : Number(amount)

  if (!normalizedRecipientEmail) return validationMessages.transfer.recipientRequired
  if (!recipient && !isValidEmail(normalizedRecipientEmail)) return validationMessages.transfer.invalidRecipientEmail
  if (!recipient) return validationMessages.transfer.recipientNotFound
  if (recipient.id === senderId) return validationMessages.transfer.selfTransfer
  if (!Number.isFinite(numericAmount)) return validationMessages.transfer.amountNumber
  if (numericAmount <= 0) return validationMessages.transfer.amountPositive
  if (!Number.isInteger(numericAmount)) return validationMessages.transfer.amountInteger
  if (numericAmount > balance) return validationMessages.transfer.insufficientBalance

  return ''
}
