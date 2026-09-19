import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// ── Asset URLs (Figma-sourced, valid for 7 days) ──────────────────────────
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
    initials: 'MR', initialsColor: '#93ccff',
    name: 'Marcus Rolle', email: 'marcus.rolle@swiftbahamas.bs',
    type: 'Driver', typeBg: 'rgba(147,204,255,0.1)', typeColor: '#93ccff',
    territory: 'Nassau /\nNew Providence',
    asset: '2024 Toyota Camry', assetSub: 'Public Service Badge Valid',
    age: '2 hours ago', ageColor: '#ffb95f',
  },
  {
    initials: 'IB', initialsColor: '#4cd7f6',
    name: 'Island Bites Café', email: 'ops@islandbitesbahamas.com',
    type: 'Food Vendor', typeBg: 'rgba(202,129,0,0.25)', typeColor: '#ffb95f',
    territory: 'Cable Beach,\nNassau',
    asset: 'Bahamian Cuisine', assetSub: 'Sanitary Certificate Verified',
    age: '4 hours ago', ageColor: '#ffb95f',
  },
  {
    initials: 'DS', initialsColor: '#93ccff',
    name: 'Derick Strachan', email: 'strachan.d@fastmail.bs',
    type: 'Courier', typeBg: 'rgba(147,204,255,0.1)', typeColor: '#93ccff',
    territory: 'Freeport,\nGrand Bahama',
    asset: 'Scooter Express', assetSub: 'Commercial Dispatch License',
    age: '6 hours ago', ageColor: '#ffb95f',
  },
  {
    initials: 'BD', initialsColor: '#4cd7f6',
    name: 'Bahama Drift Rentals', email: 'info@bahamadrift.com',
    type: 'Car Rental Provider', typeBg: 'rgba(76,215,246,0.1)', typeColor: '#4cd7f6',
    territory: 'Paradise Island',
    asset: 'Fleet: 12 Vehicles', assetSub: 'Full Comprehensive Insurance',
    age: '1 day ago', ageColor: '#bfc7d2',
  },
  {
    initials: 'CS', initialsColor: '#4cd7f6',
    name: 'Coral Sands Villa', email: 'bookings@coralsandsexuma.com',
    type: 'Property Owner', typeBg: 'rgba(76,215,246,0.1)', typeColor: '#4cd7f6',
    territory: 'Exuma Cays',
    asset: '3 Luxury Units', assetSub: 'Bahamas Ministry\nTourism Reg #884',
    age: '1 day ago', ageColor: '#bfc7d2',
  },
]

