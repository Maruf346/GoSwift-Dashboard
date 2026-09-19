import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// ── Asset URLs (Figma-sourced) ─────────────────────────────────────────────
const imgLogo = 'https://www.figma.com/api/mcp/asset/8afe33d4-aada-4a6f-8707-97376b976214.png'
const imgIconPending = 'https://www.figma.com/api/mcp/asset/399ad211-d391-49ab-a185-028b439ccb60.svg'
const imgIconArrowGold = 'https://www.figma.com/api/mcp/asset/f223fee5-f048-4591-bc9e-c05802de136c.svg'
const imgIconArrowGray = 'https://www.figma.com/api/mcp/asset/ea0e8726-f8a6-4f46-8b83-dccbb599534a.svg'
const imgIconArrowBlue = 'https://www.figma.com/api/mcp/asset/756b670c-9418-4b24-903a-ac1d4c3530c1.svg'
const imgIconUserAvatar = 'https://www.figma.com/api/mcp/asset/25d53667-fe7f-4343-a2a4-8984e687aef4.svg'
const imgNavDashboard = 'https://www.figma.com/api/mcp/asset/905f7971-4aac-4eaa-a3cf-5ad2dd45f256.svg'
const imgNavUsers = 'https://www.figma.com/api/mcp/asset/c6e6f244-68f5-4379-9db2-7f631428bb27.svg'
const imgNavProviders = 'https://www.figma.com/api/mcp/asset/cb324681-00ae-456c-ab70-40c92aeca876.svg'
const imgNavSupport = 'https://www.figma.com/api/mcp/asset/979a7ce8-dc7a-429d-aaef-c04a2f5d0e35.svg'
const imgNavSettings = 'https://www.figma.com/api/mcp/asset/9d2f8035-e64a-46ed-ba56-a2633e537811.svg'
const imgNavLogout = 'https://www.figma.com/api/mcp/asset/ded83df7-aac7-4288-b954-be451bb04c28.svg'

// ── KYC table rows data ───────────────────────────────────────────────────
const pendingRows = [
  {
    initials: 'MR',
    initialsColor: '#93ccff',
    name: 'Marcus Rolle',
    email: 'marcus.rolle@swiftbahamas.bs',
    type: 'Driver',
    typeBg: 'rgba(147,204,255,0.12)',
    typeColor: '#93ccff',
    territory: 'Nassau / New Providence',
    asset: '2024 Toyota Camry',
    assetSub: 'Public Service Badge Valid',
    age: '2 hours ago',
    ageColor: '#ffb95f',
  },
  {
    initials: 'IB',
    initialsColor: '#4cd7f6',
    name: 'Island Bites Café',
    email: 'ops@islandbitesbahamas.com',
    type: 'Food Vendor',
    typeBg: 'rgba(202,129,0,0.25)',
    typeColor: '#ffb95f',
    territory: 'Cable Beach, Nassau',
    asset: 'Bahamian Cuisine',
    assetSub: 'Sanitary Certificate Verified',
    age: '4 hours ago',
    ageColor: '#ffb95f',
  },
  {
    initials: 'DS',
    initialsColor: '#93ccff',
    name: 'Derick Strachan',
    email: 'strachan.d@fastmail.bs',
    type: 'Courier',
    typeBg: 'rgba(147,204,255,0.12)',
    typeColor: '#93ccff',
    territory: 'Freeport, Grand Bahama',
    asset: 'Scooter Express',
    assetSub: 'Commercial Dispatch License',
    age: '6 hours ago',
    ageColor: '#ffb95f',
  },
  {
    initials: 'BD',
    initialsColor: '#4cd7f6',
    name: 'Bahama Drift Rentals',
    email: 'info@bahamadrift.com',
    type: 'Car Rental Provider',
    typeBg: 'rgba(76,215,246,0.12)',
    typeColor: '#4cd7f6',
    territory: 'Paradise Island',
    asset: 'Fleet: 12 Vehicles',
    assetSub: 'Full Comprehensive Insurance',
    age: '1 day ago',
    ageColor: '#bfc7d2',
  },
  {
    initials: 'CS',
    initialsColor: '#4cd7f6',
    name: 'Coral Sands Villa',
    email: 'bookings@coralsandsexuma.com',
    type: 'Property Owner',
    typeBg: 'rgba(76,215,246,0.12)',
    typeColor: '#4cd7f6',
    territory: 'Exuma Cays',
    asset: '3 Luxury Units',
    assetSub: 'Bahamas Ministry Tourism Reg #884',
    age: '1 day ago',
    ageColor: '#bfc7d2',
  },
]

