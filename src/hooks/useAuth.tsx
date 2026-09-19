import { useState } from 'react'
import { mockUsers } from '../data/mockAuth'

export function useAuth() {
  const [user, setUser] = useState<any>(null)

  function login(email: string, password: string) {
    const found = mockUsers.find((u) => u.email === email && u.password === password)
    if (found) setUser(found)
    return !!found
  }

  function logout() {
    setUser(null)
  }

  return { user, login, logout }
}
