import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/auth.tailwind.css'
import { sendOtpMock, verifyOtpMock, updatePasswordMock } from '../data/authService'

export default function ForgotPassword() {
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email')
  const [email, setEmail] = useState('admin.officer@goswiftbahamas.com')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const nav = useNavigate()

  async function sendOtp() {
    setLoading(true)
    const res = await sendOtpMock(email)
    setLoading(false)
    if (res.ok) {
      setMessage('A 6-digit verification code was sent to ' + email)
      setStep('otp')
      setOtp(['', '', '', '', '', ''])
      setTimeout(() => inputsRef.current[0]?.focus(), 100)
    }
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^[0-9]*$/.test(value)) return
    const next = [...otp]
    next[index] = value.slice(-1)
    setOtp(next)
    if (value && index < inputsRef.current.length - 1) inputsRef.current[index + 1]?.focus()
  }

  function handleOtpKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) inputsRef.current[index - 1]?.focus()
  }

  async function verify() {
    const code = otp.join('')
    if (code.length !== 6) {
      setMessage('Enter full 6-digit code')
      return
    }
    setLoading(true)
    const res = await verifyOtpMock(email, code)
    setLoading(false)
    if (res.ok) {
      setMessage('Code verified. Enter your new password.')
      setStep('reset')
    } else setMessage(res.message || 'Verification failed')
  }

  async function updatePassword() {
    if (!password || password !== confirm) {
      setMessage('Passwords must match and be non-empty')
      return
    }
    setLoading(true)
    const res = await updatePasswordMock(email, password)
    setLoading(false)
    if (res.ok) {
      setMessage('Password updated successfully')
      setTimeout(() => nav('/'), 1200)
    }
  }

  return (
    <div className="auth-outer">
      <div className="auth-panel">
        <div className="badge">ADMIN COMMAND</div>
        <img src="/logo.png" alt="logo" className="brand" />
        <h1 className="title small"><span className="brand-title">GO SWIFT</span> <span className="accent">BAHAMAS</span></h1>

        {message && <div className="text-sm text-center text-[#9fb7c6]">{message}</div>}

        {step === 'email' && (
          <>
            <label className="label">WORK EMAIL</label>
            <input className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" />
            <div className="actions">
              <button className="primary" onClick={sendOtp} disabled={loading}>{loading ? 'Sending...' : 'Send OTP'}</button>
              <Link to="/" className="link muted">Back to Login</Link>
            </div>
          </>
        )}

        {step === 'otp' && (
          <>
            <label className="label">Enter 6-digit verification code</label>
            <div className="otp-group">
              {otp.map((v, i) => (
                <input key={i} className="otp-input" value={v} onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(e, i)} ref={(el) => (inputsRef.current[i] = el)} />
              ))}
            </div>
            <div className="actions">
              <button className="primary" onClick={verify} disabled={loading}>{loading ? 'Verifying...' : 'Verify Code & Proceed to Password Reset'}</button>
            </div>
          </>
        )}

        {step === 'reset' && (
          <>
            <label className="label">New Password</label>
            <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />

            <label className="label">Confirm Password</label>
            <input type="password" className="input-field" value={confirm} onChange={(e) => setConfirm(e.target.value)} />

            <div className="actions">
              <button className="primary" onClick={updatePassword} disabled={loading}>{loading ? 'Updating...' : 'Update Password'}</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
