import { Button } from '../ui/Button'

const avatarColors = ['bg-blush text-brand-dark', 'bg-mint text-teal', 'bg-cream text-brand-dark']

export function RecentRecipients({ content, onSelect, recipients }) {
  return (
    <section className="rounded-3xl border border-line bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-black">{content.title}</h3>
        <Button className="text-xs" type="button" variant="textGhost">{content.actionLabel}</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        {recipients.map((recipient, index) => (
          <Button
            key={recipient.id}
            onClick={() => onSelect(recipient)}
            type="button"
            variant="recipient"
          >
            <span className={`grid h-8 w-8 place-items-center rounded-full text-xs ${avatarColors[index % avatarColors.length]}`}>
              {recipient.name.slice(0, 1)}
            </span>
            {recipient.name}
          </Button>
        ))}
      </div>
    </section>
  )
}