export default function Dashboard() {
  const auth = useAuth()
  const nav = useNavigate()

  function handleLogout() {
    auth.logout()
    nav('/')
  }

  return (
    <div
      className="relative flex flex-col items-start w-full min-h-screen"
      style={{ background: '#0f131c', paddingLeft: 256 }}
    >
      {/* ═══ SIDEBAR ═══════════════════════════════════════════════════════ */}
      <aside
        className="fixed left-0 top-0 flex flex-col justify-between items-start"
        style={{
          width: 256,
          height: '100vh',
          background: '#0a0e16',
          boxShadow: '1px 0 4px rgba(0,0,0,0.35)',
          zIndex: 20,
        }}
      >
        <div className="flex flex-col items-start w-full">
          {/* Brand */}
          <div
            className="flex gap-2 items-center px-6 w-full shrink-0"
            style={{ height: 64, background: 'rgba(24,28,36,0.4)' }}
          >
            <img src={imgLogo} alt="GoSwift logo" style={{ width: 53, height: 52, objectFit: 'cover' }} />
            <div className="flex flex-col" style={{ gap: 5 }}>
              <span style={{ display: 'block', fontSize: 16, lineHeight: '16px', fontWeight: 600, color: '#dfe2ee', letterSpacing: '-0.4px' }}>
                GO SWIFT
              </span>
              <span style={{ display: 'block', fontSize: 11, lineHeight: '13.75px', fontWeight: 600, color: '#4cd7f6', textTransform: 'uppercase', letterSpacing: '0.55px' }}>
                BAHAMASPORTAL
              </span>
            </div>
          </div>

          {/* Nav section label */}
          <div className="px-6 w-full" style={{ paddingTop: 31, paddingBottom: 7 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#89929b', textTransform: 'uppercase', letterSpacing: '0.55px' }}>
              NAVIGATION
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col w-full" style={{ gap: 4, padding: '0 8px' }}>
            {/* Dashboard — active */}
            <div
              className="flex gap-2 items-center rounded-lg w-full cursor-pointer"
              style={{ background: '#3198dc', padding: '8px 16px' }}
            >
              <img src={imgNavDashboard} alt="" style={{ width: 15, height: 15, flexShrink: 0 }} />
              <span style={{ fontSize: 14, lineHeight: '20px', color: '#002c47' }}>Dashboard</span>
            </div>
            {[
              { icon: imgNavUsers, label: 'User Management', w: 18.33, h: 13.33 },
              { icon: imgNavProviders, label: 'Provider Management', w: 18, h: 21 },
              { icon: imgNavSupport, label: 'Contact Support', w: 16.67, h: 15 },
              { icon: imgNavSettings, label: 'Settings', w: 16.75, h: 16.67 },
            ].map(({ icon, label, w, h }) => (
              <div
                key={label}
                className="flex gap-2 items-center rounded-lg w-full cursor-pointer"
                style={{ padding: '8px 16px', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1c2028')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <img src={icon} alt="" style={{ width: w, height: h, flexShrink: 0 }} />
                <span style={{ fontSize: 14, lineHeight: '20px', color: '#bfc7d2' }}>{label}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer logout */}
        <div className="flex flex-col items-start w-full" style={{ padding: 8 }}>
          <div className="flex flex-col items-start w-full" style={{ borderTop: '1px solid rgba(196,199,200,0.3)', paddingTop: 17, paddingBottom: 16, paddingLeft: 16, paddingRight: 16 }}>
            <button
              onClick={handleLogout}
              className="flex items-center rounded-lg w-full cursor-pointer border-0 bg-transparent"
              style={{ gap: 12, padding: '8px 12px', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1c2028')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <img src={imgNavLogout} alt="" style={{ width: 18, height: 18, flexShrink: 0 }} />
              <span style={{ fontSize: 14, lineHeight: '14px', fontWeight: 600, color: '#fff', letterSpacing: '0.28px' }}>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ═══ TOP HEADER ════════════════════════════════════════════════════ */}
      <header
        className="fixed top-0 right-0 flex items-center justify-end"
        style={{
          left: 256,
          height: 64,
          padding: '0 32px',
          background: 'rgba(10,14,22,0.9)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 1px 8px rgba(0,0,0,0.25)',
          zIndex: 10,
        }}
      >
        <div
          className="flex gap-2 items-center"
          style={{ background: '#1c2028', borderRadius: 12, paddingLeft: 16, paddingRight: 4, paddingTop: 4, paddingBottom: 4 }}
        >
          <div className="flex flex-col items-end">
            <span style={{ fontSize: 12, lineHeight: '15px', fontWeight: 600, color: '#dfe2ee', letterSpacing: '0.24px' }}>Admin Officer</span>
            <span style={{ fontSize: 11, lineHeight: '13.75px', fontWeight: 600, color: '#89929b', letterSpacing: '0.55px' }}>admin@goswiftbahamas.com</span>
          </div>
          <div
            className="flex items-center justify-center shrink-0"
            style={{ background: '#93ccff', borderRadius: 12, width: 32, height: 32 }}
          >
            <img src={imgIconUserAvatar} alt="" style={{ width: 12, height: 12 }} />
          </div>
        </div>
      </header>

      {/* ═══ MAIN CONTENT ══════════════════════════════════════════════════ */}
      <main className="flex flex-col items-start w-full" style={{ paddingTop: 64 }}>

        {/* Operational Header */}
        <div
          className="flex items-center justify-between w-full shrink-0"
          style={{ background: '#181c24', padding: '24px 32px' }}
        >
          <div className="flex flex-col items-start" style={{ gap: 4 }}>
            {/* Breadcrumb */}
            <div className="flex items-center" style={{ gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#93ccff', textTransform: 'uppercase', letterSpacing: '1.1px', lineHeight: '14px' }}>
                EXECUTIVE COMMAND CENTER
              </span>
              <span style={{ fontSize: 16, color: '#3f4850', lineHeight: '24px' }}>•</span>
              <div
                className="flex items-center"
                style={{ gap: 4, background: '#31353e', borderRadius: 12, padding: '2px 8px' }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4cd7f6', flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#bfc7d2', letterSpacing: '0.55px', lineHeight: '14px' }}>
                  NASSAU, BS 10:42 AM EDT
                </span>
              </div>
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#dfe2ee', letterSpacing: '-0.6px', lineHeight: '32px', margin: 0 }}>
              Welcome back, Admin Officer
            </h1>
            <p style={{ fontSize: 13, color: '#bfc7d2', lineHeight: '18px', margin: 0 }}>
              Review 5 pending operational verifications and address 3 urgent inbound support tickets.
            </p>
          </div>

          {/* Status badge */}
          <div
            className="flex items-center shrink-0"
            style={{ gap: 3.99, background: 'rgba(202,129,0,0.2)', borderRadius: 8, padding: '6px 12px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
          >
            <img src={imgIconPending} alt="" style={{ width: 11.67, height: 11.70, flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#ffb95f', letterSpacing: '0.55px', lineHeight: '14px' }}>
              5 Pending Registrations
            </span>
          </div>
        </div>

        {/* ── Metric Cards ─────────────────────────────────────────────────── */}
        <div
          className="w-full shrink-0"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(12,minmax(0,1fr))', gap: 24, padding: 32 }}
        >
          {/* Card 1: Pending Approvals */}
          <div
            className="flex flex-col justify-between overflow-hidden relative"
            style={{ gridColumn: 'span 4', background: '#181c24', borderRadius: 8, padding: 24, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -2px rgba(0,0,0,0.1)' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#ffb95f' }} />
            <div className="flex flex-col items-start w-full" style={{ gap: 16 }}>
              <div className="flex items-center justify-between w-full">
                <span style={{ fontSize: 11, fontWeight: 600, color: '#89929b', textTransform: 'uppercase', letterSpacing: '1.1px' }}>ACTION REQUISITION</span>
                <div style={{ background: 'rgba(202,129,0,0.3)', borderRadius: 12, padding: '2px 8px' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#ffb95f', letterSpacing: '0.55px' }}>Immediate</span>
                </div>
              </div>
              <div className="flex flex-col items-start w-full" style={{ gap: 4 }}>
                <div className="flex items-baseline" style={{ gap: 8 }}>
                  <span style={{ fontSize: 36, fontWeight: 700, color: '#dfe2ee', letterSpacing: '-0.9px', lineHeight: '44px' }}>5</span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#ffb95f', letterSpacing: '-0.16px', lineHeight: '24px' }}>Awaiting Review</span>
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: '#dfe2ee', letterSpacing: '-0.16px', lineHeight: '24px', margin: 0, width: '100%' }}>
                  Pending Provider Registrations
                </h2>
                <p style={{ fontSize: 13, color: '#bfc7d2', lineHeight: '18px', margin: 0 }}>
                  New drivers, fleet rentals, &amp; food venues<br />submitted KYC credentials requiring<br />approval.
                </p>
              </div>
            </div>
            <div style={{ paddingTop: 24, width: '100%' }}>
              <div style={{ paddingTop: 16, background: '#181c24' }}>
                <button
                  className="flex items-center justify-between w-full border-0 cursor-pointer rounded"
                  style={{ background: '#ca8100', padding: '8px 16px', filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))' }}
                >
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#3e2400', letterSpacing: '0.24px' }}>Review Approvals</span>
                  <img src={imgIconArrowGold} alt="" style={{ width: 10.67, height: 10.67 }} />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Registered Users */}
          <div
            className="flex flex-col justify-between relative"
            style={{ gridColumn: 'span 5', background: '#181c24', borderRadius: 8, padding: 24, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -2px rgba(0,0,0,0.1)' }}
          >
            <div className="flex flex-col items-start w-full" style={{ gap: 16 }}>
              <div className="flex items-center justify-between w-full">
                <span style={{ fontSize: 11, fontWeight: 600, color: '#89929b', textTransform: 'uppercase', letterSpacing: '1.1px' }}>VERIFIED DIRECTORY</span>
                <div style={{ background: '#31353e', borderRadius: 12, padding: '2px 8px' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#4cd7f6', letterSpacing: '0.55px' }}>6 Categories</span>
                </div>
              </div>
              <div className="flex flex-col items-start w-full" style={{ gap: 4 }}>
                <div className="flex items-baseline" style={{ gap: 8 }}>
                  <span style={{ fontSize: 36, fontWeight: 700, color: '#dfe2ee', letterSpacing: '-0.9px', lineHeight: '44px' }}>1,428</span>
                  <span style={{ fontSize: 13, color: '#bfc7d2', lineHeight: '18px' }}>Active Accounts</span>
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: '#dfe2ee', letterSpacing: '-0.16px', lineHeight: '24px', margin: 0, width: '100%' }}>
                  Total Registered Users
                </h2>
                {/* Category grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 4, paddingTop: 12, width: '100%' }}>
                  {[['Customers','1,120'],['Drivers','142'],['Food Vendors','56'],['Couriers','48'],['Car Rentals','28'],['Properties','34']].map(([label, val]) => (
                    <div key={label} style={{ background: '#31353e', borderRadius: 2, padding: '5px 8px 6px' }}>
                      <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#89929b', letterSpacing: '0.55px', lineHeight: '13.75px' }}>{label}</span>
                      <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#dfe2ee', letterSpacing: '0.13px', lineHeight: '18px' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ paddingTop: 24, width: '100%' }}>
              <div style={{ paddingTop: 16, background: '#181c24' }}>
                <button
                  className="flex items-center justify-between w-full border-0 cursor-pointer rounded"
                  style={{ background: '#262a33', padding: '8px 16px', filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))' }}
                >
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#dfe2ee', letterSpacing: '0.24px' }}>Manage User Directory</span>
                  <img src={imgIconArrowGray} alt="" style={{ width: 10.67, height: 10.67 }} />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Support Inquiries */}
          <div
            className="flex flex-col justify-between overflow-hidden relative"
            style={{ gridColumn: 'span 3', background: '#181c24', borderRadius: 8, padding: 24, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -2px rgba(0,0,0,0.1)' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#4cd7f6' }} />
            <div className="flex flex-col items-start w-full" style={{ gap: 16 }}>
              <div className="flex items-center justify-between w-full">
                <span style={{ fontSize: 11, fontWeight: 600, color: '#89929b', textTransform: 'uppercase', letterSpacing: '1.1px', lineHeight: '14px' }}>
                  RESOLUTION<br />QUEUE
                </span>
                <div style={{ background: 'rgba(76,215,246,0.15)', borderRadius: 12, padding: '2px 8px' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#4cd7f6', letterSpacing: '0.55px' }}>Open</span>
                </div>
              </div>
              <div className="flex flex-col items-start w-full" style={{ gap: 4 }}>
                <div className="flex items-baseline" style={{ gap: 8 }}>
                  <span style={{ fontSize: 36, fontWeight: 700, color: '#dfe2ee', letterSpacing: '-0.9px', lineHeight: '44px' }}>3</span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#4cd7f6', letterSpacing: '-0.16px', lineHeight: '24px' }}>New Tickets</span>
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: '#dfe2ee', letterSpacing: '-0.16px', lineHeight: '24px', margin: 0, width: '100%' }}>
                  Support Inquiries
                </h2>
                <p style={{ fontSize: 13, color: '#bfc7d2', lineHeight: '18px', margin: 0 }}>
                  Client &amp; vendor support<br />messages requiring<br />administrative triage.
                </p>
              </div>
            </div>
            <div style={{ paddingTop: 24, width: '100%' }}>
              <div style={{ paddingTop: 16, background: '#181c24' }}>
                <button
                  className="flex items-center justify-between w-full border-0 cursor-pointer rounded"
                  style={{ background: '#3198dc', padding: '8px 16px', filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))' }}
                >
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#002c47', letterSpacing: '0.24px' }}>View Inquiries</span>
                  <img src={imgIconArrowBlue} alt="" style={{ width: 10.67, height: 10.67 }} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── KYC Verification Table ──────────────────────────────────────── */}
        <section
          className="flex flex-col items-start w-full shrink-0"
          style={{ gap: 16, paddingBottom: 24, paddingLeft: 32, paddingRight: 32 }}
        >
          {/* Section header */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center" style={{ gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffb95f', flexShrink: 0 }} />
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#dfe2ee', letterSpacing: '-0.3px', lineHeight: '28px', margin: 0, whiteSpace: 'nowrap' }}>
                Priority Action: Pending Provider Registrations
              </h2>
              <div style={{ background: 'rgba(202,129,0,0.3)', borderRadius: 12, padding: '2px 8px', flexShrink: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#ffb95f', letterSpacing: '0.55px' }}>5 Pending Verification</span>
              </div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: '#89929b', textTransform: 'uppercase', letterSpacing: '0.55px', whiteSpace: 'nowrap' }}>
              KYC VERIFICATION QUEUE
            </span>
          </div>

          {/* Table */}
          <div
            className="flex flex-col items-start overflow-auto w-full"
            style={{ background: '#181c24', borderRadius: 8, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -4px rgba(0,0,0,0.1)' }}
          >
            {/* Header row */}
            <div className="flex items-start justify-center w-full" style={{ background: '#0a0e16' }}>
              {[
                { label: 'PROVIDER / BUSINESS ENTITY', w: 268, align: 'left' },
                { label: 'CLASSIFICATION', w: 142, align: 'left' },
                { label: 'TERRITORY &\nISLAND', w: 137, align: 'left' },
                { label: 'CORE ASSET /\nSPECIFICATION', w: 168, align: 'left' },
                { label: 'SUBMISSION\nAGE', w: 117, align: 'left' },
                { label: 'WORKFLOW\nACTION', w: 128, align: 'right' },
              ].map(({ label, w, align }) => (
                <div key={label} className="flex flex-col items-start shrink-0" style={{ width: w, padding: '8px 16px', textAlign: align as 'left' | 'right' }}>
                  <span
                    className="font-semibold text-[#89929b] uppercase whitespace-pre"
                    style={{ fontSize: 11, lineHeight: '14px', letterSpacing: '0.55px', width: '100%', textAlign: align as 'left' | 'right' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Data rows */}
            <div className="flex flex-col items-start w-full">
              {pendingRows.map((row, idx) => (
                <div
                  key={row.name}
                  className="flex items-center justify-center w-full"
                  style={{
                    paddingLeft: 16,
                    borderTop: idx === 0 ? 'none' : '1px solid #1c2028',
                    marginBottom: idx < pendingRows.length - 1 ? -1 : 0,
                  }}
                >
                  {/* Provider */}
                  <div className="flex items-center shrink-0" style={{ gap: 8, width: 236 }}>
                    <div className="flex items-center justify-center shrink-0" style={{ width: 32, height: 32, background: '#262a33', borderRadius: 4 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: row.initialsColor, letterSpacing: '-0.16px', lineHeight: '24px', textAlign: 'center' }}>
                        {row.initials}
                      </span>
                    </div>
                    <div className="flex flex-col items-start overflow-hidden">
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#dfe2ee', lineHeight: '20px', whiteSpace: 'nowrap' }}>{row.name}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#89929b', letterSpacing: '0.55px', lineHeight: '14px', whiteSpace: 'nowrap' }}>{row.email}</span>
                    </div>
                  </div>

                  {/* Classification */}
                  <div className="flex flex-col items-start shrink-0" style={{ width: 158, paddingLeft: 32, paddingRight: 16, paddingTop: 22, paddingBottom: 22 }}>
                    <div className="flex items-center shrink-0" style={{ background: row.typeBg, borderRadius: 12, padding: '2px 8px' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: row.typeColor, letterSpacing: '0.55px', lineHeight: '14px', whiteSpace: 'nowrap' }}>
                        {row.type}
                      </span>
                    </div>
                  </div>

                  {/* Territory */}
                  <div className="flex flex-col items-start shrink-0" style={{ width: 137, padding: '13px 16px' }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#bfc7d2', letterSpacing: '0.13px', lineHeight: '18px', whiteSpace: 'pre-wrap' }}>
                      {row.territory}
                    </span>
                  </div>

                  {/* Asset */}
                  <div className="flex flex-col items-start shrink-0" style={{ width: 168, padding: '8px 16px' }}>
                    <span style={{ fontSize: 13, color: '#dfe2ee', lineHeight: '18px', whiteSpace: 'nowrap' }}>{row.asset}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#89929b', letterSpacing: '0.55px', lineHeight: '14px', whiteSpace: 'pre-wrap', width: '100%' }}>
                      {row.assetSub}
                    </span>
                  </div>

                  {/* Age */}
                  <div className="flex flex-col items-start shrink-0" style={{ width: 117, padding: '22px 16px' }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: row.ageColor, letterSpacing: '0.13px', lineHeight: '18px', whiteSpace: 'nowrap' }}>
                      {row.age}
                    </span>
                  </div>

                  {/* Action */}
                  <div className="flex flex-col items-end shrink-0" style={{ width: 128, padding: '9px 16px' }}>
                    <button
                      className="flex items-center justify-center border-0 cursor-pointer"
                      style={{ background: '#93ccff', borderRadius: 2, padding: '6px 20.66px', filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))' }}
                    >
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#003351', letterSpacing: '0.24px', lineHeight: '16px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                        Review &amp;<br />Decide
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
