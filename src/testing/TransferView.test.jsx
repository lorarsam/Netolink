import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { transferContent } from '../config/bankFlow'
import { TransferView } from '../views/TransferView'
import { validationMessages } from '../utils/validations'
import { account, currentUser, recipient, serviceErrors, users, validTransfer } from './fixtures'

function renderTransferView(onConfirm = jest.fn()) {
  render(
    <TransferView
      account={account}
      currentUser={currentUser}
      onCancel={jest.fn()}
      onConfirm={onConfirm}
      users={users}
    />,
  )

  return { onConfirm, user: userEvent.setup() }
}

async function completeValidForm(user) {
  await user.type(screen.getByLabelText(transferContent.form.recipientSearchLabel), recipient.email)
  await user.type(screen.getByLabelText(transferContent.form.amountLabel), String(validTransfer.amount))
  await user.type(screen.getByLabelText(transferContent.form.descriptionLabel), validTransfer.description)
}

async function openConfirmation(user) {
  await completeValidForm(user)
  await user.click(screen.getByRole('button', { name: transferContent.form.submitLabel }))
}

describe('TransferView', () => {
  it('renderiza los campos y el boton de transferencia', () => {
    // Arrange
    renderTransferView()

    // Act
    const recipientField = screen.getByLabelText(transferContent.form.recipientSearchLabel)
    const amountField = screen.getByLabelText(transferContent.form.amountLabel)
    const descriptionField = screen.getByLabelText(transferContent.form.descriptionLabel)
    const submitButton = screen.getByRole('button', { name: transferContent.form.submitLabel })

    // Assert
    expect(recipientField).toBeInTheDocument()
    expect(amountField).toBeInTheDocument()
    expect(descriptionField).toBeInTheDocument()
    expect(submitButton).toBeEnabled()
  })

  it('muestra el error de monto invalido y no confirma la transferencia', async () => {
    // Arrange
    const { onConfirm, user } = renderTransferView()
    await user.type(screen.getByLabelText(transferContent.form.recipientSearchLabel), recipient.email)
    await user.type(screen.getByLabelText(transferContent.form.amountLabel), String(0))

    // Act
    await user.click(screen.getByRole('button', { name: transferContent.form.submitLabel }))

    // Assert
    expect(screen.getByRole('alert')).toHaveTextContent(validationMessages.transfer.amountPositive)
    expect(onConfirm).not.toHaveBeenCalled()
  })

  it('confirma una transferencia valida una vez y con los argumentos correctos', async () => {
    // Arrange
    const onConfirm = jest.fn().mockResolvedValue(undefined)
    const { user } = renderTransferView(onConfirm)
    await openConfirmation(user)

    // Act
    await user.click(screen.getByRole('button', { name: transferContent.modal.confirmLabel }))

    // Assert
    await waitFor(() => expect(onConfirm).toHaveBeenCalledTimes(1))
    expect(onConfirm).toHaveBeenCalledWith(validTransfer)
  })

  it('deshabilita las acciones mientras la transferencia esta en curso', async () => {
    // Arrange
    let resolveTransfer
    const pendingTransfer = new Promise((resolve) => {
      resolveTransfer = resolve
    })
    const onConfirm = jest.fn(() => pendingTransfer)
    const { user } = renderTransferView(onConfirm)
    await openConfirmation(user)

    // Act
    await user.click(screen.getByRole('button', { name: transferContent.modal.confirmLabel }))

    // Assert
    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByRole('button', { name: transferContent.modal.submittingLabel })).toBeDisabled()
    expect(within(dialog).getByRole('button', { name: transferContent.modal.cancelLabel })).toBeDisabled()

    await act(async () => resolveTransfer())
  })

  it('muestra el error entregado por el servicio cuando la transferencia falla', async () => {
    // Arrange
    const onConfirm = jest.fn().mockRejectedValue(new Error(serviceErrors.transfer))
    const { user } = renderTransferView(onConfirm)
    await openConfirmation(user)

    // Act
    await user.click(screen.getByRole('button', { name: transferContent.modal.confirmLabel }))

    // Assert
    expect(await screen.findByRole('alert')).toHaveTextContent(serviceErrors.transfer)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
