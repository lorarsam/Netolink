import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { validateTransfer } from '../utils/validations'

const completedStatus = 'Completado'

export function subscribeUserProfile(uid, onData, onError) {
  return onSnapshot(doc(db, 'users', uid), (snapshot) => {
    onData(snapshot.exists() ? mapUser(snapshot.id, snapshot.data()) : null)
  }, onError)
}

export function subscribeUsers(onData, onError) {
  const usersQuery = query(collection(db, 'users'), orderBy('nombre'))

  return onSnapshot(usersQuery, (snapshot) => {
    onData(snapshot.docs.map((item) => mapUser(item.id, item.data())))
  }, onError)
}

export function subscribeMovements(uid, onData, onError) {
  const movementsQuery = query(collection(db, 'users', uid, 'movimientos'), orderBy('fecha', 'desc'))

  return onSnapshot(movementsQuery, (snapshot) => {
    onData(snapshot.docs.map((item) => mapMovement(item.id, item.data())))
  }, onError)
}

export async function transferMoney({ amount, description, recipient, sender }) {
  const validationError = validateTransfer({
    amount,
    balance: sender.balance,
    recipient,
    recipientEmail: recipient?.email || '',
    senderId: sender.id,
  })

  if (validationError) throw new Error(validationError)

  const transferRef = doc(collection(db, 'transfers'))
  const senderRef = doc(db, 'users', sender.id)
  const recipientRef = doc(db, 'users', recipient.id)
  const senderMovementRef = doc(collection(db, 'users', sender.id, 'movimientos'))
  const recipientMovementRef = doc(collection(db, 'users', recipient.id, 'movimientos'))
  const cleanDescription = description.trim() || 'Transferencia Netolink'
  const transferDate = new Date()

  await runTransaction(db, async (transaction) => {
    const senderSnapshot = await transaction.get(senderRef)
    const recipientSnapshot = await transaction.get(recipientRef)

    if (!senderSnapshot.exists()) throw new Error('No se encontro la cuenta de origen.')
    if (!recipientSnapshot.exists()) throw new Error('El destinatario ya no existe.')

    const senderData = senderSnapshot.data()
    const recipientData = recipientSnapshot.data()

    if (recipientSnapshot.id === senderSnapshot.id) throw new Error('No puedes transferirte a ti mismo.')
    if (senderData.saldo < amount) throw new Error('Saldo insuficiente para completar la transferencia.')

    transaction.update(senderRef, {
      saldo: senderData.saldo - amount,
      lastTransferId: transferRef.id,
      updatedAt: serverTimestamp(),
    })
    transaction.update(recipientRef, {
      saldo: recipientData.saldo + amount,
      lastTransferId: transferRef.id,
      updatedAt: serverTimestamp(),
    })

    transaction.set(transferRef, {
      emisorUid: senderSnapshot.id,
      emisorNombre: senderData.nombre,
      emisorEmail: senderData.email,
      receptorUid: recipientSnapshot.id,
      receptorNombre: recipientData.nombre,
      receptorEmail: recipientData.email,
      monto: amount,
      descripcion: cleanDescription,
      fecha: serverTimestamp(),
      status: completedStatus,
    })

    transaction.set(senderMovementRef, {
      tipo: 'egreso',
      contraparteUid: recipientSnapshot.id,
      contraparteNombre: recipientData.nombre,
      contraparteEmail: recipientData.email,
      monto: amount,
      descripcion: cleanDescription,
      fecha: serverTimestamp(),
      status: completedStatus,
      transferenciaId: transferRef.id,
    })

    transaction.set(recipientMovementRef, {
      tipo: 'ingreso',
      contraparteUid: senderSnapshot.id,
      contraparteNombre: senderData.nombre,
      contraparteEmail: senderData.email,
      monto: amount,
      descripcion: cleanDescription,
      fecha: serverTimestamp(),
      status: completedStatus,
      transferenciaId: transferRef.id,
    })
  })

  return {
    id: transferRef.id,
    type: 'egreso',
    counterparty: recipient.name,
    description: cleanDescription,
    amount,
    date: transferDate.toISOString(),
    status: completedStatus,
    recipient,
  }
}

export async function createAccountMovement({ amount, cardNumber, mode, user }) {
  const userRef = doc(db, 'users', user.id)
  const movementRef = doc(collection(db, 'users', user.id, 'movimientos'))
  const operationDate = new Date()
  const isDeposit = mode === 'deposit'
  const movementType = isDeposit ? 'deposito' : 'retiro'
  const operationLabel = isDeposit ? 'Deposito' : 'Retiro'
  const maskedCard = `**** **** **** ${cardNumber.slice(-4)}`

  await runTransaction(db, async (transaction) => {
    const userSnapshot = await transaction.get(userRef)

    if (!userSnapshot.exists()) throw new Error('No se encontro la cuenta.')

    const userData = userSnapshot.data()
    const currentBalance = userData.saldo || 0

    if (!isDeposit && currentBalance <= 0) throw new Error('No tienes saldo disponible para retirar.')
    if (!isDeposit && amount > currentBalance) throw new Error('No tienes saldo suficiente para retirar esa cantidad.')

    transaction.update(userRef, {
      saldo: isDeposit ? currentBalance + amount : currentBalance - amount,
      updatedAt: serverTimestamp(),
    })

    transaction.set(movementRef, {
      tipo: movementType,
      contraparteNombre: operationLabel,
      contraparteEmail: maskedCard,
      monto: amount,
      descripcion: `${operationLabel} con tarjeta ${maskedCard}`,
      fecha: serverTimestamp(),
      status: completedStatus,
    })
  })

  return {
    id: movementRef.id,
    type: movementType,
    counterparty: operationLabel,
    description: `${operationLabel} con tarjeta ${maskedCard}`,
    amount,
    date: operationDate.toISOString(),
    status: completedStatus,
  }
}

function mapUser(id, data) {
  return {
    id,
    name: data.nombre,
    email: data.email,
    balance: data.saldo,
  }
}

function mapMovement(id, data) {
  return {
    id,
    type: data.tipo,
    counterparty: data.contraparteNombre || data.contraparteEmail,
    description: data.descripcion,
    amount: data.monto,
    date: data.fecha?.toDate ? data.fecha.toDate().toISOString() : new Date().toISOString(),
    status: data.status,
  }
}
