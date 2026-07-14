import { render, screen } from '@testing-library/react'
import { historyContent, transactionContent } from '../config/bankFlow'
import { HistoryView } from '../views/HistoryView'
import { formatCurrency } from '../utils/formatters'
import { transactions } from './fixtures'

describe('HistoryView', () => {
  it('ordena los movimientos desde el mas reciente al mas antiguo', () => {
    // Arrange
    const orderedTransactions = [...transactions].sort((current, next) => new Date(next.date) - new Date(current.date))
    render(<HistoryView onDashboard={jest.fn()} transactions={transactions} />)

    // Act
    const renderedCounterparties = orderedTransactions.map((transaction) => screen.getByText(transaction.counterparty))

    // Assert
    expect(renderedCounterparties[0].compareDocumentPosition(renderedCounterparties[1]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(renderedCounterparties[1].compareDocumentPosition(renderedCounterparties[2]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('distingue visualmente movimientos recibidos y enviados', () => {
    // Arrange
    const incoming = transactions.find((transaction) => transaction.type === transactionContent.typeValues.incoming)
    const outgoing = transactions.find((transaction) => transaction.type === transactionContent.typeValues.outgoing)
    render(<HistoryView onDashboard={jest.fn()} transactions={[incoming, outgoing]} />)

    // Act
    const incomingAmount = `${transactionContent.typePresentation[incoming.type].sign}${formatCurrency(incoming.amount)}`
    const outgoingAmount = `${transactionContent.typePresentation[outgoing.type].sign}${formatCurrency(outgoing.amount)}`

    // Assert
    expect(screen.getByText(transactionContent.typeLabels[incoming.type])).toBeInTheDocument()
    expect(screen.getByText(transactionContent.typeLabels[outgoing.type])).toBeInTheDocument()
    expect(screen.getByText(incomingAmount)).toBeInTheDocument()
    expect(screen.getByText(outgoingAmount)).toBeInTheDocument()
  })

  it('muestra el estado vacio cuando no existen movimientos', () => {
    // Arrange
    render(<HistoryView onDashboard={jest.fn()} transactions={[]} />)

    // Act
    const emptyState = screen.getByText(historyContent.emptyMessage)

    // Assert
    expect(emptyState).toBeInTheDocument()
  })
})
