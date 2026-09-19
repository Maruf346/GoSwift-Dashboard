import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// ── Asset URLs (Figma-sourced) ─────────────────────────────────────────────
const imgAvatar1 = 'https://www.figma.com/api/mcp/asset/dac17cf5-a03c-48ae-9ca7-dd6e0fe1d2e1.png'
const imgAvatar2 = 'https://www.figma.com/api/mcp/asset/81afa7b5-2fd1-462a-8d54-dab436515e7b.png'
const imgAvatar3 = 'https://www.figma.com/api/mcp/asset/886b7006-3a8e-461c-a0fc-f81f07e446d8.png'
const imgAvatar4 = 'https://www.figma.com/api/mcp/asset/dabb2025-b170-478d-a90b-f70c33843935.png'
const imgLogo = 'https://www.figma.com/api/mcp/asset/3d4b3337-7f15-4d35-85e8-14f6d98598b3.png'
const imgIconSearch = 'https://www.figma.com/api/mcp/asset/b30ccf05-b3a1-4ee3-bbbb-d9c6023c1e73.svg'
const imgCatDriver = 'https://www.figma.com/api/mcp/asset/d7713a7a-a789-4156-afc8-da75491c5f00.svg'
const imgIconPin = 'https://www.figma.com/api/mcp/asset/701593bb-41a0-408b-bf21-bb9d113a0f6b.svg'
const imgCatVendor = 'https://www.figma.com/api/mcp/asset/a2e714d4-30d7-4b1b-8e97-1180ba13ee80.svg'
const imgCatCourier = 'https://www.figma.com/api/mcp/asset/4e66d714-9652-467a-a2b2-939fe6fa9af1.svg'
const imgCatRental = 'https://www.figma.com/api/mcp/asset/4a7f8f7b-4ecc-46aa-97ff-8733744fbd5f.svg'
const imgCatProperty = 'https://www.figma.com/api/mcp/asset/9e442b7a-9f5d-4a5b-86ea-81702ac7de6c.svg'
const imgPagPrev = 'https://www.figma.com/api/mcp/asset/00073a0b-28e0-4ca5-8d00-25586d412a47.svg'
const imgPagNext = 'https://www.figma.com/api/mcp/asset/f0affb0c-2075-4609-a756-f80852e2ffed.svg'
const imgIconAvatar = 'https://www.figma.com/api/mcp/asset/151e2f63-5e75-4360-9782-a9bacacde4eb.svg'
const imgNavDashboard = 'https://www.figma.com/api/mcp/asset/ab71d768-6977-403e-a9c9-3d1b442d4460.svg'
const imgNavUsers = 'https://www.figma.com/api/mcp/asset/4a5230f6-5d87-4f7d-b2d6-d51334cd5427.svg'
const imgNavProviders = 'https://www.figma.com/api/mcp/asset/7d37b528-88b2-4425-8aa4-46a6c1033bce.svg'
const imgNavSupport = 'https://www.figma.com/api/mcp/asset/779dbc22-62f5-4365-9ff9-179b4e0970e9.svg'
const imgNavSettings = 'https://www.figma.com/api/mcp/asset/c12df44c-04d7-428c-b8c9-1c0096750612.svg'
const imgNavLogout = 'https://www.figma.com/api/mcp/asset/073b8ddc-b8ae-4ada-a0da-b44090b244ff.svg'

// ── Types & Provider Data ──────────────────────────────────────────────────
export type ProviderStatus = 'Pending' | 'Approved' | 'Rejected'
export type ProviderCategory = 'Driver' | 'Food Vendor' | 'Courier' | 'Car Rental Provider' | 'Property Owner'

export interface ProviderItem {
  id: string
  name: string
  providerId: string
  avatarImage?: string
  avatarInitials?: string
  avatarBg?: string
  avatarColor?: string
  hasPendingBadge?: boolean
  category: ProviderCategory
  categoryIcon: string
  phone: string
  email: string
  hub: string
  status: ProviderStatus
  documentName?: string
  documentStatus?: string
  submittedDate?: string
}

