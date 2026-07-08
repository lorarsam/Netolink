import { useMemo, useState } from 'react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Pagination } from '../ui/Pagination'

const avatarColors = ['bg-blush text-brand-dark', 'bg-mint text-teal', 'bg-cream text-brand-dark']

export function RecentRecipients({ content, onSelect, recipients }) {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = Math.max(1, Number(content.pageSize) || recipients.length || 1)
  const pageCount = Math.max(1, Math.ceil(recipients.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, pageCount)
  const pageStart = (safeCurrentPage - 1) * pageSize
  const visibleRecipients = useMemo(() => recipients.slice(pageStart, pageStart + pageSize), [pageSize, pageStart, recipients])
  const showPagination = recipients.length > pageSize
  const statusLabel = content.pageStatusLabel({ currentPage: safeCurrentPage, pageCount })

  return (
    <Card interactive variant="flat">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-black">{content.title}</h3>
        <Button className="text-xs" type="button" variant="textGhost">{content.actionLabel}</Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {visibleRecipients.map((recipient, index) => (
          <Button
            className="min-w-0 overflow-hidden px-3 py-3 sm:px-4"
            key={recipient.id}
            onClick={() => onSelect(recipient)}
            type="button"
            variant="recipient"
          >
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs ${avatarColors[index % avatarColors.length]}`}>
              {recipient.name.slice(0, 1)}
            </span>
            <span className="min-w-0 text-left">
              <span className="block truncate text-sm font-black text-ink">{recipient.name}</span>
              <span className="block truncate text-[11px] font-semibold text-ink-muted">{recipient.email}</span>
            </span>
          </Button>
        ))}
      </div>

      {showPagination && (
        <Pagination
          currentPage={safeCurrentPage}
          nextLabel={content.nextLabel}
          onNext={() => setCurrentPage(Math.min(safeCurrentPage + 1, pageCount))}
          onPrevious={() => setCurrentPage(Math.max(safeCurrentPage - 1, 1))}
          pageCount={pageCount}
          previousLabel={content.previousLabel}
          statusLabel={statusLabel}
        />
      )}
    </Card>
  )
}
