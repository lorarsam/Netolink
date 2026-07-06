import { AuthCard } from '../components/auth/AuthCard'
import { BrandLogo } from '../components/brand/BrandLogo'
import { loginContent } from '../config/auth'

export function LoginView({ content = loginContent, onLogin, onRegister }) {
  return (
    <main className="grid min-h-screen place-items-center border-[3px] border-ink bg-brand px-6 py-10 text-ink">
      <section className="w-full max-w-[19.5rem]">
        <div className="mb-7">
          <BrandLogo compact {...content.brand} />
        </div>
        <AuthCard content={content} onSignUp={onRegister} onSubmit={onLogin} />
      </section>
    </main>
  )
}
