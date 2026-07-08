import {
  FiArrowDown,
  FiArrowUp,
  FiBell,
  FiCheckCircle,
  FiCoffee,
  FiCreditCard,
  FiEye,
  FiFileText,
  FiGrid,
  FiHelpCircle,
  FiLock,
  FiLogOut,
  FiMail,
  FiSearch,
  FiSend,
  FiSettings,
  FiShield,
  FiShoppingBag,
} from 'react-icons/fi'

const icons = {
  arrowDown: FiArrowDown,
  arrowUp: FiArrowUp,
  bag: FiShoppingBag,
  bank: FiCreditCard,
  bell: FiBell,
  checkCircle: FiCheckCircle,
  eye: FiEye,
  grid: FiGrid,
  help: FiHelpCircle,
  lock: FiLock,
  logout: FiLogOut,
  mail: FiMail,
  receipt: FiFileText,
  search: FiSearch,
  send: FiSend,
  settings: FiSettings,
  shield: FiShield,
  utensils: FiCoffee,
}

export function Icon({ name, className = 'h-4 w-4', strokeWidth = 1.8 }) {
  const IconComponent = icons[name]

  if (!IconComponent) {
    return null
  }

  return <IconComponent className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
