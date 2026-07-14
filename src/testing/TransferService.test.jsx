import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { navItems, screens, transferContent } from '../config/bankFlow'
import { subscribeAuth } from '../services/firebaseAuth'
import { subscribeMovements, subscribeUserProfile, subscribeUsers, transferMoney } from '../services/bankService'
import { currentUser, recipient, transferResult, users, validTransfer } from './fixtures'

jest.mock('../services/firebaseAuth', () => ({
  INITIAL_BALANCE: undefined,
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

const transferNavItem = navItems.find((item) => item.id === screens.transfer)

function mockSubscription(mock, value) {
  mock.mockImplementation((...args) => {
    const onData = args.find((argument) => typeof argument === 'function')
    onData(value)
    return jest.fn()
  })
}

describe('servicio de transferencia', () => {
  beforeEach(() => {
    subscribeAuth.mockImplementation((onChange) => {
      onChange({ uid: currentUser.id })
      return jest.fn()
    })
    mockSubscription(subscribeUserProfile, currentUser)
    mockSubscription(subscribeUsers, users)
    mockSubscription(subscribeMovements, [])
    transferMoney.mockResolvedValue(transferResult)
  })

  it('llama al servicio mockeado una vez con los datos confirmados', async () => {
    // Arrange
    const user = userEvent.setup()
    render(<App />)
    await user.click(await screen.findByRole('button', { name: transferNavItem.label }))
    await user.type(screen.getByLabelText(transferContent.form.recipientSearchLabel), recipient.email)
    await user.type(screen.getByLabelText(transferContent.form.amountLabel), String(validTransfer.amount))
    await user.type(screen.getByLabelText(transferContent.form.descriptionLabel), validTransfer.description)
    await user.click(screen.getByRole('button', { name: transferContent.form.submitLabel }))

    // Act
    await user.click(screen.getByRole('button', { name: transferContent.modal.confirmLabel }))

    // Assert
    await waitFor(() => expect(transferMoney).toHaveBeenCalledTimes(1))
    expect(transferMoney).toHaveBeenCalledWith({
      amount: validTransfer.amount,
      description: validTransfer.description,
      recipient,
      sender: currentUser,
    })
  })
})
