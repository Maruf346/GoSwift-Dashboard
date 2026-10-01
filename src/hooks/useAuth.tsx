import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { mockUsers } from '../data/mockAuth'

type AuthUser = (typeof mockUsers)[number]

type AuthContextValue = {
  user: AuthUser | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = window.localStorage.getItem('goswift_mock_user')
    return stored ? (JSON.parse(stored) as AuthUser) : null
  })

  function login(email: string, password: string) {
    const found = mockUsers.find((u) => u.email === email && u.password === password) ?? null
    setUser(found)
    if (found) {
      window.localStorage.setItem('goswift_mock_user', JSON.stringify(found))
    }
    return !!found
  }

  function logout() {
    setUser(null)
    window.localStorage.removeItem('goswift_mock_user')
  }

  const value = useMemo(() => ({ user, login, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
