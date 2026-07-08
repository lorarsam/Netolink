import { useMemo, useState } from 'react'
import { Button } from '../ui/Button'
import { InputField } from '../ui/InputField'

export function RecipientCombobox({ content, name, onChange, recipient, users, value }) {
  const [isOpen, setIsOpen] = useState(false)
  const query = value.trim().toLowerCase()
  const filteredUsers = useMemo(() => {
    if (!query) {
      return []
    }

    return users.filter((user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query))
  }, [query, users])
  const suggestedUser = filteredUsers[0]
  const shouldShowSuggestion = isOpen && query && (!recipient || recipient.email !== value)

  function handleInputChange(event) {
    onChange(event)
    setIsOpen(true)
  }

  function handleSelect(user) {
    onChange({ target: { name, value: user.email } })
    setIsOpen(false)
  }

  const dropdown = shouldShowSuggestion ? (
    <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-line bg-white shadow-card" role="listbox">
      {suggestedUser ? (
        <Button className="min-w-0" onMouseDown={(event) => event.preventDefault()} onClick={() => handleSelect(suggestedUser)} type="button" variant="recipientOption">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-xs font-black text-white">
            {suggestedUser.name.slice(0, 1)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black text-ink">{suggestedUser.name}</span>
            <span className="block truncate text-xs font-semibold text-ink-muted">{suggestedUser.email}</span>
          </span>
        </Button>
      ) : (
        <p className="px-4 py-3 text-sm font-semibold text-ink-muted">{content.emptyRecipientsLabel}</p>
      )}
    </div>
  ) : null

  return (
    <InputField
      aria-label={content.recipientSearchLabel}
      autoComplete="off"
      badge={recipient ? content.selectedLabel : null}
      dropdown={dropdown}
      iconLeft="search"
      id={name}
      label={content.recipientLabel}
      name={name}
      onBlur={() => setTimeout(() => setIsOpen(false), 120)}
      onChange={handleInputChange}
      onFocus={() => setIsOpen(true)}
      placeholder={content.recipientPlaceholder}
      type="text"
      value={value}
      valueType="text"
      variant="bank"
    />
  )
}
