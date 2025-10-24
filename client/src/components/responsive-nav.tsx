import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Gamepad2, ShoppingCart, User, Search } from 'lucide-react'

type ResponsiveNavProps = {
  userName: string | ''
  search: string
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ResponsiveNav = ({ userName, search, handleSearchChange }: ResponsiveNavProps) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout')
      const data = await res.json()
      if (data.success) navigate('/login?message=Logged out successfully')
    } catch (err) {
      console.log(err)
    }
  }

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [location])

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isSidebarOpen && !target.closest('.sidebar') && !target.closest('.menu-toggle')) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSidebarOpen])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSidebarOpen])

  const navItems = [
    { to: '/', label: 'HOME', icon: Gamepad2, show: true },
    { to: '/cart', label: 'CART', icon: ShoppingCart, show: true },
    { to: '/login', label: 'LOGIN', icon: User, show: !userName },
  ]

  // Desktop Navigation
  if (!isMobile) {
    return (
      <header className="w-full bg-black border-b border-purple-800 sticky top-0 z-40">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo/Title Section */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center">
              <span className="font-pixel text-xs text-white">GC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold retro-text font-pixel">
                GAME CHAMBER
              </h1>
              <p className="text-xs text-purple-400 font-mono">RETRO ARCADE</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4" aria-label="Main navigation">
            {navItems.map((item) => (
              item.show ? (
                <Link
                  key={item.to}
                  to={item.to}
                  className="retro-button px-4 py-2 text-sm desktop-nav-link transition-all duration-200"
                >
                  {item.to === '/cart' ? <ShoppingCart className="w-5 h-5" /> : item.label}
                </Link>
              ) : null
            ))}

            {/* Logout button */}
            {
              userName ? (
                <button
                  onClick={handleLogout}
                  className="retro-button px-4 py-2 text-sm text-red-500 transition-all duration-200"
                >
                  Logout
                </button>
              ) : null
            }
            
            {/* Search Bar */}
            <form role="search" className="flex items-center">
              <label htmlFor="search" className="sr-only">Search for games</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
                <input
                  id="search"
                  name="search"
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search games..."
                  className="pl-10 pr-4 py-2 bg-black text-white placeholder-purple-400 border border-purple-800 rounded focus:outline-none focus:border-purple-600 font-mono text-sm w-40 focus:w-48 transition-all duration-200 desktop-search-focus"
                />
              </div>
            </form>

            {/* User Section - Enhanced Design */}
            
            {
              userName ? (
                <div className="flex items-center space-x-3 user-status-card rounded-lg px-4 py-2 transition-all duration-300 group">
                  <div className="relative user-avatar-retro">
                    <User className="w-5 h-5 text-green-400 group-hover:text-green-300 transition-colors duration-200" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full user-status-pulse"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-green-300 font-mono text-sm font-semibold tracking-wide group-hover:text-green-200 transition-colors duration-200">
                      {userName}
                    </span>
                    <span className="text-green-500/70 font-mono text-xs group-hover:text-green-400/80 transition-colors duration-200">
                      Player Online
                    </span>
                  </div>
                  <div className="w-1 h-6 user-status-divider rounded-full"></div>
                </div>
              ) : null
            }
            
          </nav>
        </div>
      </header>
    )
  }

  // Mobile Navigation with Sidebar
  return (
    <>
      {/* Mobile Header */}
      <header className="w-full bg-black border-b border-purple-800 sticky top-0 z-40">
        <div className="flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
              <span className="font-pixel text-xs text-white">GC</span>
            </div>
            <div>
              <h1 className="text-lg font-bold retro-text font-pixel">
                GAME CHAMBER
              </h1>
            </div>
          </Link>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="menu-toggle p-2 rounded-md text-purple-300 hover:text-white hover:bg-purple-800 transition-colors duration-200"
            aria-label="Toggle navigation menu"
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* User Section - Enhanced Mobile Design */}
        {
          userName ? (
            <div className="flex items-center space-x-3 px-4 pt-1 mb-4">
              <div className="flex items-center space-x-3 user-status-card rounded-lg px-4 py-2 transition-all duration-300 group w-full">
                <div className="relative user-avatar-retro">
                  <User className="w-5 h-5 text-green-400 group-hover:text-green-300 transition-colors duration-200" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full user-status-pulse"></div>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-green-300 font-mono text-sm font-semibold tracking-wide group-hover:text-green-200 transition-colors duration-200">
                    {userName}
                  </span>
                  <span className="text-green-500/70 font-mono text-xs group-hover:text-green-400/80 transition-colors duration-200">
                    Player Online
                  </span>
                </div>
                <div className="w-1 h-6 user-status-divider rounded-full"></div>
              </div>
            </div>
          ) : null
        }

        {/* Mobile Search Bar */}
        <div className="px-4 pb-3">
          <form role="search" className="flex items-center">
            <label htmlFor="mobile-search" className="sr-only">Search for games</label>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
              <input
                id="mobile-search"
                name="search"
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search games..."
                className="pl-10 pr-4 py-2 bg-gray-900 text-white placeholder-purple-400 border border-purple-800 rounded focus:outline-none focus:border-purple-600 font-mono text-sm w-full mobile-search-focus"
              />
            </div>
          </form>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 mobile-nav-backdrop"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`sidebar fixed top-0 right-0 h-full w-64 bg-gray-900 border-l border-purple-800 transform transition-transform duration-300 ease-in-out z-50 mobile-nav-transition ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                <span className="font-pixel text-xs text-white">GC</span>
              </div>
              <span className="text-purple-400 font-mono text-sm">RETRO ARCADE</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-md text-purple-300 hover:text-white hover:bg-purple-800 transition-colors duration-200"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.to
              return (
                item.show ? (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-md font-mono text-sm transition-colors duration-200 mobile-nav-item ${
                      isActive
                        ? 'bg-purple-600 text-white'
                        : 'text-purple-300 hover:bg-purple-800 hover:text-white'
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ) : null
              )
            })}
          </nav>

          {/* Additional Sidebar Content */}
          <div className="mt-8 pt-6 border-t border-purple-800">
            <p className="text-purple-400 font-mono text-xs text-center">
              © {new Date().getFullYear()} Game Chamber
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default ResponsiveNav