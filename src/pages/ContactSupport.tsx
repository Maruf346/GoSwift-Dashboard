import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// ── Asset URLs (Figma-sourced) ─────────────────────────────────────────────
const imgLogo = 'https://www.figma.com/api/mcp/asset/f31cb0bb-f4dd-44bc-8a1a-52663c79b6fc.png'
const imgPhone = 'https://www.figma.com/api/mcp/asset/d0748e19-db56-4b99-b4b4-fa4c037239fe.svg'
const imgPin = 'https://www.figma.com/api/mcp/asset/a8333193-a423-457e-a7dc-67419de5c069.svg'
const imgInspect = 'https://www.figma.com/api/mcp/asset/202d4a76-b974-4860-829b-2ce6c09f5c7b.svg'
const imgCheckmark = 'https://www.figma.com/api/mcp/asset/d6a9ad6d-be9c-4109-b7b5-057321d45c0b.svg'
const imgTerritoryPin = 'https://www.figma.com/api/mcp/asset/d87df22a-5868-49f2-bd4d-62fb62c4af5e.svg'
const imgClock = 'https://www.figma.com/api/mcp/asset/1f7b40e6-2a57-4cef-bfdd-f7d9a37fc7b0.svg'
const imgAvatar = 'https://www.figma.com/api/mcp/asset/6b82aff7-22fb-4ed7-9555-21ff1bddb189.svg'
const imgNavDashboard = 'https://www.figma.com/api/mcp/asset/f943a667-157e-4219-9705-28c24f1ec1dd.svg'
const imgNavUsers = 'https://www.figma.com/api/mcp/asset/f001819c-3f38-494f-9054-788191506cdf.svg'
const imgNavProviders = 'https://www.figma.com/api/mcp/asset/c5867c05-81f9-4fd3-9297-05e4adac551a.svg'
const imgNavSupport = 'https://www.figma.com/api/mcp/asset/30ab51f2-9f35-402b-91a0-bbb8a057d9da.svg'
const imgNavSettings = 'https://www.figma.com/api/mcp/asset/0784ba40-946a-4a4e-98fb-c6a795fd3e32.svg'
const imgNavLogout = 'https://www.figma.com/api/mcp/asset/f385369b-e955-4804-8b7c-178744f689ff.svg'

// ── Types & Support Inquiries Data ──────────────────────────────────────────
export type TicketStatus = 'Pending Review' | 'Reviewed'
export type UserRole = 'CUSTOMER' | 'FOOD VENDOR' | 'DRIVER' | 'COURIER' | 'PROPERTY OWNER'

export interface SupportTicket {
  id: string
  ticketCode: string
  name: string
  role: UserRole
  roleColor: string
  roleBg: string
  shortTime: string
  fullTimestamp: string
  subject: string
  phone: string
  region: string
  fullLocation: string
  email: string
  status: TicketStatus
  message: string
}

