import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.tailwind.css'

export default function ForgotPassword() {
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  function sendOtp() {
    setStep('otp')
    setOtp(['', '', '', '', '', ''])
    setTimeout(() => inputsRef.current[0]?.focus(), 50)
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^[0-9]*$/.test(value)) return
    const next = [...otp]
    next[index] = value.slice(-1)
    setOtp(next)
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  function handleOtpKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  function verify() {
    const code = otp.join('')
    if (code.length === 6) alert('OTP entered: ' + code)
    else alert('Enter full 6-digit OTP')
  }

  return (
    <div className="auth-outer">
      <div className="auth-panel">
        <div className="badge">ADMIN COMMAND</div>
        <h1 className="title small">Forgot Password</h1>

        {step === 'email' ? (
          <>
            <label className="label">WORK EMAIL</label>
            <input className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" />
            <div className="actions">
              <button
                className="primary"
                onClick={sendOtp}
              >
                Send OTP
              </button>
              <Link to="/" className="link muted">Back to Login</Link>
            </div>
          </>
        ) : (
          <>
            <label className="label">Enter OTP</label>
            <div className="otp-group">
              {otp.map((v, i) => (
                <input
                  key={i}
                  className="otp-input"
                  value={v}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  ref={(el) => (inputsRef.current[i] = el)}
                />
              ))}
            </div>
            <div className="actions">
              <button className="primary" onClick={verify}>Verify</button>
              <button className="link muted" onClick={() => setStep('email')}>Resend</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
