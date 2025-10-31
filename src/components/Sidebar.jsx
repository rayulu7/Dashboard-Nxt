import { Link, useLocation } from 'react-router-dom'
import { 
  HiHome, 
  HiShoppingCart, 
  HiChartBar, 
  HiViewGrid,
  HiUser,
  HiLockClosed,
  HiX
} from 'react-icons/hi'
import { FiGift } from 'react-icons/fi'
import { useTheme } from '../contexts/ThemeContext'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { theme } = useTheme()
  
  const menuItems = [
    { icon: HiHome, label: 'Dashboard', path: '/' },
    { icon: HiShoppingCart, label: 'NFT Marketplace', path: '/nft-marketplace' },
    { icon: HiChartBar, label: 'Tables', path: '/tables' },
    { icon: HiViewGrid, label: 'Kanban', path: '/kanban' },
    { icon: HiUser, label: 'Profile', path: '/profile' },
    { icon: HiLockClosed, label: 'Sign In', path: '/sign-in' },
  ]

  return (
    <>
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      
      <div className={`
        fixed left-0 top-0 h-full w-64 flex flex-col transition-all duration-300 z-50
        ${theme === 'dark' ? 'bg-dark-blue' : 'bg-white border-r border-light-border'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
      
      <div className="flex items-center justify-between p-6">
        <Link to="/" onClick={onClose}>
          <h1 className={`text-xl font-bold transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-light-text'
          }`}>HORIZON FREE</h1>
        </Link>
        
        <button
          onClick={onClose}
          className={`lg:hidden p-2 hover:bg-card-bg rounded-lg transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-light-text'
          }`}
        >
          <HiX className="w-6 h-6" />
        </button>
      </div>

      
      <nav className="flex-1 px-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={index}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                isActive
                  ? 'bg-purple-accent/20 border-l-4 border-purple-accent'
                  : theme === 'dark' ? 'hover:bg-card-bg' : 'hover:bg-gray-100'
              }`}
            >
              <Icon className={`text-xl transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-light-text'
              }`} />
              <span className={`text-sm transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-light-text'
              }`}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      
      <div className="p-4 mb-4 mx-4 rounded-xl bg-gradient-to-br from-purple-accent to-purple-600">
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <FiGift className="text-white text-2xl" />
          </div>
        </div>
        <h3 className="text-white font-bold text-center mb-2">Upgrade to PRO</h3>
        <p className="text-white/80 text-xs text-center mb-4">
          to get access to all features! Connect with Venus World!
        </p>
        <button className="w-full bg-white text-purple-accent py-2 rounded-lg font-semibold text-sm hover:bg-white/90 transition-colors">
          Upgrade to PRO
        </button>
      </div>
      </div>
    </>
  )
}

export default Sidebar