const initialTickets: SupportTicket[] = [
  {
    id: '1',
    ticketCode: 'ID: GSB-SUB-8941',
    name: 'Capt. Kenneth Pratt',
    role: 'CUSTOMER',
    roleColor: '#4cd7f6',
    roleBg: 'rgba(76,215,246,0.12)',
    shortTime: 'Today, 2:15 PM',
    fullTimestamp: 'Today, October 24, 2024 at 2:15 PM EDT',
    subject: 'Assistance updating Nassau delivery address',
    phone: '+1 242-555-3819',
    region: 'Nassau',
    fullLocation: 'Ocean Club Estates • Paradise Island / Nassau',
    email: 'kenneth.pratt@bahamasboating.com',
    status: 'Pending Review',
    message:
      'Good day GO SWIFT Admin team, I recently relocated from Sandyport to Ocean Club Estates on Paradise Island. My current profile seems to lock the default postal delivery drop off. Could you please advise or update my primary residential drop pin to Ocean Club Drive Lot 4? Thank you for the swift assistance.',
  },
  {
    id: '2',
    ticketCode: 'ID: GSB-SUB-8938',
    name: 'Island Grill House',
    role: 'FOOD VENDOR',
    roleColor: '#93ccff',
    roleBg: 'rgba(147,204,255,0.12)',
    shortTime: 'Today, 11:30 AM',
    fullTimestamp: 'Today, October 24, 2024 at 11:30 AM EDT',
    subject: 'Menu photo re-upload inquiry after kitchen revamp',
    phone: '+1 242-555-9012',
    region: 'Cable Beach',
    fullLocation: 'West Bay Street • Cable Beach / Nassau',
    email: 'manager@islandgrillhouse.bs',
    status: 'Pending Review',
    message:
      'Hello Admin, we just completed our kitchen and dining area renovation and have updated high-resolution images of our signature conch dishes. Our vendor portal seems to restrict batch image replacement exceeding 5MB each. Can support unlock batch asset uploading or assist in uploading our new menu package?',
  },
  {
    id: '3',
    ticketCode: 'ID: GSB-SUB-8935',
    name: 'Althea McCartney',
    role: 'DRIVER',
    roleColor: '#93ccff',
    roleBg: 'rgba(147,204,255,0.12)',
    shortTime: 'Today, 9:00 AM',
    fullTimestamp: 'Today, October 24, 2024 at 9:00 AM EDT',
    subject: 'Vehicle document update confirmation',
    phone: '+1 242-555-4421',
    region: 'Freeport',
    fullLocation: 'The Mall Drive • Freeport / Grand Bahama',
    email: 'althea.mccartney@grandbahamataxi.bs',
    status: 'Reviewed',
    message:
      'Good morning, I uploaded my renewed Bahamas Road Traffic vehicle inspection certificate and comprehensive insurance certificate yesterday. Please verify if the submission is clear and active on my driver dispatch profile.',
  },
  {
    id: '4',
    ticketCode: 'ID: GSB-SUB-8929',
    name: 'Devon Cartwright',
    role: 'COURIER',
    roleColor: '#93ccff',
    roleBg: 'rgba(147,204,255,0.12)',
    shortTime: 'Yesterday, 4:20 PM',
    fullTimestamp: 'Yesterday, October 23, 2024 at 4:20 PM EDT',
    subject: 'Inquiry on service territory expansion in Marsh Harbour',
    phone: '+1 242-555-7733',
    region: 'Abaco',
    fullLocation: 'Don MacKay Blvd • Marsh Harbour / Abaco',
    email: 'devon.c@abacocourier.bs',
    status: 'Pending Review',
    message:
      'Hello Swift Team, I am an active courier in Marsh Harbour and noticed increased delivery demand towards Treasure Cay. Are there plans to officially extend the route zone boundaries for couriers operating along the Great Abaco Highway?',
  },
  {
    id: '5',
    ticketCode: 'ID: GSB-SUB-8910',
    name: 'Blue Ocean Retreat',
    role: 'PROPERTY OWNER',
    roleColor: '#93ccff',
    roleBg: 'rgba(147,204,255,0.12)',
    shortTime: 'Oct 22, 2024',
    fullTimestamp: 'October 22, 2024 at 3:45 PM EDT',
    subject: 'Updating checkout instruction details for guests',
    phone: '+1 242-555-1288',
    region: 'Exuma',
    fullLocation: 'Queens Highway • George Town / Exuma',
    email: 'concierge@blueoceanexuma.com',
    status: 'Reviewed',
    message:
      'Greetings, We would like to add custom keyless entry instructions and boat slip docking guidance for incoming guest reservations automatically delivered via GoSwift notifications. Please let us know how we can enable this on our owner listing dashboard.',
  },
]

