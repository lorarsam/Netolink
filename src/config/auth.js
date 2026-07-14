export const loginContent = {
  brand: {
    name: 'Netolink',
    ariaLabel: 'Netolink Digital Banking',
    iconSrc: '/icono.svg',
  },
  title: 'Welcome Back',
  subtitle: 'Sign in to continue to your digital bank.',
  submitLabel: 'Login',
  submittingLabel: 'Validando...',
  forgotPasswordLabel: 'Forgot password?',
  passwordToggleLabels: {
    hide: 'Ocultar password',
    show: 'Mostrar password',
  },
  signUpPrompt: "Don't have an account?",
  signUpLabel: 'Sign up',
  fields: [
    {
      id: 'email',
      name: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      type: 'email',
      autoComplete: 'email',
      icon: 'mail',
    },
    {
      id: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      type: 'password',
      autoComplete: 'current-password',
      icon: 'lock',
      actionIcon: 'eye',
    },
  ],
}

export const authErrorMessages = {
  default: 'No se pudo completar la operacion.',
  emailAlreadyInUse: 'Ese email ya esta registrado.',
  invalidCredential: 'Email o password incorrectos.',
  invalidEmail: 'Ingresa un email valido.',
  weakPassword: 'La password debe tener al menos 6 caracteres.',
}
