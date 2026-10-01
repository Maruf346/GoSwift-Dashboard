import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'
import ProviderManagement from './pages/ProviderManagement'
import ContactSupport from './pages/ContactSupport'
import AdminSettings from './pages/AdminSettings'
import { AuthProvider, useAuth } from './hooks/useAuth'
import './App.css'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/" replace />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/providers"
            element={
              <ProtectedRoute>
                <ProviderManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <ContactSupport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
