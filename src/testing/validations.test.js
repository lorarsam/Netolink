import { currentUser, recipient, validTransfer } from './fixtures'
import { isValidEmail, validateLogin, validateTransfer, validationMessages } from '../utils/validations'

const validInput = {
  amount: validTransfer.amount,
  balance: currentUser.balance,
  recipient,
  recipientEmail: recipient.email,
  senderId: currentUser.id,
}

describe('validateTransfer', () => {
  test.each([
    ['un monto negativo', -1, validationMessages.transfer.amountPositive],
    ['un monto igual a cero', 0, validationMessages.transfer.amountPositive],
    ['un monto no numerico', 'not-a-number', validationMessages.transfer.amountNumber],
    ['un monto decimal', 100.5, validationMessages.transfer.amountInteger],
  ])('rechaza %s', (_caseName, amount, expectedMessage) => {
    // Arrange
    const input = { ...validInput, amount }

    // Act
    const result = validateTransfer(input)

    // Assert
    expect(result).toBe(expectedMessage)
  })

  it('rechaza un monto mayor al saldo disponible', () => {
    // Arrange
    const input = { ...validInput, amount: currentUser.balance + 1 }

    // Act
    const result = validateTransfer(input)

    // Assert
    expect(result).toBe(validationMessages.transfer.insufficientBalance)
  })

  it('rechaza una transferencia a la cuenta de origen', () => {
    // Arrange
    const input = {
      ...validInput,
      recipient: currentUser,
      recipientEmail: currentUser.email,
    }

    // Act
    const result = validateTransfer(input)

    // Assert
    expect(result).toBe(validationMessages.transfer.selfTransfer)
  })

  it('rechaza un destinatario vacio', () => {
    // Arrange
    const input = { ...validInput, recipient: null, recipientEmail: '' }

    // Act
    const result = validateTransfer(input)

    // Assert
    expect(result).toBe(validationMessages.transfer.recipientRequired)
  })

  it('rechaza un email de destinatario con formato invalido', () => {
    // Arrange
    const input = { ...validInput, recipient: null, recipientEmail: 'invalid-email' }

    // Act
    const result = validateTransfer(input)

    // Assert
    expect(result).toBe(validationMessages.transfer.invalidRecipientEmail)
  })

  it('rechaza un destinatario que no esta registrado', () => {
    // Arrange
    const input = { ...validInput, recipient: null }

    // Act
    const result = validateTransfer(input)

    // Assert
    expect(result).toBe(validationMessages.transfer.recipientNotFound)
  })

  it('acepta un monto valido con saldo suficiente', () => {
    // Arrange
    const input = { ...validInput }

    // Act
    const result = validateTransfer(input)

    // Assert
    expect(result).toBe('')
  })
})

describe('validaciones de autenticacion', () => {
  it('identifica emails validos e invalidos', () => {
    // Arrange
    const validEmail = recipient.email
    const invalidEmail = 'invalid-email'

    // Act
    const validResult = isValidEmail(validEmail)
    const invalidResult = isValidEmail(invalidEmail)

    // Assert
    expect(validResult).toBe(true)
    expect(invalidResult).toBe(false)
  })

  it('rechaza un login con campos vacios', () => {
    // Arrange
    const form = { email: '', password: '' }

    // Act
    const result = validateLogin(form)

    // Assert
    expect(result).toBe(validationMessages.login.requiredFields)
  })

  it('acepta un login con ambos campos informados', () => {
    // Arrange
    const form = { email: recipient.email, password: 'valid-password' }

    // Act
    const result = validateLogin(form)

    // Assert
    expect(result).toBe('')
  })
})
