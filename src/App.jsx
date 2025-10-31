import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import NFTMarketplace from './pages/NFTMarketplace'
import Tables from './pages/Tables'
import Kanban from './pages/Kanban'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import { Toaster } from './components/ui/toaster'

function AppLayout() {
  const location = useLocation()
  const isSignInPage = location.pathname === '/sign-in'
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Update document title based on route
  useEffect(() => {
    const titles = {
      '/': 'Responsive Dashboard | Rayulu M',
      '/nft-marketplace': 'NFT Marketplace',
      '/tables': 'Data Tables',
      '/kanban': 'Kanban Board',
      '/profile': 'User Profile',
      '/sign-in': 'Sign In',
    }
    document.title = titles[location.pathname] || 'Responsive Dashboard | Rayulu M'
  }, [location.pathname])

  if (isSignInPage) {
    return (
      <>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
        <Toaster />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-dark-blue transition-colors">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/nft-marketplace" element={<NFTMarketplace />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Toaster />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppLayout />
      </Router>
    </ThemeProvider>
  )
}

export default App
