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
      updatedAt: serverTimestamp(),
    })
    transaction.update(recipientRef, {
      saldo: recipientData.saldo + amount,
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
