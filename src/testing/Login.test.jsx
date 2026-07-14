import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { authErrorMessages, loginContent } from '../config/auth'
import { loginUser, subscribeAuth } from '../services/firebaseAuth'
import { validationMessages } from '../utils/validations'
import { loginCredentials, serviceErrors } from './fixtures'

jest.mock('../services/firebaseAuth', () => ({
  INITIAL_BALANCE: 0,
  loginUser: jest.fn(),
  logoutUser: jest.fn(),
  registerUser: jest.fn(),
  subscribeAuth: jest.fn(),
}))

jest.mock('../services/bankService', () => ({
  createAccountMovement: jest.fn(),
  subscribeMovements: jest.fn(),
  subscribeUserProfile: jest.fn(),
  subscribeUsers: jest.fn(),
  transferMoney: jest.fn(),
}))

async function renderLogin() {
  const user = userEvent.setup()
  render(<App />)
  await screen.findByRole('button', { name: loginContent.submitLabel })

  return user
}

async function completeLogin(user) {
  await user.type(screen.getByLabelText(loginContent.fields[0].label), loginCredentials.email)
  await user.type(screen.getByLabelText(loginContent.fields[1].label), loginCredentials.password)
}

describe('login', () => {
  beforeEach(() => {
    loginUser.mockReset()
    loginUser.mockResolvedValue(undefined)
    subscribeAuth.mockReset()
    subscribeAuth.mockImplementation((onChange) => {
      onChange(null)
      return jest.fn()
    })
  })

  it('no llama al servicio cuando los campos estan vacios', async () => {
    // Arrange
    const user = await renderLogin()

    // Act
    await user.click(screen.getByRole('button', { name: loginContent.submitLabel }))

    // Assert
    expect(loginUser).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent(validationMessages.login.requiredFields)
  })

  it('llama al servicio una vez con las credenciales ingresadas', async () => {
    // Arrange
    const user = await renderLogin()
    await completeLogin(user)

    // Act
    await user.click(screen.getByRole('button', { name: loginContent.submitLabel }))

    // Assert
    await waitFor(() => expect(loginUser).toHaveBeenCalledTimes(1))
    expect(loginUser).toHaveBeenCalledWith(loginCredentials)
  })

  it('muestra un mensaje cuando el servicio rechaza las credenciales', async () => {
    // Arrange
    const authError = Object.assign(new Error(authErrorMessages.default), { code: serviceErrors.authCode })
    loginUser.mockRejectedValue(authError)
    const user = await renderLogin()
    await completeLogin(user)

    // Act
    await user.click(screen.getByRole('button', { name: loginContent.submitLabel }))

    // Assert
    expect(await screen.findByRole('alert')).toHaveTextContent(authErrorMessages.invalidCredential)
    expect(loginUser).toHaveBeenCalledTimes(1)
  })
})
