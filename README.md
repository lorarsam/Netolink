# Netolink - Mini Banco Digital

Netolink es una SPA de banca digital construida con React, Vite y Firebase. Permite registrar usuarios, iniciar sesion, consultar saldo en tiempo real, transferir dinero a otros usuarios y revisar el historial de movimientos sincronizado con Cloud Firestore.

Proyecto desarrollado para la evaluacion Mini Banco Digital de Programacion Front End.

## Funcionalidades

- Registro e inicio de sesion con Firebase Authentication mediante email y password.
- Creacion automatica del perfil bancario en Firestore con saldo inicial de $100.000.
- Dashboard con nombre de usuario, saldo actual y resumen de actividad.
- Saldo sincronizado en tiempo real con `onSnapshot`.
- Transferencias entre usuarios con validaciones de monto, saldo, destinatario existente y bloqueo de autotransferencia.
- Historial de movimientos en tiempo real, ordenado desde el mas reciente.
- Cierre de sesion con limpieza de estado y suscripciones.
- Deposito y retiro simulado como funcionalidad bonus.
- Filtros para revisar el historial por tipo, fecha y monto.
- Modo oscuro persistente en `localStorage`.

## Stack Tecnico

- React 19
- Vite
- Firebase Authentication
- Cloud Firestore
- Tailwind CSS
- ESLint

## Requisitos Previos

- Node.js instalado.
- Cuenta/proyecto de Firebase configurado.
- Authentication habilitado con proveedor Email/Password.
- Cloud Firestore creado en el proyecto Firebase.

## Instalacion y Ejecucion Local

Instalar dependencias desde la raiz del repositorio:

```bash
npm install
```

Crear el archivo de variables de entorno local:

```bash
cp .env.example .env.local
```

Completar `.env.local` con la configuracion del proyecto Firebase:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

La aplicacion se levanta con Vite y se puede abrir desde la URL mostrada en consola, normalmente `http://localhost:5173`.

## Usuarios de Prueba

Estos usuarios deben existir en Firebase Authentication y tener su documento correspondiente en Firestore dentro de `users/{uid}`.

| Usuario | Email | Password |
| --- | --- | --- |
| Usuario prueba 1 | `eva2@gmail.com` | `123456` |
| Usuario prueba 2 | `frontend@gmail.com` | `123456` |

Si los usuarios no existen, se pueden crear desde el formulario de registro de la aplicacion. Al registrarse, la app crea automaticamente el documento del usuario con saldo inicial de $100.000.

## Configuracion de Firebase

La configuracion de Firebase se carga desde variables de entorno en `src/firebase/config.js`. El archivo `.env.local` no debe subirse al repositorio. El archivo `.env.example` indica las variables necesarias sin exponer credenciales.

El proyecto usa:

- `Firebase Authentication` para registro, login, persistencia de sesion y logout.
- `Cloud Firestore` para perfiles de usuarios, saldos, transferencias e historial.
- `firestore.rules` para reglas de seguridad de la base de datos.

Para desplegar las reglas de Firestore, usar Firebase CLI desde la raiz del proyecto:

```bash
firebase deploy --only firestore
```

## Modelo de Datos

El modelo usado separa el perfil bancario, el historial visible por usuario y el registro global de transferencias.

### `users/{uid}`

```js
{
  nombre: string,
  email: string,
  saldo: number,
  createdAt: timestamp,
  updatedAt: timestamp,
  lastTransferId: string | null
}
```

Cada usuario autenticado tiene un documento propio. El saldo se escucha en tiempo real desde este documento.

### `users/{uid}/movimientos/{movimientoId}`

```js
{
  tipo: 'egreso' | 'ingreso' | 'deposito' | 'retiro',
  contraparteUid: string,
  contraparteNombre: string,
  contraparteEmail: string,
  monto: number,
  descripcion: string,
  fecha: timestamp,
  status: 'Completado',
  transferenciaId: string
}
```

Esta subcoleccion contiene el historial individual del usuario. Se consulta con `onSnapshot` y `orderBy('fecha', 'desc')` para actualizar la UI sin refrescar.

Los movimientos de deposito y retiro simulado no usan `contraparteUid` ni `transferenciaId`; guardan los datos de la operacion con tarjeta enmascarada.

### `transfers/{transferId}`

```js
{
  emisorUid: string,
  emisorNombre: string,
  emisorEmail: string,
  receptorUid: string,
  receptorNombre: string,
  receptorEmail: string,
  monto: number,
  descripcion: string,
  fecha: timestamp,
  status: 'Completado'
}
```

La transferencia se ejecuta con `runTransaction` para descontar al emisor, abonar al receptor y registrar ambos movimientos de forma consistente.

## Programacion Reactiva

La aplicacion usa suscripciones en tiempo real mediante `onSnapshot` para:

- Perfil y saldo del usuario autenticado.
- Lista de usuarios disponibles para transferir.
- Historial de movimientos del usuario.

Las suscripciones se crean dentro de `useEffect` y retornan sus funciones `unsubscribe` para evitar fugas de memoria al cambiar de usuario o cerrar sesion.

## Manejo de Eventos y Validaciones

- Los formularios son controlados con estado de React.
- Los submit usan `event.preventDefault()`.
- Los handlers tienen nombres descriptivos como `handleLogin`, `handleRegister`, `handleConfirmTransfer` y `handleAccountOperation`.
- Los botones se deshabilitan mientras una operacion esta en curso para evitar doble envio.
- Las validaciones se realizan antes de escribir en Firestore y se muestra feedback visible al usuario.

## Estructura Principal

```txt
.
+-- README.md
+-- .env.example
+-- firebase.json
+-- firestore.rules
+-- package.json
+-- vite.config.js
`-- src/
    +-- components/
    +-- config/
    +-- firebase/
    +-- services/
    +-- utils/
    +-- views/
    +-- App.jsx
    `-- main.jsx
```

## Scripts Disponibles

Desde la raiz del repositorio:

```bash
npm run dev
```

Inicia el servidor de desarrollo.

```bash
npm run build
```

Genera la version de produccion.

```bash
npm run lint
```

Ejecuta ESLint sobre el proyecto React.

```bash
npm run preview
```

Previsualiza el build de produccion.

## Uso de IA

Se uso IA como apoyo para revisar requerimientos, ordenar la documentacion y mejorar la claridad del README. El codigo y las decisiones tecnicas fueron revisadas para poder explicarlas en defensa. Tambien se uso como ayuda para contrastar la implementacion con los requisitos de programacion reactiva, manejo de eventos y Firebase.

## Notas Para la Defensa

- El saldo no se maneja solo como estado local: se deriva del documento `users/{uid}` escuchado con `onSnapshot`.
- Las transferencias usan `runTransaction` para mantener consistencia entre saldo del emisor, saldo del receptor y movimientos.
- El historial se guarda por usuario para consultar solo los movimientos relevantes y actualizarlos en tiempo real.
- El modo oscuro persiste en `localStorage` y aplica la clase global `dark` porque Tailwind esta configurado con `darkMode: 'class'`; no se manipulan nodos de negocio ni formularios fuera del estado de React.
- El archivo `.env.local` queda fuera del repositorio para no exponer configuracion sensible.
