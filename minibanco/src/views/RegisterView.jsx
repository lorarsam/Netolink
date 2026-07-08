import { useState } from 'react'
import { BrandLogo } from '../components/brand/BrandLogo'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { TextField } from '../components/forms/TextField'
import { loginContent } from '../config/auth'
import { formatCurrency } from '../utils/formatters'

const initialForm = {
  name: '',
  email: '',
  password: '',
}

export function RegisterView({ error, initialBalance, isSubmitting = false, onBackToLogin, onRegister }) {
  const [form, setForm] = useState(initialForm)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onRegister(form)
  }

  return (
    <main className="grid min-h-screen place-items-center border-[3px] border-ink bg-brand px-4 py-8 text-ink sm:px-6 sm:py-10">
      <section className="w-full max-w-md">
        <div className="mb-7">
          <BrandLogo compact {...loginContent.brand} />
        </div>

        <Card className="bg-white">
          <header className="text-center">
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">Crear cuenta</h1>
            <p className="mt-2 text-sm text-ink-muted">Alta en Firebase Auth, documento Firestore y saldo inicial.</p>
          </header>

          <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
            <TextField id="name" label="Nombre" name="name" onChange={handleChange} placeholder="Tu nombre" type="text" value={form.name} />
            <TextField autoComplete="email" icon="mail" id="email" label="Email" name="email" onChange={handleChange} placeholder="tu@email.cl" type="email" value={form.email} />
            <TextField actionIcon="eye" autoComplete="new-password" icon="lock" id="password" label="Password" name="password" onChange={handleChange} placeholder="Crea una password" type="password" value={form.password} />

            {error && <p className="rounded-xl bg-blush px-3 py-2 text-xs font-bold text-brand-dark">{error}</p>}

            <div className="rounded-2xl bg-cream-field p-4 text-sm">
              <p className="font-black text-brand-dark">Saldo inicial</p>
              <p className="mt-1 text-2xl font-black">{formatCurrency(initialBalance)}</p>
            </div>

            <Button disabled={isSubmitting} type="submit">{isSubmitting ? 'Creando...' : 'Crear usuario y entrar'}</Button>
            <Button disabled={isSubmitting} onClick={onBackToLogin} type="button" variant="ghost">Ya tengo cuenta</Button>
          </form>
        </Card>
      </section>
    </main>
  )
}
