import { Button } from './Button'

export function Pagination({ currentPage, nextLabel, onNext, onPrevious, pageCount, previousLabel, statusLabel }) {
  return (
    <nav aria-label={statusLabel} className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
      <Button
        className="px-3 py-2 text-xs disabled:pointer-events-none disabled:opacity-40"
        disabled={currentPage <= 1}
        onClick={onPrevious}
        type="button"
        variant="secondary"
      >
        {previousLabel}
      </Button>

      <span className="text-xs font-black text-ink-muted">{statusLabel}</span>

      <Button
        className="px-3 py-2 text-xs disabled:pointer-events-none disabled:opacity-40"
        disabled={currentPage >= pageCount}
        onClick={onNext}
        type="button"
        variant="secondary"
      >
        {nextLabel}
      </Button>
    </nav>
  )
}
