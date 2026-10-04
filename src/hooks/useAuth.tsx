import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { clearAuthTokens, setAuthTokens } from '../api/client'
import { getCurrentUser, loginAdmin, type AdminUser } from '../api/auth'

const USER_STORAGE_KEY = 'goswift_admin_user'

type AuthContextValue = {
  user: AdminUser | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(() => {
    const stored = window.localStorage.getItem(USER_STORAGE_KEY)
    return stored ? (JSON.parse(stored) as AdminUser) : null
  })

  async function login(email: string, password: string) {
    const response = await loginAdmin(email, password)
    setAuthTokens(response.access, response.refresh)
    setUser(response.user)
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user))
    return true
  }

  async function refreshUser() {
    const currentUser = await getCurrentUser()
    setUser(currentUser)
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser))
  }

  function logout() {
    setUser(null)
    clearAuthTokens()
    window.localStorage.removeItem(USER_STORAGE_KEY)
  }

  const value = useMemo(() => ({ user, login, logout, refreshUser }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