export default function Dashboard() {
  const auth = useAuth()
  const nav = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  function handleLogout() {
    auth.logout()
    nav('/login')
  }

  const navItems = [
    { icon: imgNavDashboard, label: 'Dashboard', path: '/', active: true },
    { icon: imgNavUsers, label: 'User Management', path: '/users', active: false },
    { icon: imgNavProviders, label: 'Provider Management', path: '/providers', active: false },
    { icon: imgNavSupport, label: 'Contact Support', path: '/support', active: false },
    { icon: imgNavSettings, label: 'Settings', path: '/settings', active: false },
  ]

  return (
    <div
      className={`relative flex flex-col items-start w-full min-h-screen bg-[#0f131c] text-[#dfe2ee] font-sans antialiased overflow-x-hidden transition-all duration-300 ease-in-out ${
        isCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
      }`}
    >
      {/* ═══ MOBILE BACKDROP OVERLAY ════════════════════════════════════════ */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* ═══ SIDEBAR ═══════════════════════════════════════════════════════ */}
      <aside
        className={`fixed left-0 top-0 h-screen flex flex-col justify-between bg-[#0a0e16] border-r border-[#1c2028] z-40 transition-all duration-300 ease-in-out shadow-2xl ${
          isCollapsed ? 'lg:w-[72px]' : 'lg:w-64'
        } ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col items-start w-full">
          {/* Brand Header & Collapse Icon */}
          <div className="flex items-center justify-between px-3.5 sm:px-4 w-full h-16 shrink-0 bg-[#181c24]/50 border-b border-[#1c2028]">
            <div className={`flex items-center gap-2.5 overflow-hidden ${isCollapsed ? 'lg:justify-center w-full' : ''}`}>
              <img
                src={imgLogo}
                alt="GoSwift"
                className="w-9 h-9 object-contain shrink-0 transition-transform hover:scale-105"
              />
              <div className={`flex flex-col transition-opacity duration-200 ${isCollapsed ? 'lg:hidden' : ''}`}>
                <span className="text-[15px] font-bold text-[#dfe2ee] tracking-tight leading-tight whitespace-nowrap">
                  GO SWIFT
                </span>
                <span className="text-[10px] font-bold text-[#4cd7f6] uppercase tracking-wider leading-tight whitespace-nowrap">
                  BAHAMAS PORTAL
                </span>
              </div>
            </div>

            {/* Desktop Collapse Toggle Button */}
            {!isCollapsed && (
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                className="hidden lg:flex items-center justify-center p-1.5 rounded-lg text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#262b35] transition-colors cursor-pointer border-0 bg-transparent"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="flex lg:hidden items-center justify-center p-1.5 rounded-lg text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#262b35] transition-colors cursor-pointer border-0 bg-transparent"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Collapsed Expand Toggle Bar (Visible when collapsed on desktop) */}
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
              Navigation
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
                <img
                  src={item.icon}
                  alt=""
                  className={`w-4 h-4 shrink-0 ${item.active ? 'brightness-0' : ''}`}
                />
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
            <img src={imgNavLogout} alt="" className="w-4 h-4 shrink-0" />
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
          {/* Mobile hamburger menu button */}
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

          {/* Desktop Toggle Button */}
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
              admin@goswiftbahamas.com
            </span>
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#93ccff] text-[#002c47] font-bold shrink-0 shadow-inner">
            <img src={imgIconUserAvatar} alt="" className="w-3.5 h-3.5" />
          </div>
        </div>
      </header>

      {/* ═══ MAIN CONTENT ══════════════════════════════════════════════════ */}
      <main className="flex flex-col items-start w-full pt-16 min-h-screen">
        {/* Operational Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full bg-[#181c24] border-b border-[#1c2028] px-4 sm:px-6 lg:px-8 py-5 sm:py-6 shrink-0">
          <div className="flex flex-col items-start gap-1">
            {/* Breadcrumb & Live System Status */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10.5px] font-bold text-[#93ccff] uppercase tracking-widest">
                EXECUTIVE COMMAND CENTER
              </span>
              <span className="text-[#3f4850] text-sm">•</span>
              <div className="flex items-center gap-1.5 bg-[#31353e] rounded-full px-2.5 py-0.5 border border-[#3f4850]/40">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse" />
                <span className="text-[10.5px] font-semibold text-[#bfc7d2] tracking-wider">
                  NASSAU, BS 10:42 AM EDT
                </span>
              </div>
            </div>

            {/* Welcome Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-[#dfe2ee] tracking-tight m-0 text-left">
              Welcome back, Admin Officer
            </h1>
            <p className="text-xs sm:text-sm text-[#bfc7d2] m-0 text-left">
              Review 5 pending operational verifications and address 3 urgent inbound support tickets.
            </p>
          </div>

          {/* Pending status badge */}
          <div className="flex items-center self-start sm:self-center gap-2 bg-[#ca8100]/20 border border-[#ca8100]/30 rounded-lg px-3 py-1.5 shrink-0 shadow-sm">
            <img src={imgIconPending} alt="" className="w-3.5 h-3.5 shrink-0" />
            <span className="text-xs font-semibold text-[#ffb95f] tracking-wide">
              5 Pending Registrations
            </span>
          </div>
        </div>

        {/* ── Metric Cards Grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-5 w-full p-4 sm:p-6 lg:p-8">
          
          {/* Card 1: Action Requisition */}
          <div className="xl:col-span-4 flex flex-col justify-between relative bg-[#181c24] border border-[#262b35] rounded-xl p-5 sm:p-6 shadow-lg overflow-hidden group hover:border-[#ffb95f]/40 transition-all">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#ffb95f]" />
            <div className="flex flex-col items-start w-full gap-4 text-left">
              <div className="flex items-center justify-between w-full">
                <span className="text-[10.5px] font-bold text-[#89929b] uppercase tracking-widest">
                  ACTION REQUISITION
                </span>
                <span className="bg-[#ca8100]/20 border border-[#ca8100]/30 text-[#ffb95f] text-[10.5px] font-bold px-2 py-0.5 rounded-full">
                  Immediate
                </span>
              </div>
              <div className="flex flex-col items-start w-full gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#dfe2ee] tracking-tight">5</span>
                  <span className="text-sm font-semibold text-[#ffb95f]">Awaiting Review</span>
                </div>
                <h2 className="text-base font-semibold text-[#dfe2ee] m-0">
                  Pending Provider Registrations
                </h2>
                <p className="text-xs sm:text-[13px] text-[#bfc7d2] leading-relaxed m-0">
                  New drivers, fleet rentals, &amp; food venues submitted KYC credentials requiring approval.
                </p>
              </div>
            </div>

            <div className="pt-6 w-full">
              <button
                type="button"
                onClick={() => nav('/providers')}
                className="flex items-center justify-between w-full rounded-lg bg-[#ca8100] hover:bg-[#e09100] text-[#3e2400] font-bold text-xs px-4 py-2.5 transition-colors cursor-pointer border-0 shadow-md"
              >
                <span>Review Approvals</span>
                <img src={imgIconArrowGold} alt="" className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 2: Verified Directory */}
          <div className="md:col-span-2 xl:col-span-5 flex flex-col justify-between relative bg-[#181c24] border border-[#262b35] rounded-xl p-5 sm:p-6 shadow-lg hover:border-[#4cd7f6]/40 transition-all">
            <div className="flex flex-col items-start w-full gap-4 text-left">
              <div className="flex items-center justify-between w-full">
                <span className="text-[10.5px] font-bold text-[#89929b] uppercase tracking-widest">
                  VERIFIED DIRECTORY
                </span>
                <span className="bg-[#31353e] text-[#4cd7f6] border border-[#4cd7f6]/20 text-[10.5px] font-bold px-2 py-0.5 rounded-full">
                  6 Categories
                </span>
              </div>
              <div className="flex flex-col items-start w-full gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#dfe2ee] tracking-tight">1,428</span>
                  <span className="text-xs text-[#bfc7d2]">Active Accounts</span>
                </div>
                <h2 className="text-base font-semibold text-[#dfe2ee] m-0">
                  Total Registered Users
                </h2>

                {/* 6 Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 w-full">
                  {[
                    ['Customers', '1,120'],
                    ['Drivers', '142'],
                    ['Food Vendors', '56'],
                    ['Couriers', '48'],
                    ['Car Rentals', '28'],
                    ['Properties', '34'],
                  ].map(([label, val]) => (
                    <div key={label} className="bg-[#262b35]/70 border border-[#31353e] rounded-md p-2 text-left">
                      <span className="block text-[10.5px] font-semibold text-[#89929b] tracking-wider truncate">
                        {label}
                      </span>
                      <span className="block text-xs sm:text-sm font-bold text-[#dfe2ee] tracking-wide">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 w-full">
              <button
                type="button"
                onClick={() => nav('/users')}
                className="flex items-center justify-between w-full rounded-lg bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] font-semibold text-xs px-4 py-2.5 transition-colors cursor-pointer border border-[#31353e] shadow-md"
              >
                <span>Manage User Directory</span>
                <img src={imgIconArrowGray} alt="" className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 3: Resolution Queue */}
          <div className="md:col-span-2 xl:col-span-3 flex flex-col justify-between relative bg-[#181c24] border border-[#262b35] rounded-xl p-5 sm:p-6 shadow-lg overflow-hidden group hover:border-[#4cd7f6]/40 transition-all">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#4cd7f6]" />
            <div className="flex flex-col items-start w-full gap-4 text-left">
              <div className="flex items-center justify-between w-full">
                <span className="text-[10.5px] font-bold text-[#89929b] uppercase tracking-widest">
                  RESOLUTION QUEUE
                </span>
                <span className="bg-[#4cd7f6]/15 border border-[#4cd7f6]/30 text-[#4cd7f6] text-[10.5px] font-bold px-2 py-0.5 rounded-full">
                  Open
                </span>
              </div>
              <div className="flex flex-col items-start w-full gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#dfe2ee] tracking-tight">3</span>
                  <span className="text-sm font-semibold text-[#4cd7f6]">New Tickets</span>
                </div>
                <h2 className="text-base font-semibold text-[#dfe2ee] m-0">
                  Support Inquiries
                </h2>
                <p className="text-xs sm:text-[13px] text-[#bfc7d2] leading-relaxed m-0">
                  Client &amp; vendor support messages requiring administrative triage.
                </p>
              </div>
            </div>

            <div className="pt-6 w-full">
              <button
                type="button"
                className="flex items-center justify-between w-full rounded-lg bg-[#3198dc] hover:bg-[#43a4e5] text-[#002c47] font-bold text-xs px-4 py-2.5 transition-colors cursor-pointer border-0 shadow-md"
              >
                <span>View Inquiries</span>
                <img src={imgIconArrowBlue} alt="" className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Priority Action: Pending Provider Registrations Section ────── */}
        <section className="flex flex-col items-start w-full pb-10 px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full mb-4">
            <div className="flex flex-wrap items-center gap-2.5 text-left">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffb95f] shrink-0 shadow-[0_0_8px_rgba(255,185,95,0.6)]" />
              <h2 className="text-base sm:text-lg font-bold text-[#dfe2ee] tracking-tight m-0">
                Priority Action: Pending Provider Registrations
              </h2>
              <div className="bg-[#ca8100]/20 border border-[#ca8100]/30 rounded-full px-2.5 py-0.5 shrink-0">
                <span className="text-[10.5px] font-bold text-[#ffb95f] tracking-wide">
                  5 Pending Verification
                </span>
              </div>
            </div>
            <span className="text-[10.5px] font-bold text-[#89929b] uppercase tracking-widest text-left sm:text-right">
              KYC VERIFICATION QUEUE
            </span>
          </div>

          {/* Full-width Responsive Table Container */}
          <div className="w-full bg-[#181c24] border border-[#262b35] rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[920px] border-collapse text-left">
                {/* Table Header */}
                <thead className="bg-[#0a0e16] border-b border-[#262b35]">
                  <tr>
                    <th scope="col" className="py-3.5 px-6 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider w-[28%]">
                      PROVIDER / BUSINESS ENTITY
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider w-[16%]">
                      CLASSIFICATION
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider w-[16%]">
                      TERRITORY &amp; ISLAND
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider w-[20%]">
                      CORE ASSET / SPECIFICATION
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider w-[10%]">
                      SUBMISSION AGE
                    </th>
                    <th scope="col" className="py-3.5 px-6 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider text-right w-[10%]">
                      WORKFLOW ACTION
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-[#222834]">
                  {pendingRows.map((row) => (
                    <tr
                      key={row.name}
                      className="hover:bg-[#1f242e]/70 transition-colors duration-150"
                    >
                      {/* Provider Entity & Avatar */}
                      <td className="py-4 px-6 align-middle">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex items-center justify-center w-9 h-9 rounded-md bg-[#262a33] shrink-0 border border-[#31353e] shadow-sm"
                          >
                            <span
                              className="text-sm font-bold tracking-tight"
                              style={{ color: row.initialsColor }}
                            >
                              {row.initials}
                            </span>
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-sm font-semibold text-[#dfe2ee] leading-tight">
                              {row.name}
                            </span>
                            <span className="text-[11px] font-medium text-[#89929b] leading-tight mt-0.5">
                              {row.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Classification Pill */}
                      <td className="py-4 px-4 align-middle">
                        <span
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide"
                          style={{
                            backgroundColor: row.typeBg,
                            color: row.typeColor,
                            border: `1px solid ${row.typeColor}30`,
                          }}
                        >
                          {row.type}
                        </span>
                      </td>

                      {/* Territory */}
                      <td className="py-4 px-4 align-middle">
                        <span className="text-xs sm:text-[13px] font-medium text-[#bfc7d2] leading-snug">
                          {row.territory}
                        </span>
                      </td>

                      {/* Asset & Sub-tag */}
                      <td className="py-4 px-4 align-middle">
                        <div className="flex flex-col text-left">
                          <span className="text-xs sm:text-[13px] font-semibold text-[#dfe2ee] leading-snug">
                            {row.asset}
                          </span>
                          <span className="text-[11px] text-[#89929b] leading-snug mt-0.5">
                            {row.assetSub}
                          </span>
                        </div>
                      </td>

                      {/* Submission Age */}
                      <td className="py-4 px-4 align-middle">
                        <span
                          className="text-xs font-semibold"
                          style={{ color: row.ageColor }}
                        >
                          {row.age}
                        </span>
                      </td>

                      {/* Action Button */}
                      <td className="py-4 px-6 align-middle text-right">
                        <button
                          type="button"
                          onClick={() => nav('/providers')}
                          className="inline-flex items-center justify-center px-3.5 py-1.5 rounded bg-[#93ccff] hover:bg-[#b0dcff] text-[#003351] font-bold text-xs tracking-wide transition-colors cursor-pointer border-0 shadow-sm"
                        >
                          Review &amp; Decide
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
