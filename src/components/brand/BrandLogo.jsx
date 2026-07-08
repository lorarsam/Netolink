export function BrandLogo({ name, ariaLabel, compact = false, iconSrc }) {
  return (
    <div className="flex items-center justify-center gap-2 text-onBrand" aria-label={ariaLabel}>
      <span className={`${compact ? 'h-5 w-5 rounded-md' : 'h-6 w-6 rounded-lg'} grid place-items-center bg-onBrand text-brand`}>
        <img alt="" className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} src={iconSrc} />
      </span>
      <span className={`${compact ? 'text-sm' : 'text-base'} font-extrabold tracking-tight`}>{name}</span>
    </div>
  )
}
