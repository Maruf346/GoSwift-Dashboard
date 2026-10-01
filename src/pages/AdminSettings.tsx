import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Check,
  Eye,
  IdCard,
  Info,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  Lock,
  LogOut,
  Mail,
  Phone,
  Save,
  Settings,
  ShieldCheck,
  User,
  UserRound,
  Users,
  Handshake,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

// ── Asset URLs (Figma-sourced) ─────────────────────────────────────────────
const imgLogo = '/logo.png'

export default function AdminSettings() {
  const auth = useAuth()
  const nav = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Account details form state
  const [fullName, setFullName] = useState('Devante Turnquest')
  const [email, setEmail] = useState('admin@goswiftbahamas.com')
  const [phone, setPhone] = useState('+1 (242) 397-2000')

  // Password update form state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPass, setShowCurrentPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  // UI Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isSavingAccount, setIsSavingAccount] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  function showToast(message: string) {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  function handleSaveAccount(e: React.FormEvent) {
    e.preventDefault()
    setIsSavingAccount(true)
    setTimeout(() => {
      setIsSavingAccount(false)
      showToast('Account details saved successfully.')
    }, 400)
  }

  function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault()
    if (!currentPassword) {
      showToast('Please enter your current password.')
      return
    }
    if (newPassword.length < 8) {
      showToast('New password must be at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.')
      return
    }

    setIsUpdatingPassword(true)
    setTimeout(() => {
      setIsUpdatingPassword(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      showToast('Password updated successfully.')
    }, 500)
  }

  function handleLogout() {
    auth.logout()
    nav('/')
  }

  const navItems = [
    { Icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', active: false },
    { Icon: Users, label: 'User Management', path: '/users', active: false },
    { Icon: Handshake, label: 'Provider Management', path: '/providers', active: false },
    { Icon: LifeBuoy, label: 'Contact Support', path: '/support', active: false },
    { Icon: Settings, label: 'Settings', path: '/settings', active: true },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#0f131c] text-[#dfe2ee] font-sans antialiased selection:bg-[#3198dc]/30 selection:text-white relative">
      {/* ═══ MOBILE BACKDROP OVERLAY ══════════════════════════════════════ */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ═══ SIDEBAR ASIDE ═════════════════════════════════════════════════ */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#0a0e16] border-r border-[#1c2028] flex flex-col justify-between z-40 transition-all duration-300 ease-in-out shadow-2xl ${
          isCollapsed ? 'w-[72px]' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col items-start w-full">
          {/* Logo / Brand Header */}
          <div className="flex items-center justify-between w-full h-16 px-4 bg-[#181c24]/40 border-b border-[#1c2028]">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={imgLogo}
                alt="GoSwift Logo"
                className="w-10 h-10 object-contain shrink-0 drop-shadow-[0_2px_8px_rgba(76,215,246,0.3)]"
              />
              <div className={`flex flex-col text-left ${isCollapsed ? 'lg:hidden' : ''}`}>
                <span className="font-bold text-[#dfe2ee] text-sm tracking-tight leading-tight">
                  GO SWIFT
                </span>
                <span className="font-semibold text-[#4cd7f6] text-[10px] tracking-wider leading-tight">
                  BAHAMAS PORTAL
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-[#89929b] hover:text-white hover:bg-[#262b35] transition-colors border-0 bg-transparent cursor-pointer"
              aria-label="Close sidebar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Desktop Expand Button when collapsed */}
          {isCollapsed && (
            <div className="hidden lg:flex justify-center w-full py-2 border-b border-[#1c2028]">
              <button
                type="button"
                onClick={() => setIsCollapsed(false)}
                className="flex items-center justify-center p-2 rounded-lg text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#262b35] transition-colors cursor-pointer border-0 bg-transparent"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Navigation Section Title */}
          <div className={`px-5 w-full pt-6 pb-2 ${isCollapsed ? 'lg:hidden' : ''}`}>
            <span className="text-[11px] font-bold text-[#89929b] uppercase tracking-wider">
              NAVIGATION
            </span>
          </div>
          {isCollapsed && (
            <div className="hidden lg:flex w-full py-3 justify-center">
              <div className="w-6 h-[1px] bg-[#262b35]" />
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex flex-col w-full gap-1 px-2.5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                title={item.label}
                className={`flex items-center rounded-lg cursor-pointer transition-all duration-150 no-underline ${
                  item.active
                    ? 'bg-[#3198dc] text-[#002c47] font-semibold shadow-md'
                    : 'text-[#bfc7d2] hover:bg-[#1c2028] hover:text-white'
                } ${isCollapsed ? 'lg:justify-center lg:p-2.5 gap-3 px-3.5 py-2.5' : 'gap-3 px-3.5 py-2.5'}`}
              >
                <item.Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className={`text-[13.5px] leading-5 truncate ${isCollapsed ? 'lg:hidden' : ''}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="flex flex-col items-start w-full p-2.5 border-t border-[#1c2028] bg-[#0a0e16]">
          <button
            onClick={handleLogout}
            title="Logout"
            className={`flex items-center rounded-lg w-full cursor-pointer border-0 bg-transparent text-[#bfc7d2] hover:bg-[#1c2028] hover:text-red-400 transition-colors ${
              isCollapsed ? 'lg:justify-center lg:p-2.5 gap-3 px-3.5 py-2.5' : 'gap-3 px-3.5 py-2.5'
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className={`text-[13.5px] font-semibold tracking-wide ${isCollapsed ? 'lg:hidden' : ''}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* ═══ TOP HEADER ════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 right-0 left-0 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-[#0a0e16]/85 backdrop-blur-md border-b border-[#1c2028] z-20 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'lg:left-[72px]' : 'lg:left-64'
        }`}
      >
        {/* Left Side: Mobile Menu Button & Desktop Quick Collapse */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className="flex lg:hidden p-2 rounded-lg text-[#dfe2ee] hover:bg-[#1c2028] transition-colors border-0 bg-transparent cursor-pointer"
            aria-label="Open navigation menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center gap-2 p-1.5 px-2.5 rounded-lg text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#1c2028] transition-colors border border-transparent hover:border-[#262b35] bg-transparent cursor-pointer text-xs"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            <span>{isCollapsed ? 'Expand' : 'Collapse'}</span>
          </button>
        </div>

        {/* Right Side: User profile badge */}
        <div className="flex items-center gap-2.5 bg-[#1c2028] border border-[#262b35] rounded-xl pl-3 sm:pl-4 pr-1.5 py-1.5 shadow-sm">
          <div className="flex flex-col items-end text-right">
            <span className="text-xs font-semibold text-[#dfe2ee] leading-tight">Admin Officer</span>
            <span className="text-[10px] font-medium text-[#89929b] tracking-wider leading-tight hidden sm:inline">
              {email}
            </span>
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#93ccff] text-[#002c47] font-bold shrink-0 shadow-inner">
            <UserRound className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
        </div>
      </header>

      {/* ═══ MAIN CONTENT AREA ═════════════════════════════════════════════ */}
      <main
        className={`flex-1 flex flex-col pt-16 min-h-screen transition-all duration-300 ease-in-out ${
          isCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
        }`}
      >
        <div className="flex flex-col gap-6 max-w-[1280px] w-full p-4 sm:p-6 lg:p-8 mx-auto">
          {/* ── Header Block with Bahamas Command Tone ──────────────────────── */}
          <div className="bg-[#181c24] border border-[#262b35] rounded-xl p-6 sm:p-7 relative overflow-hidden shadow-lg drop-shadow-sm">
            {/* Ambient Cyan Glow */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-[rgba(76,215,246,0.08)] blur-3xl rounded-full pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex flex-col gap-1 items-start text-left">
                <div className="flex items-center gap-2 text-left">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse" />
                  <span className="font-semibold text-[#4cd7f6] text-[11px] tracking-[1.1px] uppercase">
                    SECURITY & ACCESS MANAGEMENT
                  </span>
                </div>
                <h1 className="font-bold text-[#dfe2ee] text-2xl sm:text-3xl lg:text-4xl tracking-[-0.9px] m-0">
                  Admin Settings
                </h1>
                <p className="font-normal text-[#bfc7d2] text-sm leading-relaxed max-w-xl m-0">
                  Manage your personal administrator account details and security credentials.
                </p>
              </div>

              {/* Quick Session Badge / Micro-stat */}
              <div className="bg-[#0a0e16]/80 backdrop-blur-sm border border-[#262b35] flex items-center gap-3.5 p-2 rounded-xl shrink-0 self-start sm:self-auto shadow-inner">
                <div className="bg-[#262a33] flex items-center justify-center rounded-lg size-10 shrink-0">
                  <IdCard className="w-5 h-5 text-[#4cd7f6]" aria-hidden="true" />
                </div>
                <div className="flex flex-col items-start pr-2 text-left">
                  <span className="font-semibold text-[#89929b] text-[11px] tracking-[0.55px] uppercase">
                    ASSIGNED IDENTITY
                  </span>
                  <span className="font-medium text-[#dfe2ee] text-[13px] tracking-tight">
                    {fullName}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 2-Column Content Grid: Main Settings Cards ───────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start w-full">
            {/* ── CARD 1: Basic Account Information ──────────────────────────── */}
            <div className="bg-[#181c24] border border-[#262b35] rounded-xl p-6 sm:p-7 shadow-lg relative overflow-hidden flex flex-col text-left">
              {/* Gradient Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#03b5d3] via-[#93ccff] to-transparent opacity-60" />

              {/* Card Header */}
              <div className="flex items-center gap-3 pb-5 border-b border-[#262b35]">
                <div className="bg-[#262a33] flex items-center justify-center rounded-lg size-10 shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#4cd7f6]" aria-hidden="true" />
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="font-semibold text-[#dfe2ee] text-lg sm:text-xl tracking-tight m-0">
                    Administrator Account Information
                  </h2>
                  <p className="font-normal text-[#bfc7d2] text-xs sm:text-[13px] m-0">
                    Update your primary admin contact details.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveAccount} className="flex flex-col gap-4.5 pt-5">
                {/* Full Name Field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="fullNameInput" className="font-medium text-[#dfe2ee] text-xs tracking-wide">
                      Full Name
                    </label>
                    <span className="font-semibold text-[#89929b] text-[11px] tracking-wide">
                      Primary Lead
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 pointer-events-none">
                      <User className="w-4 h-4 opacity-80" aria-hidden="true" />
                    </div>
                    <input
                      id="fullNameInput"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="e.g. Devante Turnquest"
                      className="w-full h-11 bg-[#0a0e16] border border-[#262b35] focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6] rounded-lg pl-10 pr-4 text-sm text-[#dfe2ee] placeholder-[#89929b] outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Email Address Field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="emailInput" className="font-medium text-[#dfe2ee] text-xs tracking-wide">
                      Email Address
                    </label>
                    <span className="font-semibold text-[#4cd7f6] text-[11px] tracking-wide">
                      Operational Alert Channel
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 pointer-events-none">
                      <Mail className="w-4 h-4 opacity-80" aria-hidden="true" />
                    </div>
                    <input
                      id="emailInput"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="admin@goswiftbahamas.com"
                      className="w-full h-11 bg-[#0a0e16] border border-[#262b35] focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6] rounded-lg pl-10 pr-4 text-sm text-[#dfe2ee] placeholder-[#89929b] outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Phone Number Field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="phoneInput" className="font-medium text-[#dfe2ee] text-xs tracking-wide">
                      Phone Number
                    </label>
                    <span className="font-semibold text-[#89929b] text-[11px] tracking-wide">
                      Bahamas (+1 242)
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 pointer-events-none">
                      <Phone className="w-4 h-4 opacity-80" aria-hidden="true" />
                    </div>
                    <input
                      id="phoneInput"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (242) 397-2000"
                      className="w-full h-11 bg-[#0a0e16] border border-[#262b35] focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6] rounded-lg pl-10 pr-4 text-sm text-[#dfe2ee] placeholder-[#89929b] outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Status Note */}
                <div className="bg-[#0a0e16]/60 border border-[#262b35] flex items-start gap-2.5 p-2.5 rounded-lg mt-1">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 opacity-80 text-[#93ccff]" aria-hidden="true" />
                  <p className="font-normal text-[#bfc7d2] text-xs leading-relaxed m-0">
                    Changes take effect immediately across the GO SWIFT BAHAMAS Admin console.
                  </p>
                </div>

                {/* Save Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSavingAccount}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto h-11 px-6 rounded-lg bg-[#3198dc] hover:bg-[#43a4e5] text-[#002c47] font-semibold text-sm transition-all cursor-pointer border-0 shadow-md disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{isSavingAccount ? 'Saving...' : 'Save Account Details'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* ── CARD 2: Update Password ────────────────────────────────────── */}
            <div className="bg-[#181c24] border border-[#262b35] rounded-xl p-6 sm:p-7 shadow-lg relative overflow-hidden flex flex-col text-left">
              {/* Gradient Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#93ccff] via-[#4cd7f6] to-transparent opacity-60" />

              {/* Card Header */}
              <div className="flex items-center gap-3 pb-5 border-b border-[#262b35]">
                <div className="bg-[#262a33] flex items-center justify-center rounded-lg size-10 shrink-0">
                  <KeyRound className="w-5 h-5 text-[#4cd7f6]" aria-hidden="true" />
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="font-semibold text-[#dfe2ee] text-lg sm:text-xl tracking-tight m-0">
                    Update Password
                  </h2>
                  <p className="font-normal text-[#bfc7d2] text-xs sm:text-[13px] m-0">
                    Ensure your administrator password remains strong and secure.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4.5 pt-5">
                {/* Current Password Field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="currentPassInput" className="font-medium text-[#dfe2ee] text-xs tracking-wide">
                      Current Password
                    </label>
                    <span className="font-semibold text-[#89929b] text-[11px] tracking-wide">
                      Verification Required
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 pointer-events-none">
                      <Lock className="w-4 h-4 opacity-80" aria-hidden="true" />
                    </div>
                    <input
                      id="currentPassInput"
                      type={showCurrentPass ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      placeholder="Enter current password"
                      className="w-full h-11 bg-[#0a0e16] border border-[#262b35] focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6] rounded-lg pl-10 pr-10 text-sm text-[#dfe2ee] placeholder-[#89929b] outline-none transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 p-1 text-[#89929b] hover:text-[#dfe2ee] transition-colors border-0 bg-transparent cursor-pointer"
                      title={showCurrentPass ? 'Hide password' : 'Show password'}
                    >
                      <Eye className="w-4 h-4 opacity-70" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* New Password Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="newPassInput" className="font-medium text-[#dfe2ee] text-xs tracking-wide">
                    New Password
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 pointer-events-none">
                      <Lock className="w-4 h-4 opacity-80" aria-hidden="true" />
                    </div>
                    <input
                      id="newPassInput"
                      type={showNewPass ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      placeholder="Enter new strong password"
                      className="w-full h-11 bg-[#0a0e16] border border-[#262b35] focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6] rounded-lg pl-10 pr-10 text-sm text-[#dfe2ee] placeholder-[#89929b] outline-none transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 p-1 text-[#89929b] hover:text-[#dfe2ee] transition-colors border-0 bg-transparent cursor-pointer"
                      title={showNewPass ? 'Hide password' : 'Show password'}
                    >
                      <Eye className="w-4 h-4 opacity-70" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Confirm New Password Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirmPassInput" className="font-medium text-[#dfe2ee] text-xs tracking-wide">
                    Confirm New Password
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 pointer-events-none">
                      <Lock className="w-4 h-4 opacity-80" aria-hidden="true" />
                    </div>
                    <input
                      id="confirmPassInput"
                      type={showConfirmPass ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Re-type new password"
                      className="w-full h-11 bg-[#0a0e16] border border-[#262b35] focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6] rounded-lg pl-10 pr-10 text-sm text-[#dfe2ee] placeholder-[#89929b] outline-none transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 p-1 text-[#89929b] hover:text-[#dfe2ee] transition-colors border-0 bg-transparent cursor-pointer"
                      title={showConfirmPass ? 'Hide password' : 'Show password'}
                    >
                      <Eye className="w-4 h-4 opacity-70" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Requirement Hints */}
                <div className="bg-[#0a0e16]/60 border border-[#262b35] flex items-center gap-2.5 px-3 py-2 rounded-lg">
                  <Info className="w-3.5 h-3.5 shrink-0 opacity-80 text-[#93ccff]" aria-hidden="true" />
                  <span className="font-semibold text-[#bfc7d2] text-[11px] tracking-wide leading-tight">
                    Minimum 8 characters with at least one number and special character.
                  </span>
                </div>

                {/* Update Password Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto h-11 px-6 rounded-lg bg-[#3198dc] hover:bg-[#43a4e5] text-[#002c47] font-semibold text-sm transition-all cursor-pointer border-0 shadow-md disabled:opacity-50"
                  >
                    <KeyRound className="w-4 h-4" aria-hidden="true" />
                    <span>{isUpdatingPassword ? 'Updating...' : 'Update Password'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* ═══ TOAST NOTIFICATION CONTAINER ══════════════════════════════════ */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#262a33] border border-[#31353e] text-[#dfe2ee] text-xs sm:text-sm font-medium px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-slide-up">
          <div className="bg-[#03b5d3] flex items-center justify-center rounded-full size-6 shrink-0 shadow-md">
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
