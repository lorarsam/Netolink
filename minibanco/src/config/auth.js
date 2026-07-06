export const loginContent = {
  brand: {
    name: 'Netolink',
    ariaLabel: 'Netolink Digital Banking',
  },
  title: 'Welcome Back',
  subtitle: 'Sign in to continue to your digital bank.',
  submitLabel: 'Login',
  forgotPasswordLabel: 'Forgot password?',
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