const providerRecords: ProviderItem[] = [
  {
    id: '1',
    name: 'Marcus Rolle',
    providerId: 'ID: SWIFT-DRV-8921',
    avatarImage: imgAvatar1,
    hasPendingBadge: true,
    category: 'Driver',
    categoryIcon: imgCatDriver,
    phone: '+1 (242) 555-0192',
    email: 'm.rolle@bahamasnet.bs',
    hub: 'Nassau',
    status: 'Pending',
    documentName: 'Public Service Driver License & Police Record',
    documentStatus: 'KYC Verification Required',
    submittedDate: '2 hours ago',
  },
  {
    id: '2',
    name: 'Twin Brothers Arawak Seafood',
    providerId: 'ID: SWIFT-VEN-4109',
    avatarImage: imgAvatar2,
    category: 'Food Vendor',
    categoryIcon: imgCatVendor,
    phone: '+1 (242) 328-5600',
    email: 'orders@twinbrothersbahamas.com',
    hub: 'Nassau',
    status: 'Approved',
    documentName: 'Bahamas Sanitary & Food Safety Certificate',
    documentStatus: 'Verified by Ministry of Health',
    submittedDate: 'Nov 02, 2024',
  },
  {
    id: '3',
    name: 'Devon Bethel',
    providerId: 'ID: SWIFT-CUR-1029',
    avatarInitials: 'DB',
    avatarBg: '#31353e',
    avatarColor: '#4cd7f6',
    hasPendingBadge: true,
    category: 'Courier',
    categoryIcon: imgCatCourier,
    phone: '+1 (242) 555-9018',
    email: 'd.bethel@gblogistics.com',
    hub: 'Grand Bahama',
    status: 'Pending',
    documentName: 'Commercial Motorbike Dispatch Authorization',
    documentStatus: 'KYC Verification Required',
    submittedDate: '6 hours ago',
  },
  {
    id: '4',
    name: 'Reef Rentals Marsh Harbour',
    providerId: 'ID: SWIFT-RNT-0082',
    avatarInitials: 'RC',
    avatarBg: '#31353e',
    avatarColor: '#89929b',
    category: 'Car Rental Provider',
    categoryIcon: imgCatRental,
    phone: '+1 (242) 367-2890',
    email: 'fleet@abacoreefrentals.bs',
    hub: 'Abaco',
    status: 'Rejected',
    documentName: 'Commercial Fleet Insurance (Expired Policy)',
    documentStatus: 'Insurance Policy Non-Compliant',
    submittedDate: 'Oct 14, 2024',
  },
  {
    id: '5',
    name: 'Tar Bay Villa Estates',
    providerId: 'ID: SWIFT-PROP-7193',
    avatarImage: imgAvatar3,
    category: 'Property Owner',
    categoryIcon: imgCatProperty,
    phone: '+1 (242) 336-2241',
    email: 'concierge@tarbayvillas.com',
    hub: 'Exuma',
    status: 'Approved',
    documentName: 'Bahamas Ministry Tourism Reg #7193',
    documentStatus: 'Official Tourism Board Approved',
    submittedDate: 'Oct 20, 2024',
  },
  {
    id: '6',
    name: 'Kendra Christie',
    providerId: 'ID: SWIFT-DRV-5512',
    avatarImage: imgAvatar4,
    category: 'Driver',
    categoryIcon: imgCatDriver,
    phone: '+1 (242) 555-8831',
    email: 'k.christie@eleutherataxi.bs',
    hub: 'Eleuthera',
    status: 'Approved',
    documentName: 'Public Service License & Vehicle Registration',
    documentStatus: 'Verified',
    submittedDate: 'Sep 29, 2024',
  },
  {
    id: '7',
    name: 'Island Bites Café',
    providerId: 'ID: SWIFT-VEN-8821',
    avatarInitials: 'IB',
    avatarBg: 'rgba(202,129,0,0.3)',
    avatarColor: '#ffb95f',
    hasPendingBadge: true,
    category: 'Food Vendor',
    categoryIcon: imgCatVendor,
    phone: '+1 (242) 393-2483',
    email: 'ops@islandbitesbahamas.com',
    hub: 'Nassau',
    status: 'Pending',
    documentName: 'Bahamian Cuisine Health Certification',
    documentStatus: 'KYC Verification Required',
    submittedDate: '4 hours ago',
  },
  {
    id: '8',
    name: 'Bahama Drift Rentals',
    providerId: 'ID: SWIFT-RNT-4401',
    avatarInitials: 'BD',
    avatarBg: 'rgba(76,215,246,0.2)',
    avatarColor: '#4cd7f6',
    hasPendingBadge: true,
    category: 'Car Rental Provider',
    categoryIcon: imgCatRental,
    phone: '+1 (242) 363-1188',
    email: 'info@bahamadrift.com',
    hub: 'Nassau',
    status: 'Pending',
    documentName: 'Fleet Registration (12 Vehicles) & Full Insurance',
    documentStatus: 'KYC Verification Required',
    submittedDate: '1 day ago',
  },
  {
    id: '9',
    name: 'Coral Sands Villa',
    providerId: 'ID: SWIFT-PROP-0914',
    avatarInitials: 'CS',
    avatarBg: 'rgba(255,221,184,0.2)',
    avatarColor: '#ffddb8',
    hasPendingBadge: true,
    category: 'Property Owner',
    categoryIcon: imgCatProperty,
    phone: '+1 (242) 336-2009',
    email: 'bookings@coralsandsexuma.com',
    hub: 'Exuma',
    status: 'Pending',
    documentName: 'Bahamas Ministry Tourism Reg #884',
    documentStatus: 'KYC Verification Required',
    submittedDate: '1 day ago',
  },
  {
    id: '10',
    name: 'Lucaya Express Couriers',
    providerId: 'ID: SWIFT-CUR-7712',
    avatarInitials: 'LE',
    avatarBg: '#31353e',
    avatarColor: '#dfe2ee',
    category: 'Courier',
    categoryIcon: imgCatCourier,
    phone: '+1 (242) 352-9901',
    email: 'dispatch@lucayaexpress.bs',
    hub: 'Grand Bahama',
    status: 'Approved',
    documentName: 'Grand Bahama Port Authority Dispatch License',
    documentStatus: 'Verified',
    submittedDate: 'Aug 11, 2024',
  },
]

