import { Link } from '@tanstack/react-router'
import { useAuth } from './AuthProvider'
import { Button } from './ui/button'

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between border-b">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/form/simple">Simple Form</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/form/address">Address Form</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/tanstack-query">TanStack Query</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/demo/table">TanStack Table</Link>
        </div>

        {isAuthenticated && (
          <div className="px-2 font-bold">
            <Link to="/dashboard">Dashboard</Link>
          </div>
        )}
      </nav>

      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Welcome, {user?.username}
            </span>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/auth/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
