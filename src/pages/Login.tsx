import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// ── Asset URLs (Figma-sourced) ─────────────────────────────────────────────
const imgBrandLogo = 'https://www.figma.com/api/mcp/asset/588ab493-fbb5-4467-9779-994f31440ee9.png'
const imgIconEmail = 'https://www.figma.com/api/mcp/asset/4074ae74-a4bd-4213-8b44-3f9fe8a1a57f.svg'
const imgIconLock = 'https://www.figma.com/api/mcp/asset/d8be3c6f-3144-4439-94c4-4cdc5bed7d05.svg'
const imgIconEye = 'https://www.figma.com/api/mcp/asset/7a4e9772-2c4f-48fb-8f21-0c3608023304.svg'
const imgIconKey = 'https://www.figma.com/api/mcp/asset/b85370b6-7f8f-4291-8abe-acd2eaec000c.svg'
const imgIconArrowRight = 'https://www.figma.com/api/mcp/asset/e8639e3f-5b26-4073-a1a9-efc12e0eed9f.svg'
const imgIconToast = 'https://www.figma.com/api/mcp/asset/7b224567-144d-4b5f-99bc-f35e4f620086.svg'

export default function Login() {
  const [email, setEmail] = useState('admin.officer@goswiftbahamas.com')
  const [password, setPassword] = useState('GS-BS-889241-ALPHA')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const auth = useAuth()
  const nav = useNavigate()

  function handleSubmit(e?: FormEvent) {
    if (e) e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const ok = auth.login(email, password)
      if (!ok) {
        setError('Invalid administrative credentials. Please verify and try again.')
        setLoading(false)
      } else {
        setShowToast(true)
        setTimeout(() => {
          nav('/')
        }, 800)
      }
    }, 400)
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full min-h-screen bg-[#0f131c] text-[#dfe2ee] font-sans antialiased overflow-x-hidden px-4 sm:px-6 py-8"
      style={{
        backgroundImage: 'linear-gradient(180deg, #0f131c 0%, #0a0d14 100%)',
      }}
    >
      {/* ── Background Ambient Glows ───────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[rgba(147,204,255,0.05)] rounded-full blur-[90px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-[rgba(76,215,246,0.04)] rounded-full blur-[80px]" />
      </div>

      {/* ── Main Panel Container ─────────────────────────────────────────── */}
      <div className="relative w-full max-w-[576px] shrink-0 z-10">
        
        {/* Outer Aura Wrap */}
        <div className="relative w-full bg-[#181c24] rounded-xl p-[1px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.6)] border border-[#262b35] overflow-hidden">
          
          {/* Top Blue Glow Underlay */}
          <div className="pointer-events-none absolute top-[-96px] left-1/2 -translate-x-1/2 w-[384px] h-[192px] bg-[rgba(76,215,246,0.15)] rounded-full blur-[36px]" />
          
          {/* Bottom Cyan Glow Underlay */}
          <div className="pointer-events-none absolute bottom-[-95px] right-[40px] w-[256px] h-[128px] bg-[rgba(147,204,255,0.1)] rounded-full blur-[24px]" />

          {/* Main Panel Box */}
          <div className="relative flex flex-col items-center w-full bg-[#1c2028] rounded-[11px] p-6 sm:p-10 gap-6">
            
            {/* Top Admin Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#31353e] rounded-full border border-[#4cd7f6]/20 shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] shrink-0 animate-pulse" />
              <span className="text-[11px] font-semibold text-[#4cd7f6] uppercase tracking-[1.1px] leading-tight">
                ADMIN COMMAND
              </span>
            </div>

            {/* Header / Identity Area */}
            <div className="flex flex-col items-center gap-2 w-full text-center">
              {/* Brand Logo */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 shrink-0 flex items-center justify-center">
                <img
                  src={imgBrandLogo}
                  alt="GoSwift Bahamas"
                  className="w-full h-full object-contain pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* Identity Title */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#dfe2ee] tracking-wide uppercase m-0 leading-tight">
                  GO SWIFT
                </h1>
                <span className="text-xl sm:text-2xl font-extrabold text-[#ffb95f] tracking-wider uppercase leading-tight">
                  BAHAMAS
                </span>
              </div>
            </div>

            {/* Form Authentication Stack */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full text-left">
              
              {/* Field 1: Admin ID */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[11px] font-semibold text-[#bfc7d2] uppercase tracking-[0.55px]">
                  ADMINISTRATIVE ID / WORK EMAIL
                </label>
                <div className="relative flex items-center w-full">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none flex items-center justify-center">
                    <img src={imgIconEmail} alt="" className="w-4 h-4 object-contain" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin.officer@goswiftbahamas.com"
                    className="w-full h-11 bg-[#0a0e16] border border-[#262b35] focus:border-[#3198dc] focus:ring-1 focus:ring-[#3198dc] rounded-md pl-10 pr-4 text-[13.5px] text-[#dfe2ee] placeholder-[#89929b] outline-none transition-all shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.2)]"
                  />
                </div>
              </div>

              {/* Field 2: Password / Security Key */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[11px] font-semibold text-[#bfc7d2] uppercase tracking-[0.55px]">
                  PASSWORD
                </label>
                <div className="relative flex items-center w-full">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none flex items-center justify-center">
                    <img src={imgIconLock} alt="" className="w-4 h-4 object-contain" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full h-11 bg-[#0a0e16] border border-[#262b35] focus:border-[#3198dc] focus:ring-1 focus:ring-[#3198dc] rounded-md pl-10 pr-14 text-[13.5px] text-[#dfe2ee] placeholder-[#89929b] outline-none tracking-wide transition-all shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.2)]"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    <div className="w-[1px] h-4 bg-[#353942]" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1.5 text-[#89929b] hover:text-[#dfe2ee] rounded transition-colors border-0 bg-transparent cursor-pointer flex items-center justify-center"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <img src={imgIconEye} alt="toggle view" className="w-4 h-3.5 opacity-80 hover:opacity-100" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-end pt-0.5 w-full">
                <Link
                  to="/forgot"
                  className="text-[11px] font-semibold text-[#4cd7f6] hover:text-[#67e8f9] tracking-[0.55px] transition-colors no-underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-950/40 border border-red-800/50 rounded-md text-red-300 text-xs flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* CTA Submit Button */}
              <div className="pt-2 w-full">
                <button
                  type="submit"
                  disabled={loading}
                  className="relative flex items-center justify-center gap-2 w-full h-12 rounded-md bg-[#3198dc] hover:bg-[#43a4e5] active:bg-[#2882be] disabled:opacity-70 text-[#003351] font-bold text-base tracking-tight transition-all duration-150 cursor-pointer border-0 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.2),0px_2px_4px_-2px_rgba(0,0,0,0.2)]"
                >
                  <img src={imgIconKey} alt="" className="w-3.5 h-4 object-contain" />
                  <span>{loading ? 'Authenticating...' : 'Log In'}</span>
                  <img src={imgIconArrowRight} alt="" className="w-3 h-3 object-contain" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ── Notification Toast (Session Initialized) ──────────────────────── */}
      <div
        className={`fixed bottom-6 right-6 flex items-center gap-2.5 px-4 py-2.5 bg-[#31353e] border border-[#4cd7f6]/30 text-[#dfe2ee] rounded-lg shadow-2xl z-50 transition-all duration-300 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <img src={imgIconToast} alt="" className="w-4 h-4 object-contain shrink-0" />
        <span className="text-xs font-semibold tracking-wide">Session Initialized</span>
      </div>
    </div>
  )
}
