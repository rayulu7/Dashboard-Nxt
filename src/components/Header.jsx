import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HiSearch, HiBell, HiMoon, HiSun, HiInformationCircle, HiUser, HiX, HiCheckCircle, HiExclamationCircle, HiMenu } from 'react-icons/hi'
import { useTheme } from '../contexts/ThemeContext'

const Header = ({ onMenuClick }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [user, setUser] = useState(null)
  const [showInfoPopup, setShowInfoPopup] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const infoPopupRef = useRef(null)
  const notificationsRef = useRef(null)

  
  const [notifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile has been successfully updated.',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'New Feature Available',
      message: 'Check out our new dashboard analytics feature.',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Task Reminder',
      message: 'You have 3 pending tasks due today.',
      time: '3 hours ago',
      read: true,
    },
    {
      id: 4,
      type: 'success',
      title: 'Welcome!',
      message: 'Welcome to Horizon Dashboard. Get started by exploring the features.',
      time: '1 day ago',
      read: true,
    },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    }
    
    loadUser()
    
    
    window.addEventListener('storage', loadUser)
    
    
    const handleUserUpdate = () => loadUser()
    window.addEventListener('userUpdated', handleUserUpdate)
    
    return () => {
      window.removeEventListener('storage', loadUser)
      window.removeEventListener('userUpdated', handleUserUpdate)
    }
  }, [])

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      
      if (infoPopupRef.current && !infoPopupRef.current.contains(event.target)) {
        if (!event.target.closest('[data-info-icon]')) {
          setShowInfoPopup(false)
        }
      }
      
     
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        if (!event.target.closest('[data-bell-icon]')) {
          setShowNotifications(false)
        }
      }
    }

    if (showInfoPopup || showNotifications) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showInfoPopup, showNotifications])

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <HiCheckCircle className="text-green-400" />
      case 'warning':
        return <HiExclamationCircle className="text-yellow-400" />
      case 'info':
        return <HiInformationCircle className="text-blue-400" />
      default:
        return <HiBell className="text-purple-accent" />
    }
  }
  
  const getPageTitle = () => {
    const routes = {
      '/': { breadcrumb: 'Pages / Dashboard', title: 'Main Dashboard' },
      '/nft-marketplace': { breadcrumb: 'Pages / NFT Marketplace', title: 'NFT Marketplace' },
      '/tables': { breadcrumb: 'Pages / Tables', title: 'Tables' },
      '/kanban': { breadcrumb: 'Pages / Kanban', title: 'Kanban Board' },
      '/profile': { breadcrumb: 'Pages / Profile', title: 'Profile' },
    }
    return routes[location.pathname] || { breadcrumb: 'Pages', title: 'Dashboard' }
  }

  const { breadcrumb, title } = getPageTitle()

  return (
    <div className="fixed top-0 left-0 lg:left-64 right-0 h-16 lg:h-20 bg-navbar border-b border-border flex items-center justify-between px-4 lg:px-8 z-10 transition-colors">
      
      <div className="flex items-center gap-3 lg:gap-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-primary p-2 hover:bg-card rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <HiMenu className="w-6 h-6" />
        </button>
        <div>
          <p className="text-secondary text-xs lg:text-sm hidden sm:block">{breadcrumb}</p>
          <h1 className="text-primary text-lg lg:text-2xl font-bold">{title}</h1>
        </div>
      </div>

      
      <div className="flex items-center gap-2 lg:gap-4">
        
        <div className="relative hidden md:block">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search"
            className="bg-card text-primary pl-10 pr-4 py-2 rounded-lg w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-purple-accent border border-border transition-colors"
          />
        </div>

        
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="relative">
              <HiBell 
                data-bell-icon
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-primary text-xl cursor-pointer hover:text-purple-accent transition-colors" 
              />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            {showNotifications && (
              <div
                ref={notificationsRef}
                className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-card-bg border border-border rounded-lg shadow-xl z-50 transition-all duration-200 ease-out opacity-100 scale-100 max-h-96 overflow-hidden flex flex-col"
              >
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h4 className="text-primary font-semibold text-sm flex items-center gap-2">
                    <HiBell className="text-purple-accent" />
                    Notifications
                    {unreadCount > 0 && (
                      <span className="bg-purple-accent text-white text-xs px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </h4>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-secondary hover:text-primary transition-colors"
                  >
                    <HiX className="w-4 h-4" />
                  </button>
                </div>
                <div className="overflow-y-auto max-h-80">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <HiBell className="text-secondary text-4xl mx-auto mb-2" />
                      <p className="text-secondary text-sm">No notifications</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 hover:bg-gray-700/10 transition-colors cursor-pointer ${
                            !notification.read ? 'bg-purple-accent/5' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex-shrink-0">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h5 className={`text-sm font-medium ${!notification.read ? 'text-primary' : 'text-secondary'}`}>
                                  {notification.title}
                                </h5>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-purple-accent rounded-full flex-shrink-0 mt-1.5"></span>
                                )}
                              </div>
                              <p className="text-secondary text-xs mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-secondary text-xs mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-3 border-t border-border">
                    <button className="w-full text-center text-purple-accent text-sm font-medium hover:text-purple-400 transition-colors">
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <button
            onClick={toggleTheme}
            className="text-primary text-xl cursor-pointer hover:text-purple-accent transition-colors p-1 rounded-lg hover:bg-card"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <HiSun /> : <HiMoon />}
          </button>
          <div className="relative">
            <HiInformationCircle 
              data-info-icon
              onClick={() => setShowInfoPopup(!showInfoPopup)}
              className="text-primary text-xl cursor-pointer hover:text-purple-accent transition-colors" 
            />
            {showInfoPopup && (
              <div
                ref={infoPopupRef}
                className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-72 max-w-sm bg-card-bg border border-border rounded-lg shadow-xl p-4 z-50 transition-all duration-200 ease-out opacity-100 scale-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-primary font-semibold text-sm flex items-center gap-2">
                    <HiInformationCircle className="text-purple-accent" />
                    Dashboard Information
                  </h4>
                  <button
                    onClick={() => setShowInfoPopup(false)}
                    className="text-secondary hover:text-primary transition-colors"
                  >
                    <HiX className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-secondary">
                    <span className="text-primary font-medium">Welcome!</span> This dashboard provides an overview of your key metrics and activities.
                  </p>
                  <div className="pt-2 border-t border-border">
                    <p className="text-secondary mb-1">
                      <span className="text-primary font-medium">Quick Tips:</span>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-secondary text-xs ml-2">
                      <li>Use the search bar to find anything quickly</li>
                      <li>Toggle between light and dark themes</li>
                      <li>Click on charts for detailed insights</li>
                      <li>Manage your profile from the avatar menu</li>
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-secondary text-xs">
                      <span className="text-primary font-medium">Version:</span> 1.0.0
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/profile')}
          >
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.username || 'User'} 
                className="w-10 h-10 rounded-full border-2 border-purple-accent object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-purple-accent flex items-center justify-center text-white font-semibold">
                {user?.username ? user.username.substring(0, 2).toUpperCase() : <HiUser />}
              </div>
            )}
            {user?.username && (
              <span className="text-primary font-medium hidden md:block">{user.username}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

