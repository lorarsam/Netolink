const avatarColors = ['bg-blush text-brand-dark', 'bg-mint text-teal', 'bg-cream text-brand-dark']

export function RecentRecipients({ onSelect, recipients }) {
  return (
    <section className="rounded-3xl border border-line bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-black">Recent Recipients</h3>
        <button className="text-xs font-black text-brand" type="button">View All</button>
      </div>

      <div className="flex flex-wrap gap-3">
        {recipients.map((recipient, index) => (
          <button
            key={recipient.id}
            className="flex items-center gap-3 rounded-xl bg-cream-field px-4 py-3 text-left text-sm font-black transition hover:bg-cream"
            onClick={() => onSelect(recipient)}
            type="button"
          >
            <span className={`grid h-8 w-8 place-items-center rounded-full text-xs ${avatarColors[index % avatarColors.length]}`}>
              {recipient.name.slice(0, 1)}
            </span>
            {recipient.name}
          </button>
        ))}
      </div>
    </section>
  )
}
