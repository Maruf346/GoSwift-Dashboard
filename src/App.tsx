import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import UserManagement from './pages/UserManagement'
import ProviderManagement from './pages/ProviderManagement'
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