export default function ContactSupportSubmissions() {
  const auth = useAuth()
  const nav = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // State for tickets and selection
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets)
  const [selectedTicketId, setSelectedTicketId] = useState<string>('1')
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null)

  function handleLogout() {
    auth.logout()
    nav('/login')
  }

  // Selected ticket object
  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0]

  // Stats calculation
  const totalQueue = tickets.length
  const pendingCount = tickets.filter((t) => t.status === 'Pending Review').length
  const reviewedCount = tickets.filter((t) => t.status === 'Reviewed').length

  // Toggle ticket reviewed status
  function toggleTicketStatus(ticketId: string) {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const nextStatus: TicketStatus =
            t.status === 'Pending Review' ? 'Reviewed' : 'Pending Review'
          return { ...t, status: nextStatus }
        }
        return t
      })
    )
  }

  function handleCopyId(idText: string) {
    navigator.clipboard.writeText(idText)
    setCopiedNotification('ID copied to clipboard!')
    setTimeout(() => setCopiedNotification(null), 2500)
  }

  const navItems = [
    { icon: imgNavDashboard, label: 'Dashboard', path: '/', active: false },
    { icon: imgNavUsers, label: 'User Management', path: '/users', active: false },
    { icon: imgNavProviders, label: 'Provider Management', path: '/providers', active: false },
    { icon: imgNavSupport, label: 'Contact Support', path: '/support', active: true },
    { icon: imgNavSettings, label: 'Settings', path: '/settings', active: false },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#0f131c] text-[#dfe2ee] font-sans antialiased selection:bg-[#3198dc]/30 selection:text-white">
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
              admin@goswiftbahamas.com
            </span>
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#93ccff] text-[#002c47] font-bold shrink-0 shadow-inner">
            <img src={imgAvatar} alt="" className="w-3.5 h-3.5" />
          </div>
        </div>
      </header>

      {/* ═══ MAIN CONTENT AREA ═════════════════════════════════════════════ */}
      <main
        className={`flex-1 flex flex-col pt-16 min-h-screen transition-all duration-300 ease-in-out ${
          isCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
        }`}
      >
        <div className="flex flex-col gap-6 max-w-[1600px] w-full p-4 sm:p-6 lg:p-8 mx-auto">
          {/* Toast Notification */}
          {copiedNotification && (
            <div className="fixed top-20 right-6 bg-[#3198dc] text-[#002c47] text-xs font-bold px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce flex items-center gap-2">
              <img src={imgCheckmark} alt="" className="w-3 h-3 brightness-0" />
              <span>{copiedNotification}</span>
            </div>
          )}

          {/* ── Top Header Banner & Stats Mosaic ────────────────────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 w-full shrink-0">
            {/* Left Title & Breadcrumbs */}
            <div className="flex flex-col gap-1 items-start text-left">
              <div className="flex items-center gap-2 text-left">
                <span className="font-semibold text-[#4cd7f6] text-[11px] tracking-[1.1px] uppercase">
                  TRIAGE COMMAND
                </span>
                <span className="text-[#89929b] text-[10px]">•</span>
                <span className="font-medium text-[#89929b] text-[13px] tracking-[0.13px]">
                  Bahamas Dispatch Cluster
                </span>
              </div>
              <h1 className="font-bold text-[#dfe2ee] text-2xl sm:text-3xl lg:text-4xl tracking-[-0.9px] m-0">
                Contact Support Submissions
              </h1>
              <p className="font-normal text-[#bfc7d2] text-sm leading-relaxed max-w-2xl m-0">
                Review submitted inquiries and assistance requests from GO SWIFT BAHAMAS customers and service providers.
              </p>
            </div>

            {/* Quick Metrics Ribbon */}
            <div className="bg-[#181c24] border border-[#262b35] drop-shadow-sm flex items-center p-1.5 rounded-xl shrink-0 self-start lg:self-auto">
              {/* Total Queue */}
              <div className="flex flex-col items-start px-4 py-1 text-left">
                <span className="font-semibold text-[#89929b] text-[11px] tracking-[0.55px] uppercase">
                  TOTAL QUEUE
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-bold text-[#dfe2ee] text-xl tracking-tight">
                    {totalQueue}
                  </span>
                  <span className="text-xs font-medium text-[#89929b]">Inquiries</span>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="bg-[#31353e] h-8 w-[1px]" />

              {/* Unreviewed / Pending */}
              <div className="flex flex-col items-start px-4 py-1 text-left">
                <div className="flex items-center gap-1.5">
                  <div className="bg-[#ffb95f] rounded-full size-1.5 animate-pulse" />
                  <span className="font-semibold text-[#ffb95f] text-[11px] tracking-[0.55px] uppercase">
                    UNREVIEWED
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-bold text-[#ffb95f] text-xl tracking-tight">
                    {pendingCount}
                  </span>
                  <span className="text-xs font-medium text-[#ffb95f]/80">Pending</span>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="bg-[#31353e] h-8 w-[1px]" />

              {/* Reviewed Metric */}
              <div className="flex flex-col items-start px-4 py-1 text-left">
                <span className="font-semibold text-[#89929b] text-[11px] tracking-[0.55px] uppercase">
                  PROCESSED
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-bold text-[#dfe2ee] text-xl tracking-tight">
                    {reviewedCount}
                  </span>
                  <span className="text-xs font-medium text-[#89929b]">Resolved</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Master-Detail Inspection Grid ───────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
            {/* Left Column: Submissions List (Master Panel - 7 cols) */}
            <div className="lg:col-span-7 flex flex-col bg-[#181c24] border border-[#262b35] rounded-xl p-3 sm:p-4 shadow-lg drop-shadow-sm">
              {/* List Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-[#262b35] mb-3">
                <span className="font-semibold text-[#89929b] text-[11px] tracking-[0.55px] uppercase">
                  INCOMING COMMUNICATIONS
                </span>
                <span className="font-medium text-[#89929b] text-[13px] tracking-[0.13px]">
                  Showing {tickets.length} records
                </span>
              </div>

              {/* Ticket Cards List */}
              <div className="flex flex-col gap-2.5">
                {tickets.map((ticket) => {
                  const isSelected = ticket.id === selectedTicketId
                  const isPending = ticket.status === 'Pending Review'

                  return (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className={`group flex flex-col gap-2 p-3.5 sm:p-4 rounded-lg cursor-pointer transition-all duration-150 border text-left ${
                        isSelected
                          ? 'bg-[#31353e] border-[#4cd7f6]/50 shadow-md ring-1 ring-[#4cd7f6]/30'
                          : 'bg-[#1c2028] border-transparent hover:border-[#31353e] hover:bg-[#232832]'
                      }`}
                    >
                      {/* Top Row: Name, Tag, Timestamp */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <div
                            className={`rounded-full size-2 shrink-0 ${
                              isPending ? 'bg-[#ffb95f]' : 'bg-[#4cd7f6]'
                            }`}
                          />
                          <span className="font-semibold text-[#dfe2ee] text-base tracking-[-0.16px]">
                            {ticket.name}
                          </span>
                          <span
                            className="font-semibold text-[10.5px] tracking-wider uppercase px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: ticket.roleBg, color: ticket.roleColor }}
                          >
                            {ticket.role}
                          </span>
                        </div>
                        <span className="font-medium text-[#bfc7d2] text-[12.5px]">
                          {ticket.shortTime}
                        </span>
                      </div>

                      {/* Middle: Subject Line */}
                      <div className="w-full">
                        <p
                          className={`text-sm font-medium leading-snug line-clamp-1 m-0 ${
                            isSelected ? 'text-[#93ccff]' : 'text-[#bfc7d2] group-hover:text-[#dfe2ee]'
                          }`}
                        >
                          {ticket.subject}
                        </p>
                      </div>

                      {/* Bottom Row: Phone, Island Location, Status Badge */}
                      <div className="flex items-center justify-between gap-3 pt-1 flex-wrap text-xs">
                        <div className="flex items-center gap-4 text-[#89929b]">
                          <div className="flex items-center gap-1.5">
                            <img src={imgPhone} alt="" className="w-3 h-3 shrink-0 opacity-70" />
                            <span className="text-[12.5px] font-medium">{ticket.phone}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <img src={imgPin} alt="" className="w-2.5 h-3 shrink-0 opacity-70" />
                            <span className="text-[12.5px] font-medium">{ticket.region}</span>
                          </div>
                        </div>

                        {/* Status badge */}
                        <div className="ml-auto">
                          {isPending ? (
                            <span className="bg-[#ffb95f]/15 border border-[#ffb95f]/30 text-[#ffb95f] font-medium text-[11px] tracking-wide px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f]" />
                              Pending Review
                            </span>
                          ) : (
                            <span className="bg-[#262b35] border border-[#3f4850] text-[#bfc7d2] font-medium text-[11px] tracking-wide px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]" />
                              Reviewed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Column: Submitted Details View Panel (Detail Inspector - 5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4 sticky top-24">
              {/* 1. Action Header Box */}
              <div className="bg-[#181c24] border border-[#262b35] flex items-center justify-between p-4 rounded-xl shadow-lg drop-shadow-sm">
                <div className="flex items-center gap-2 text-left">
                  <img src={imgInspect} alt="" className="w-4 h-4 shrink-0" />
                  <span className="font-semibold text-[#dfe2ee] text-base tracking-tight">
                    Inspection Console
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTicketStatus(selectedTicket.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-semibold text-xs transition-all cursor-pointer border shadow-sm ${
                    selectedTicket.status === 'Pending Review'
                      ? 'bg-[#31353e] hover:bg-[#3f4850] text-[#dfe2ee] border-[#3f4850] hover:border-[#4cd7f6]/50'
                      : 'bg-[#ca8100]/20 hover:bg-[#ca8100]/30 text-[#ffb95f] border-[#ca8100]/40'
                  }`}
                >
                  <img src={imgCheckmark} alt="" className="w-3.5 h-3 shrink-0" />
                  <span>
                    {selectedTicket.status === 'Pending Review'
                      ? 'Mark as Reviewed'
                      : 'Reopen as Pending'}
                  </span>
                </button>
              </div>

              {/* 2. Sender Information Card */}
              <div className="bg-[#1c2028] border border-[#262b35] flex flex-col gap-4 p-5 sm:p-6 rounded-xl shadow-lg text-left">
                {/* Profile Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="font-semibold text-[#89929b] text-[11px] tracking-[0.55px] uppercase">
                      SENDER PROFILE
                    </span>
                    <h2 className="font-bold text-[#dfe2ee] text-xl tracking-tight m-0">
                      {selectedTicket.name}
                    </h2>
                  </div>
                  <span
                    className="font-semibold text-[11px] tracking-wider uppercase px-2.5 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: selectedTicket.roleBg,
                      color: selectedTicket.roleColor,
                      borderColor: `${selectedTicket.roleColor}33`,
                    }}
                  >
                    {selectedTicket.role}
                  </span>
                </div>

                {/* Contact Data Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Email */}
                  <div className="bg-[#0a0e16] border border-[#262b35] p-3 rounded-lg flex flex-col justify-center overflow-hidden">
                    <span className="font-semibold text-[#89929b] text-[10.5px] tracking-[0.55px] uppercase">
                      EMAIL ADDRESS
                    </span>
                    <a
                      href={`mailto:${selectedTicket.email}`}
                      className="font-medium text-[#93ccff] hover:text-[#4cd7f6] text-[13px] tracking-tight truncate mt-1 block no-underline transition-colors"
                      title={selectedTicket.email}
                    >
                      {selectedTicket.email}
                    </a>
                  </div>

                  {/* Phone */}
                  <div className="bg-[#0a0e16] border border-[#262b35] p-3 rounded-lg flex flex-col justify-center">
                    <span className="font-semibold text-[#89929b] text-[10.5px] tracking-[0.55px] uppercase">
                      PHONE
                    </span>
                    <a
                      href={`tel:${selectedTicket.phone}`}
                      className="font-medium text-[#dfe2ee] hover:text-[#4cd7f6] text-[13px] tracking-tight mt-1 block no-underline transition-colors"
                    >
                      {selectedTicket.phone}
                    </a>
                  </div>

                  {/* Operational Territory / Location */}
                  <div className="sm:col-span-2 bg-[#0a0e16] border border-[#262b35] p-3 rounded-lg flex flex-col justify-center">
                    <span className="font-semibold text-[#89929b] text-[10.5px] tracking-[0.55px] uppercase mb-1">
                      OPERATIONAL TERRITORY / LOCATION
                    </span>
                    <div className="flex items-center gap-2">
                      <img src={imgTerritoryPin} alt="" className="w-3.5 h-3.5 shrink-0 opacity-80" />
                      <span className="font-medium text-[#dfe2ee] text-[13px] tracking-tight">
                        {selectedTicket.fullLocation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Submission Content Card */}
              <div className="bg-[#1c2028] border border-[#262b35] flex flex-col gap-4 p-5 sm:p-6 rounded-xl shadow-lg text-left">
                {/* Submission Details Header */}
                <div className="flex flex-col gap-1.5">
                  <span className="font-semibold text-[#89929b] text-[11px] tracking-[0.55px] uppercase">
                    SUBMISSION DETAILS
                  </span>
                  <h3 className="font-semibold text-[#dfe2ee] text-base leading-snug m-0">
                    {selectedTicket.subject}
                  </h3>
                  <div className="flex items-center gap-2 text-[#89929b] text-xs mt-0.5">
                    <img src={imgClock} alt="" className="w-3 h-3 shrink-0 opacity-70" />
                    <span>{selectedTicket.fullTimestamp}</span>
                  </div>
                </div>

                {/* Message Text Block with elevated glass effect */}
                <div className="bg-[#0a0e16] border border-[#262b35] p-4 rounded-lg relative">
                  <p className="font-normal text-[#bfc7d2] text-[13.5px] leading-relaxed m-0 whitespace-pre-line">
                    {selectedTicket.message}
                  </p>
                </div>

                {/* Direct Operational Outbound Trigger & Actions */}
                <div className="flex items-center justify-between gap-3 pt-1 border-t border-[#262b35] flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#89929b] bg-[#0a0e16] px-2.5 py-1 rounded border border-[#262b35]">
                      {selectedTicket.ticketCode}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyId(selectedTicket.ticketCode)}
                      className="p-1 rounded text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#262b35] transition-colors border-0 bg-transparent cursor-pointer text-xs"
                      title="Copy Ticket ID"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>

                  <a
                    href={`mailto:${selectedTicket.email}?subject=RE: ${encodeURIComponent(
                      selectedTicket.subject
                    )} [${selectedTicket.ticketCode}]`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3198dc] hover:bg-[#43a4e5] text-[#002c47] font-semibold text-xs rounded-lg transition-colors cursor-pointer no-underline shadow-sm"
                  >
                    <span>Direct Reply</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
