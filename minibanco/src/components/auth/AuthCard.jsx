import { Button } from '../ui/Button'
import { TextField } from '../forms/TextField'

export function AuthCard({ content, error, form, isSubmitting = false, onChange, onSignUp, onSubmit }) {
  return (
    <article className="w-full rounded-[1.6rem] bg-white px-7 py-8 text-ink shadow-card sm:px-8">
      <header className="text-center">
        <h1 className="text-[1.7rem] font-black leading-none tracking-[-0.04em] sm:text-3xl">{content.title}</h1>
        <p className="mt-2 text-[11px] font-medium text-ink-muted">{content.subtitle}</p>
      </header>

      <form className="mt-7 grid gap-3.5" onSubmit={onSubmit}>
        {content.fields.map((field) => (
          <TextField
            key={field.id}
            actionIcon={field.actionIcon}
            autoComplete={field.autoComplete}
            icon={field.icon}
            id={field.id}
            label={field.label}
            name={field.name}
            onChange={onChange}
            placeholder={field.placeholder}
            rightLabel={field.id === 'password' ? <a className="text-[9px] font-extrabold text-brand hover:text-brand-dark" href="#forgot-password">{content.forgotPasswordLabel}</a> : null}
            type={field.type}
            value={form[field.name] || ''}
          />
        ))}

        {error && <p className="rounded-xl bg-blush px-3 py-2 text-[10px] font-bold text-brand-dark">{error}</p>}

        <Button className="mt-2 w-full py-2.5 text-[11px]" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Validando...' : content.submitLabel}
        </Button>
      </form>

      <p className="mt-5 text-center text-[10px] font-semibold text-ink-muted">
        {content.signUpPrompt}{' '}
        <Button className="text-[10px]" onClick={onSignUp} type="button" variant="textGhost">
          {content.signUpLabel}
        </Button>
      </p>
    </article>
  )
}
