import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/auth.tailwind.css'
import { sendOtpMock, verifyOtpMock, updatePasswordMock } from '../data/authService'

// ── SVG icons inlined so no external asset dependency ─────────────────────
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: 2 }}>
    <circle cx="8" cy="8" r="7" stroke="#94a3b8" strokeWidth="1.25" />
    <rect x="7.25" y="6.5" width="1.5" height="5" rx="0.75" fill="#94a3b8" />
    <circle cx="8" cy="4.5" r="0.85" fill="#94a3b8" />
  </svg>
)
const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="5" stroke="#22d3ee" strokeWidth="1.2" />
    <path d="M6 3.5V6.5L8 8" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)
const RefreshIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6A4 4 0 1 1 6 2" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M6 0.5L8 2.5L6 4.5" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M11 7H3M5 3.5L1.5 7 5 10.5" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M8 1.5L13.5 4v4.5c0 2.8-2.25 4.8-5.5 5.5C5.25 13.8 2.5 11.8 2.5 8.5V4L8 1.5Z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M5.5 8l1.75 1.75L10.5 6" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ── Countdown timer hook ───────────────────────────────────────────────────
function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds])

  const reset = (s = initialSeconds) => setSeconds(s)
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return { seconds, display: `${mm}:${ss}`, reset }
}

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

  // Expiry countdown (4 min 42 s = 282 s)
  const expiry = useCountdown(282)
  // Resend available countdown (18 s)
  const resend = useCountdown(18)

  async function sendOtp() {
    setLoading(true)
    const res = await sendOtpMock(email)
    setLoading(false)
    if (res.ok) {
      setMessage('')
      setStep('otp')
      setOtp(['', '', '', '', '', ''])
      expiry.reset()
      resend.reset()
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
      <div className="auth-panel" style={{ maxWidth: 550 }}>
        {/* Header */}
        <div className="badge">ADMIN COMMAND</div>
        <img src="/logo.png" alt="logo" className="brand" />
        <h1 className="title small">
          <span className="brand-title">GO SWIFT</span>{' '}
          <span className="accent">BAHAMAS</span>
        </h1>
        <div style={{ color: '#94a3b8', fontSize: 12, textAlign: 'center', marginBottom: 2 }}>
          Official Administrative Gateway • Commonwealth of The Bahamas
        </div>

        {message && (
          <div className="text-sm text-center" style={{ color: '#9fb7c6', marginTop: 4 }}>
            {message}
          </div>
        )}

        {/* ── Email Step ──────────────────────────────────────────────────── */}
        {step === 'email' && (
          <>
            <label className="label">WORK EMAIL</label>
            <input
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
            />
            <div className="actions">
              <button className="primary" onClick={sendOtp} disabled={loading}>
                {loading ? 'Sending…' : 'Send OTP'}
              </button>
              <Link to="/" className="link muted">Back to Login</Link>
            </div>
          </>
        )}

        {/* ── OTP Step (Figma-matched) ────────────────────────────────────── */}
        {step === 'otp' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8 }}>

            {/* Context notice box */}
            <div className="otp-notice">
              <InfoIcon />
              <p className="otp-notice-text">
                A 6-digit verification code was sent to authorized email{' '}
                <span className="otp-notice-email">admin.officer@goswiftbahamas.com</span>{' '}
                and registered Number{' '}
                <span className="otp-notice-email">(+1 242 •••-9018)</span>
              </p>
            </div>

            {/* Label row with countdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="otp-label-row">
                <span className="otp-label">ENTER 6-DIGIT VERIFICATION CODE</span>
                <div className="otp-timer">
                  <ClockIcon />
                  <span className="otp-timer-text">EXPIRES:&nbsp;</span>
                  <span className="otp-timer-value">{expiry.display}</span>
                </div>
              </div>

              {/* 6-digit input slots */}
              <div className="otp-grid">
                {otp.map((v, i) => (
                  <input
                    key={i}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className={`otp-digit${!v ? ' otp-empty' : ''}`}
                    value={v || (document.activeElement === inputsRef.current[i] ? '' : '•')}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    onFocus={(e) => {
                      // show real value (or empty) when focused
                      if (e.target.value === '•') e.target.value = ''
                    }}
                    ref={(el) => (inputsRef.current[i] = el)}
                  />
                ))}
              </div>

              {/* Resend row */}
              <div className="otp-resend-row">
                <span className="otp-resend-hint">Did not receive code?</span>
                <button
                  className="otp-resend-btn"
                  disabled={resend.seconds > 0}
                  onClick={() => {
                    if (resend.seconds === 0) {
                      resend.reset(18)
                      expiry.reset()
                      sendOtp()
                    }
                  }}
                >
                  <RefreshIcon />
                  {resend.seconds > 0
                    ? `Resend Code (Available in ${resend.seconds}s)`
                    : 'Resend Code'}
                </button>
              </div>
            </div>

            {/* CTA button */}
            <button className="otp-cta-btn" onClick={verify} disabled={loading}>
              <ShieldIcon />
              {loading ? 'Verifying…' : 'Verify Code & Proceed to Password Reset'}
              <ArrowRightIcon />
            </button>

            {/* Back link */}
            <div style={{ paddingTop: 7, paddingBottom: 5 }}>
              <Link to="/" className="otp-back-link">
                <ArrowLeftIcon />
                Return to Admin Gateway Login
              </Link>
            </div>

            {/* Security audit banner */}
            <div className="otp-security-banner">
              <p style={{ color: '#475569', fontSize: 10, textAlign: 'center', letterSpacing: '0.05em', fontFamily: 'monospace' }}>
                🔒 ADMIN SECURITY AUDIT ACTIVE • ALL ACTIONS LOGGED • UNAUTHORIZED ACCESS IS A FEDERAL OFFENSE
              </p>
            </div>
          </div>
        )}

        {/* ── Reset Step ──────────────────────────────────────────────────── */}
        {step === 'reset' && (
          <>
            <label className="label">New Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="label">Confirm Password</label>
            <input
              type="password"
              className="input-field"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <div className="actions">
              <button className="primary" onClick={updatePassword} disabled={loading}>
                {loading ? 'Updating…' : 'Update Password'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
