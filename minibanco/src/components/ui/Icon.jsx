import {
  FiArrowDown,
  FiArrowUp,
  FiBell,
  FiCheckCircle,
  FiCoffee,
  FiCreditCard,
  FiEye,
  FiEyeOff,
  FiFileText,
  FiGrid,
  FiHelpCircle,
  FiLock,
  FiLogOut,
  FiMail,
  FiMoon,
  FiSearch,
  FiSend,
  FiSettings,
  FiShield,
  FiShoppingBag,
  FiSun,
} from 'react-icons/fi'

const icons = {
  arrowDown: FiArrowDown,
  arrowUp: FiArrowUp,
  bag: FiShoppingBag,
  bank: FiCreditCard,
  bell: FiBell,
  checkCircle: FiCheckCircle,
  eye: FiEye,
  eyeOff: FiEyeOff,
  grid: FiGrid,
  help: FiHelpCircle,
  lock: FiLock,
  logout: FiLogOut,
  mail: FiMail,
  moon: FiMoon,
  receipt: FiFileText,
  search: FiSearch,
  send: FiSend,
  settings: FiSettings,
  shield: FiShield,
  sun: FiSun,
  utensils: FiCoffee,
}

export function Icon({ name, className = 'h-4 w-4', strokeWidth = 1.8 }) {
  const IconComponent = icons[name]

  if (!IconComponent) {
    return null
  }

  return <IconComponent className={className} strokeWidth={strokeWidth} aria-hidden="true" />
}
