import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'
import ProviderManagement from './pages/ProviderManagement'
import ContactSupport from './pages/ContactSupport'
import AdminSettings from './pages/AdminSettings'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/providers" element={<ProviderManagement />} />
        <Route path="/support" element={<ContactSupport />} />
        <Route path="/settings" element={<AdminSettings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