export default function ProviderManagement() {
  const auth = useAuth()
  const nav = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Filters state
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedRegion, setSelectedRegion] = useState<string>('All')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Modal inspection state
  const [activeModalProvider, setActiveModalProvider] = useState<ProviderItem | null>(null)

  function handleLogout() {
    auth.logout()
    nav('/login')
  }

  const navItems = [
    { icon: imgNavDashboard, label: 'Dashboard', path: '/', active: false },
    { icon: imgNavUsers, label: 'User Management', path: '/users', active: false },
    { icon: imgNavProviders, label: 'Provider Management', path: '/providers', active: true },
    { icon: imgNavSupport, label: 'Contact Support', path: '/support', active: false },
    { icon: imgNavSettings, label: 'Settings', path: '/settings', active: false },
  ]

  const categories = [
    { id: 'All', label: 'All Users' },
    { id: 'Driver', label: 'Drivers (142)' },
    { id: 'Food Vendor', label: 'Food Vendors (56)' },
    { id: 'Courier', label: 'Couriers (48)' },
    { id: 'Car Rental Provider', label: 'Car Rental Providers (28)' },
    { id: 'Property Owner', label: 'Property Owners (34)' },
  ]

  // Filtered providers
  const filteredProviders = useMemo(() => {
    return providerRecords.filter((provider) => {
      const matchesCategory =
        selectedCategory === 'All' || provider.category === selectedCategory
      const matchesRegion =
        selectedRegion === 'All' || provider.hub === selectedRegion
      const matchesStatus =
        selectedStatus === 'All' || provider.status === selectedStatus

      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        provider.name.toLowerCase().includes(query) ||
        provider.email.toLowerCase().includes(query) ||
        provider.phone.toLowerCase().includes(query) ||
        provider.providerId.toLowerCase().includes(query) ||
        provider.hub.toLowerCase().includes(query)

      return matchesCategory && matchesRegion && matchesStatus && matchesSearch
    })
  }, [selectedCategory, selectedRegion, selectedStatus, searchQuery])

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedRegion, selectedStatus, searchQuery, rowsPerPage])

  // Pagination computations
  const totalPages = Math.max(1, Math.ceil(filteredProviders.length / rowsPerPage))
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = Math.min(startIndex + rowsPerPage, filteredProviders.length)
  const paginatedProviders = useMemo(() => {
    return filteredProviders.slice(startIndex, endIndex)
  }, [filteredProviders, startIndex, endIndex])

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
          {/* Brand Header */}
          <div className="flex items-center justify-between px-3.5 sm:px-4 w-full h-16 shrink-0 bg-[#181c24]/50 border-b border-[#1c2028]">
            <Link
              to="/"
              className={`flex items-center gap-2.5 overflow-hidden no-underline ${
                isCollapsed ? 'lg:justify-center w-full' : ''
              }`}
            >
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
            </Link>

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

          {/* Collapsed Expand Toggle Bar */}
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
            <img src={imgIconAvatar} alt="" className="w-3.5 h-3.5" />
          </div>
        </div>
      </header>

      {/* ═══ MAIN CONTENT ══════════════════════════════════════════════════ */}
      <main className="flex flex-col items-start w-full pt-16 min-h-screen">
        
        {/* Top Ambient Glow Line */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#4cd7f6]/40 to-transparent" />

        <div className="flex flex-col gap-6 w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          
          {/* Status & Quick Metric Bar */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div className="flex flex-col items-start gap-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[10.5px] font-bold text-[#4cd7f6] uppercase tracking-widest">
                    IDENTITY &amp; VERIFICATION CENTER
                  </span>
                  <span className="text-[#3f4850] text-sm">•</span>
                  <span className="text-xs font-medium text-[#89929b]">
                    Bahamas Dispatch Jurisdiction #BS-001
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline gap-4">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#dfe2ee] tracking-tight m-0 text-left">
                    Provider Management
                  </h1>
                  <span className="text-xs sm:text-sm font-medium text-[#bfc7d2]">
                    1,428 Verified Entities
                  </span>
                </div>
              </div>
            </div>

            {/* Category Segments Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar w-full">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-all duration-150 border cursor-pointer ${
                      isSelected
                        ? 'bg-[#3198dc] text-[#002c47] border-[#3198dc] shadow-md font-bold'
                        : 'bg-[#1c2028] text-[#bfc7d2] border-transparent hover:bg-[#262b35] hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {/* Search & Secondary Filter Strip */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 w-full pt-1">
              
              {/* Search input */}
              <div className="relative flex items-center flex-1 max-w-[576px]">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none flex items-center justify-center">
                  <img src={imgIconSearch} alt="" className="w-3.5 h-3.5 object-contain" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, license or provider ID..."
                  className="w-full h-10 bg-[#181c24] border border-[#262b35] focus:border-[#4cd7f6] rounded-lg pl-10 pr-14 text-xs sm:text-sm text-[#dfe2ee] placeholder-[#89929b] outline-none transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#89929b] hover:text-[#dfe2ee] bg-transparent border-0 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Region and Status Dropdown Filters */}
              <div className="flex items-center gap-2">
                {/* Region Filter */}
                <div className="flex items-center bg-[#181c24] border border-[#262b35] rounded-lg px-2.5 py-1 text-xs">
                  <span className="text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider mr-2">
                    REGION:
                  </span>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="bg-transparent text-[#dfe2ee] font-medium text-xs outline-none cursor-pointer pr-1"
                  >
                    <option value="All" className="bg-[#1c2028] text-white">All Bahamas Hubs</option>
                    <option value="Nassau" className="bg-[#1c2028] text-white">Nassau</option>
                    <option value="Grand Bahama" className="bg-[#1c2028] text-white">Grand Bahama</option>
                    <option value="Exuma" className="bg-[#1c2028] text-white">Exuma</option>
                    <option value="Abaco" className="bg-[#1c2028] text-white">Abaco</option>
                    <option value="Eleuthera" className="bg-[#1c2028] text-white">Eleuthera</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div className="flex items-center bg-[#181c24] border border-[#262b35] rounded-lg px-2.5 py-1 text-xs">
                  <span className="text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider mr-2">
                    STATUS:
                  </span>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-transparent text-[#dfe2ee] font-medium text-xs outline-none cursor-pointer pr-1"
                  >
                    <option value="All" className="bg-[#1c2028] text-white">All Statuses</option>
                    <option value="Approved" className="bg-[#1c2028] text-white">Approved</option>
                    <option value="Pending" className="bg-[#1c2028] text-white">Pending</option>
                    <option value="Rejected" className="bg-[#1c2028] text-white">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Administrative Data Canvas Table */}
          <div className="w-full bg-[#181c24] border border-[#262b35] rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[980px] border-collapse text-left">
                {/* Table Header */}
                <thead className="bg-[#0a0e16] border-b border-[#262b35]">
                  <tr>
                    <th scope="col" className="py-3.5 px-6 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider w-[32%]">
                      USER / BUSINESS ENTITY
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider w-[14%]">
                      PROVIDER CATEGORY
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider w-[22%]">
                      DIRECT CONTACT
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider w-[12%]">
                      HUB LOCATION
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider w-[12%]">
                      APPROVAL STATUS
                    </th>
                    <th scope="col" className="py-3.5 px-6 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider text-right w-[8%]">
                      ACTION
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-[#222834]">
                  {paginatedProviders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-[#89929b] text-sm">
                        No providers found matching current filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedProviders.map((provider) => (
                      <tr
                        key={provider.id}
                        className="hover:bg-[#1f242e]/70 transition-colors duration-150"
                      >
                        {/* Provider Entity & Avatar */}
                        <td className="py-4 px-6 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-[#31353e] border border-white/5 shadow-sm">
                              {provider.avatarImage ? (
                                <img
                                  src={provider.avatarImage}
                                  alt={provider.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span
                                  className="font-bold text-sm"
                                  style={{ color: provider.avatarColor || '#dfe2ee' }}
                                >
                                  {provider.avatarInitials}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col text-left">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-semibold text-[#dfe2ee] leading-tight">
                                  {provider.name}
                                </span>
                                {provider.hasPendingBadge && (
                                  <div className="w-2 h-2 rounded-full bg-[#ffb95f] shrink-0 animate-pulse" title="Verification Pending" />
                                )}
                              </div>
                              <span className="text-[11px] font-semibold text-[#89929b] tracking-wider leading-tight mt-0.5">
                                {provider.providerId}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4 align-middle">
                          <div className="flex items-center gap-2">
                            <img
                              src={provider.categoryIcon}
                              alt=""
                              className="w-3 h-3 object-contain shrink-0"
                            />
                            <span className="text-xs sm:text-[13px] font-medium text-[#dfe2ee]">
                              {provider.category}
                            </span>
                          </div>
                        </td>

                        {/* Direct Contact */}
                        <td className="py-4 px-4 align-middle">
                          <div className="flex flex-col text-left">
                            <span className="text-xs sm:text-[13px] font-medium text-[#dfe2ee] leading-snug">
                              {provider.phone}
                            </span>
                            <span className="text-[11px] font-semibold text-[#bfc7d2] tracking-wider leading-snug mt-0.5 truncate max-w-[220px]">
                              {provider.email}
                            </span>
                          </div>
                        </td>

                        {/* Hub Location */}
                        <td className="py-4 px-4 align-middle">
                          <div className="flex items-center gap-1.5">
                            <img
                              src={imgIconPin}
                              alt=""
                              className="w-2.5 h-3.5 object-contain shrink-0 opacity-70"
                            />
                            <span className="text-xs sm:text-[13px] font-medium text-[#dfe2ee]">
                              {provider.hub}
                            </span>
                          </div>
                        </td>

                        {/* Approval Status Badge */}
                        <td className="py-4 px-4 align-middle">
                          {provider.status === 'Pending' && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ca8100]/30 border border-[#ca8100]/40">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#ffb95f]" />
                              <span className="text-[11px] font-semibold text-[#ffb95f] tracking-wide">
                                Pending
                              </span>
                            </div>
                          )}
                          {provider.status === 'Approved' && (
                            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#4cd7f6]/15 border border-[#4cd7f6]/30">
                              <span className="text-[11px] font-semibold text-[#4cd7f6] tracking-wide">
                                Approved
                              </span>
                            </div>
                          )}
                          {provider.status === 'Rejected' && (
                            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-900/30 border border-red-500/30">
                              <span className="text-[11px] font-semibold text-[#ffb4ab] tracking-wide">
                                Rejected
                              </span>
                            </div>
                          )}
                        </td>

                        {/* Action CTA */}
                        <td className="py-4 px-6 align-middle text-right">
                          <button
                            type="button"
                            onClick={() => setActiveModalProvider(provider)}
                            className={`inline-flex items-center justify-center px-3 py-1 rounded text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer border-0 shadow-sm ${
                              provider.status === 'Pending'
                                ? 'bg-[#03b5d3] hover:bg-[#20c8e4] text-[#00424e]'
                                : 'bg-[#31353e] hover:bg-[#3f4552] text-[#dfe2ee]'
                            }`}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination / Meta Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-[#0a0e16] border-t border-[#262b35]/60">
              {/* Display counter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#89929b]">
                  Displaying{' '}
                  <strong className="text-[#dfe2ee] font-semibold">
                    {filteredProviders.length === 0 ? 0 : startIndex + 1} - {endIndex}
                  </strong>{' '}
                  of <strong className="text-[#dfe2ee] font-semibold">{filteredProviders.length}</strong> Registered Entities
                </span>
              </div>

              {/* Rows Per Page & Page Navigation */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-[#89929b]">
                  <span className="font-bold text-[10.5px] uppercase">ROWS:</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="bg-[#1c2028] border border-[#262b35] rounded px-2 py-1 text-xs text-[#dfe2ee] outline-none cursor-pointer"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="flex items-center justify-center w-8 h-8 rounded bg-[#1c2028] border border-[#262b35] text-[#dfe2ee] hover:bg-[#262b35] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    aria-label="Previous page"
                  >
                    <img src={imgPagPrev} alt="" className="w-1.5 h-2.5 object-contain" />
                  </button>

                  <div className="flex items-center justify-center px-3 h-8 rounded bg-[#3198dc] text-[#002c47] font-bold text-xs shadow-sm">
                    {currentPage}
                  </div>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="flex items-center justify-center w-8 h-8 rounded bg-[#1c2028] border border-[#262b35] text-[#dfe2ee] hover:bg-[#262b35] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    aria-label="Next page"
                  >
                    <img src={imgPagNext} alt="" className="w-1.5 h-2.5 object-contain" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ═══ PROVIDER DETAILS & DECISION MODAL ═════════════════════════════ */}
      {activeModalProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative flex flex-col w-full max-w-xl bg-[#1c2028] border border-[#262b35] rounded-xl shadow-2xl p-6 text-left gap-5">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#262b35] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#31353e] overflow-hidden border border-white/5">
                  {activeModalProvider.avatarImage ? (
                    <img
                      src={activeModalProvider.avatarImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-bold text-base" style={{ color: activeModalProvider.avatarColor }}>
                      {activeModalProvider.avatarInitials}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#dfe2ee] m-0 leading-tight">
                    {activeModalProvider.name}
                  </h3>
                  <span className="text-xs text-[#89929b] font-mono">
                    {activeModalProvider.providerId} • {activeModalProvider.hub}, Bahamas
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalProvider(null)}
                className="p-1 rounded-lg text-[#89929b] hover:text-white hover:bg-[#262b35] border-0 bg-transparent cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Provider Details Body */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col gap-1 p-3 bg-[#181c24] rounded-lg border border-[#262b35]">
                <span className="text-[#89929b] uppercase font-bold text-[10px]">CATEGORY</span>
                <span className="text-[#dfe2ee] font-semibold text-sm">{activeModalProvider.category}</span>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-[#181c24] rounded-lg border border-[#262b35]">
                <span className="text-[#89929b] uppercase font-bold text-[10px]">STATUS</span>
                <span className="text-sm font-semibold" style={{ color: activeModalProvider.status === 'Pending' ? '#ffb95f' : activeModalProvider.status === 'Approved' ? '#4cd7f6' : '#ffb4ab' }}>
                  {activeModalProvider.status}
                </span>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-[#181c24] rounded-lg border border-[#262b35]">
                <span className="text-[#89929b] uppercase font-bold text-[10px]">PHONE</span>
                <span className="text-[#dfe2ee] font-medium">{activeModalProvider.phone}</span>
              </div>
              <div className="flex flex-col gap-1 p-3 bg-[#181c24] rounded-lg border border-[#262b35]">
                <span className="text-[#89929b] uppercase font-bold text-[10px]">EMAIL</span>
                <span className="text-[#dfe2ee] font-medium truncate">{activeModalProvider.email}</span>
              </div>
            </div>

            {/* Credential & KYC Section */}
            <div className="flex flex-col gap-2 p-3.5 bg-[#0a0e16] rounded-lg border border-[#262b35]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#89929b] uppercase tracking-wider">
                  SUBMITTED CREDENTIALS &amp; LICENSING
                </span>
                <span className="text-[10px] text-[#ffb95f] font-mono">
                  {activeModalProvider.submittedDate}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#dfe2ee] m-0">
                {activeModalProvider.documentName}
              </p>
              <span className="text-xs text-[#4cd7f6]">
                Status: {activeModalProvider.documentStatus}
              </span>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveModalProvider(null)}
                className="px-4 py-2 rounded-lg bg-[#262b35] hover:bg-[#31353e] text-[#dfe2ee] text-xs font-semibold border-0 cursor-pointer transition-colors"
              >
                Close
              </button>
              {activeModalProvider.status === 'Pending' && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      activeModalProvider.status = 'Rejected'
                      setActiveModalProvider(null)
                    }}
                    className="px-4 py-2 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold cursor-pointer transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      activeModalProvider.status = 'Approved'
                      setActiveModalProvider(null)
                    }}
                    className="px-4 py-2 rounded-lg bg-[#3198dc] hover:bg-[#43a4e5] text-[#002c47] text-xs font-bold border-0 cursor-pointer transition-colors shadow-md"
                  >
                    Approve Provider
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
