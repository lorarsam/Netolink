import { useState } from 'react'
import { AuthCard } from '../components/auth/AuthCard'
import { BrandLogo } from '../components/brand/BrandLogo'
import { loginContent } from '../config/auth'

const initialForm = {
  email: '',
  password: '',
}

export function LoginView({ content = loginContent, error, isSubmitting, onLogin, onRegister }) {
  const [form, setForm] = useState(initialForm)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onLogin(form)
  }

  return (
    <main className="grid min-h-screen place-items-center border-[3px] border-ink bg-brand px-4 py-8 text-ink sm:px-6 sm:py-10">
      <section className="w-full max-w-[19.5rem]">
        <div className="mb-7">
          <BrandLogo compact {...content.brand} />
        </div>
        <AuthCard content={content} error={error} form={form} isSubmitting={isSubmitting} onChange={handleChange} onSignUp={onRegister} onSubmit={handleSubmit} />
      </section>
    </main>
  )
}
