import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/auth.tailwind.css'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [email, setEmail] = useState('admin.officer@goswiftbahamas.com')
  const [password, setPassword] = useState('GS-BS-889241-ALPHA')
  const [error, setError] = useState('')
  const auth = useAuth()
  const nav = useNavigate()

  function handleSubmit() {
    const ok = auth.login(email, password)
    if (!ok) setError('Invalid credentials')
    else nav('/')
  }

  return (
    <div className="auth-outer">
      <div className="auth-panel">
        <div className="badge">ADMIN COMMAND</div>
        <img src="/logo.png" alt="logo" className="brand" />
        <h1 className="title"><span className="brand-title">GO SWIFT</span> <span className="accent">BAHAMAS</span></h1>

        <label className="label">ADMINISTRATIVE ID / WORK EMAIL</label>
        <input className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="label">PASSWORD</label>
        <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className="links">
          <Link to="/forgot" className="link">Forgot Password?</Link>
        </div>

        {error && <div style={{color:'tomato'}}>{error}</div>}

        <button className="primary" onClick={handleSubmit}>Log In</button>
      </div>
    </div>
  )
}
