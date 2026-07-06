# Diagrama de Flujo - Netolink

``` mermaid
flowchart TD

    A[Inicio] --> B{¿Usuario autenticado?}

    B -- No --> C[Login]
    C --> D{¿Tiene cuenta?}

    D -- No --> E[Registro]
    E --> F[Crear usuario en Firebase Auth]
    F --> G[Crear documento en Firestore]
    G --> H[Saldo inicial $100.000]
    H --> I[Dashboard]

    D -- Sí --> J[Iniciar sesión]
    J --> I

    B -- Sí --> I

    I --> K[Suscripción en tiempo real al saldo]
    I --> L[Suscripción en tiempo real al historial]

    I --> M{Selecciona una opción}

    M --> N[Transferir dinero]
    M --> O[Historial de movimientos]
    M --> P[Cerrar sesión]

    N --> Q[Ingresar destinatario]
    Q --> R[Ingresar monto]
    R --> S[Agregar descripción opcional]

    S --> T{Validaciones}

    T -->|Destinatario existe| U
    T -->|Monto mayor a 0| U
    T -->|Saldo suficiente| U
    T -->|No transferirse a sí mismo| U

    T -->|Error de validación| V[Mostrar mensaje de error]
    V --> Q

    U[Confirmar transferencia] --> W[Actualizar saldo del emisor]
    W --> X[Actualizar saldo del receptor]
    X --> Y[Registrar movimiento en Firestore]

    Y --> Z[Actualizar Dashboard automáticamente]
    Z --> O

    O --> AA[Consultar movimientos en tiempo real]
    AA --> AB[Ordenar del más reciente al más antiguo]
    AB --> AC[Mostrar fecha]
    AC --> AD[Mostrar contraparte]
    AD --> AE[Mostrar monto]
    AE --> AF[Mostrar tipo de movimiento]
    AF --> I

    P --> AG[Cancelar suscripciones activas]
    AG --> AH[Cerrar sesión]
    AH --> C
```
