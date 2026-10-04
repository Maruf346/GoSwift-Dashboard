import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  MapPin,
  Search,
  Settings,
  UserRound,
  Users,
  Handshake,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import {
  listAdminUsers,
  updateAdminUserStatus,
  type AdminUserRecord,
  type AdminUserRole,
} from '../api/admin'

// ── Asset URLs (Figma-sourced) ─────────────────────────────────────────────
const imgLogo = '/logo.png'

function UserCategoryIcon({ category }: { category: DirectoryUser['category'] }) {
  switch (category) {
    case 'Super Admin':
      return <UserRound className="w-3 h-3" aria-hidden="true" />
    default:
      return <Users className="w-3 h-3" aria-hidden="true" />
  }
}

// ── Directory Mock Data (Multi-page realistic data) ────────────────────────
export interface DirectoryUser {
  id: string
  initials: string
  avatarBg: string
  avatarColor: string
  name: string
  swiftId: string
  verified?: boolean
  category: 'Customer' | 'Service Provider' | 'Super Admin'
  categoryBg: string
  categoryColor: string
  phone: string
  email: string
  location: string
  date: string
  isActive: boolean
}

const directoryUsers = [
  {
    id: '1',
    initials: 'KP',
    avatarBg: '#3198dc',
    avatarColor: '#002c47',
    name: 'Capt. Kenneth Pratt',
    swiftId: 'SWIFT-CUST-8819',
    category: 'Customer',
    categoryBg: 'rgba(147,204,255,0.1)',
    categoryColor: '#93ccff',
    phone: '+242 552-3901',
    email: 'k.pratt@nassaumarine.bs',
    location: 'Nassau / New Providence',
    date: 'Oct 12, 2024',
  },
  {
    id: '2',
    initials: 'MR',
    avatarBg: 'rgba(76,215,246,0.2)',
    avatarColor: '#4cd7f6',
    name: 'Marcus Rolle',
    swiftId: 'SWIFT-DRV-1029',
    verified: true,
    category: 'Driver',
    categoryBg: 'rgba(3,181,211,0.2)',
    categoryColor: '#acedff',
    phone: '+242 429-8734',
    email: 'mrolle.swift@gmail.com',
    location: 'Nassau / New Providence',
    date: 'Nov 04, 2024',
  },
  {
    id: '3',
    initials: 'AS',
    avatarBg: '#31353e',
    avatarColor: '#dfe2ee',
    name: 'Althea Sweeting',
    swiftId: 'SWIFT-CUST-7740',
    category: 'Customer',
    categoryBg: 'rgba(147,204,255,0.1)',
    categoryColor: '#93ccff',
    phone: '+242 361-9022',
    email: 'asweeting@bahamaslaw.org',
    location: 'Cable Beach / Nassau',
    date: 'Aug 19, 2024',
  },
  {
    id: '4',
    initials: 'IB',
    avatarBg: 'rgba(202,129,0,0.3)',
    avatarColor: '#ffb95f',
    name: 'Island Bites Café (Devon Bethel)',
    swiftId: 'SWIFT-VND-4401',
    category: 'Food Vendor',
    categoryBg: 'rgba(255,185,95,0.15)',
    categoryColor: '#ffb95f',
    phone: '+242 393-2483',
    email: 'orders@islandbitesbahamas.com',
    location: 'Bay St, Nassau',
    date: 'Jul 02, 2024',
  },
  {
    id: '5',
    initials: 'DS',
    avatarBg: 'rgba(147,204,255,0.2)',
    avatarColor: '#cce5ff',
    name: 'Derick Strachan',
    swiftId: 'SWIFT-COU-2190',
    category: 'Courier',
    categoryBg: 'rgba(204,229,255,0.2)',
    categoryColor: '#93ccff',
    phone: '+242 352-7819',
    email: 'dstrachan.courier@swift.bs',
    location: 'Freeport / Grand Bahama',
    date: 'Sep 28, 2024',
  },
  {
    id: '6',
    initials: 'BD',
    avatarBg: 'rgba(172,237,255,0.2)',
    avatarColor: '#acedff',
    name: 'Bahama Drift Rentals (Kendra Christie)',
    swiftId: 'SWIFT-RNT-0382',
    category: 'Car Rental Provider',
    categoryBg: 'rgba(172,237,255,0.15)',
    categoryColor: '#4cd7f6',
    phone: '+242 363-1188',
    email: 'fleet@bahamadrift.com',
    location: 'Paradise Island, Nassau',
    date: 'Jun 14, 2024',
  },
  {
    id: '7',
    initials: 'CS',
    avatarBg: 'rgba(255,221,184,0.2)',
    avatarColor: '#ffddb8',
    name: 'Coral Sands Villa (Sean Cartwright)',
    swiftId: 'SWIFT-PROP-0914',
    category: 'Property Owner',
    categoryBg: 'rgba(255,221,184,0.15)',
    categoryColor: '#ffb95f',
    phone: '+242 336-2009',
    email: 'villas@coralsandsexuma.com',
    location: 'George Town / Exuma',
    date: 'May 03, 2024',
  },
  {
    id: '8',
    initials: 'BO',
    avatarBg: 'rgba(255,221,184,0.2)',
    avatarColor: '#ffddb8',
    name: 'Blue Ocean Retreats',
    swiftId: 'SWIFT-PROP-0422',
    category: 'Property Owner',
    categoryBg: 'rgba(255,221,184,0.15)',
    categoryColor: '#ffb95f',
    phone: '+242 332-2114',
    email: 'stay@blueoceanretreats.bs',
    location: "Governor's Harbour / Eleuthera",
    date: 'Apr 11, 2024',
  },
  {
    id: '9',
    initials: 'TF',
    avatarBg: 'rgba(147,204,255,0.2)',
    avatarColor: '#93ccff',
    name: 'Tricia Ferguson',
    swiftId: 'SWIFT-CUST-9122',
    category: 'Customer',
    categoryBg: 'rgba(147,204,255,0.1)',
    categoryColor: '#93ccff',
    phone: '+242 367-4590',
    email: 'tricia.ferguson@abacorealty.com',
    location: 'Marsh Harbour / Abaco',
    date: 'Aug 22, 2024',
  },
  {
    id: '10',
    initials: 'KM',
    avatarBg: 'rgba(76,215,246,0.2)',
    avatarColor: '#4cd7f6',
    name: 'Kevin Major',
    swiftId: 'SWIFT-DRV-0883',
    verified: true,
    category: 'Driver',
    categoryBg: 'rgba(3,181,211,0.2)',
    categoryColor: '#acedff',
    phone: '+242 351-6623',
    email: 'kmajor.swiftfleet@yahoo.com',
    location: 'Freeport / Grand Bahama',
    date: 'Jan 15, 2024',
  },
  {
    id: '11',
    initials: 'LJ',
    avatarBg: '#3198dc',
    avatarColor: '#002c47',
    name: 'Leroy Johnson',
    swiftId: 'SWIFT-DRV-2041',
    verified: true,
    category: 'Driver',
    categoryBg: 'rgba(3,181,211,0.2)',
    categoryColor: '#acedff',
    phone: '+242 431-9082',
    email: 'leroy.j@swiftbahamas.bs',
    location: 'Nassau / New Providence',
    date: 'Dec 01, 2024',
  },
  {
    id: '12',
    initials: 'TS',
    avatarBg: 'rgba(202,129,0,0.3)',
    avatarColor: '#ffb95f',
    name: 'Tropical Spice Grill (Annette Davis)',
    swiftId: 'SWIFT-VND-5512',
    category: 'Food Vendor',
    categoryBg: 'rgba(255,185,95,0.15)',
    categoryColor: '#ffb95f',
    phone: '+242 328-9941',
    email: 'info@tropicalspicebahamas.com',
    location: 'Arawak Cay, Nassau',
    date: 'Nov 18, 2024',
  },
  {
    id: '13',
    initials: 'RW',
    avatarBg: 'rgba(147,204,255,0.2)',
    avatarColor: '#93ccff',
    name: 'Rashad Williams',
    swiftId: 'SWIFT-COU-3309',
    category: 'Courier',
    categoryBg: 'rgba(204,229,255,0.2)',
    categoryColor: '#93ccff',
    phone: '+242 462-1190',
    email: 'rwilliams.deliveries@fastswift.bs',
    location: 'Nassau / New Providence',
    date: 'Oct 30, 2024',
  },
  {
    id: '14',
    initials: 'EP',
    avatarBg: 'rgba(172,237,255,0.2)',
    avatarColor: '#acedff',
    name: 'Exuma Prestige Car Hire',
    swiftId: 'SWIFT-RNT-1192',
    category: 'Car Rental Provider',
    categoryBg: 'rgba(172,237,255,0.15)',
    categoryColor: '#4cd7f6',
    phone: '+242 336-8800',
    email: 'rentals@exumaprestige.com',
    location: 'George Town / Exuma',
    date: 'Oct 05, 2024',
  },
  {
    id: '15',
    initials: 'HB',
    avatarBg: 'rgba(255,221,184,0.2)',
    avatarColor: '#ffddb8',
    name: 'Harbour Breeze Cottages',
    swiftId: 'SWIFT-PROP-2291',
    category: 'Property Owner',
    categoryBg: 'rgba(255,221,184,0.15)',
    categoryColor: '#ffb95f',
    phone: '+242 333-2890',
    email: 'reservations@harbourbreeze.bs',
    location: 'Dunmore Town / Harbour Island',
    date: 'Sep 14, 2024',
  },
  {
    id: '16',
    initials: 'MC',
    avatarBg: '#31353e',
    avatarColor: '#dfe2ee',
    name: 'Melanie Culmer',
    swiftId: 'SWIFT-CUST-6619',
    category: 'Customer',
    categoryBg: 'rgba(147,204,255,0.1)',
    categoryColor: '#93ccff',
    phone: '+242 394-1188',
    email: 'mculmer@centralbankbahamas.org',
    location: 'Eastern District / Nassau',
    date: 'Sep 02, 2024',
  },
  {
    id: '17',
    initials: 'DM',
    avatarBg: 'rgba(76,215,246,0.2)',
    avatarColor: '#4cd7f6',
    name: 'Dario Moss',
    swiftId: 'SWIFT-DRV-3490',
    verified: true,
    category: 'Driver',
    categoryBg: 'rgba(3,181,211,0.2)',
    categoryColor: '#acedff',
    phone: '+242 422-9901',
    email: 'dmoss.rides@swift.bs',
    location: 'Nassau / New Providence',
    date: 'Aug 28, 2024',
  },
  {
    id: '18',
    initials: 'BB',
    avatarBg: 'rgba(202,129,0,0.3)',
    avatarColor: '#ffb95f',
    name: 'Bahamian Breeze Bakery',
    swiftId: 'SWIFT-VND-6621',
    category: 'Food Vendor',
    categoryBg: 'rgba(255,185,95,0.15)',
    categoryColor: '#ffb95f',
    phone: '+242 325-4491',
    email: 'pastries@bahamiabreeze.com',
    location: 'Shirley St, Nassau',
    date: 'Aug 10, 2024',
  },
  {
    id: '19',
    initials: 'CJ',
    avatarBg: 'rgba(147,204,255,0.2)',
    avatarColor: '#93ccff',
    name: 'Carlton Jones',
    swiftId: 'SWIFT-COU-4512',
    category: 'Courier',
    categoryBg: 'rgba(204,229,255,0.2)',
    categoryColor: '#93ccff',
    phone: '+242 373-8902',
    email: 'cjones@swiftgrandbahama.bs',
    location: 'Lucaya / Grand Bahama',
    date: 'Jul 24, 2024',
  },
  {
    id: '20',
    initials: 'NR',
    avatarBg: 'rgba(172,237,255,0.2)',
    avatarColor: '#acedff',
    name: 'Nassau River Wheels',
    swiftId: 'SWIFT-RNT-4410',
    category: 'Car Rental Provider',
    categoryBg: 'rgba(172,237,255,0.15)',
    categoryColor: '#4cd7f6',
    phone: '+242 327-9002',
    email: 'bookings@nassauwheels.com',
    location: 'Lynden Pindling Intl / Nassau',
    date: 'Jul 15, 2024',
  },
]

void directoryUsers

function formatDate(value?: string | null) {
  if (!value) return '--'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function getInitials(user: AdminUserRecord) {
  const source = user.full_name || user.username || user.email
  return source
    .split(/\s+|@/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'U'
}

function getRoleLabel(role: AdminUserRole): DirectoryUser['category'] {
  if (role === 'CUSTOMER') return 'Customer'
  if (role === 'SUPER_ADMIN') return 'Super Admin'
  return 'Service Provider'
}

function getRoleStyle(role: AdminUserRole) {
  if (role === 'CUSTOMER') return { categoryBg: 'rgba(147,204,255,0.1)', categoryColor: '#93ccff' }
  if (role === 'SUPER_ADMIN') return { categoryBg: 'rgba(255,185,95,0.15)', categoryColor: '#ffb95f' }
  return { categoryBg: 'rgba(76,215,246,0.14)', categoryColor: '#4cd7f6' }
}

function mapUser(user: AdminUserRecord): DirectoryUser {
  const roleStyle = getRoleStyle(user.role)
  const location = [user.city, user.state, user.country].filter(Boolean).join(', ')
  return {
    id: String(user.id),
    initials: getInitials(user),
    avatarBg: user.is_active ? 'rgba(76,215,246,0.2)' : '#31353e',
    avatarColor: user.is_active ? '#4cd7f6' : '#dfe2ee',
    name: user.full_name || user.username || user.email,
    swiftId: `ID: ${user.id}`,
    verified: user.is_active,
    category: getRoleLabel(user.role),
    ...roleStyle,
    phone: user.phone_number || '--',
    email: user.email,
    location: location || '--',
    date: formatDate(user.date_joined || user.created_at),
    isActive: user.is_active,
  }
}

function mapCategoryToRole(category: string): AdminUserRole | undefined {
  if (category === 'Customer') return 'CUSTOMER'
  if (category === 'Service Provider') return 'SERVICE_PROVIDER'
  if (category === 'Super Admin') return 'SUPER_ADMIN'
  return undefined
}

export default function UserManagement() {
  const auth = useAuth()
  const nav = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openActionId, setOpenActionId] = useState<string | null>(null)
  const [users, setUsers] = useState<DirectoryUser[]>([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [userError, setUserError] = useState<string | null>(null)

  function handleLogout() {
    auth.logout()
    nav('/')
  }

  const navItems = [
    { Icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', active: false },
    { Icon: Users, label: 'User Management', path: '/users', active: true },
    { Icon: Handshake, label: 'Provider Management', path: '/providers', active: false },
    { Icon: LifeBuoy, label: 'Contact Support', path: '/support', active: false },
    { Icon: Settings, label: 'Settings', path: '/settings', active: false },
  ]

  const categories = [
    { id: 'All', label: 'All Users', Icon: Users },
    { id: 'Customer', label: 'Customers', Icon: Users },
    { id: 'Service Provider', label: 'Service Providers', Icon: Handshake },
    { id: 'Super Admin', label: 'Super Admins', Icon: UserRound },
  ]

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery, rowsPerPage])

  // Total pages calculation
  const totalPages = Math.max(1, Math.ceil(totalUsers / rowsPerPage))

  const startIndex = totalUsers === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1
  const endIndex = Math.min(currentPage * rowsPerPage, totalUsers)
  const paginatedUsers = users

  // Generate pagination page items
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')
      
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    return pages
  }, [totalPages, currentPage])

  useEffect(() => {
    let isMounted = true
    setIsLoadingUsers(true)
    setUserError(null)

    listAdminUsers({
      page: currentPage,
      pageSize: rowsPerPage,
      search: searchQuery,
      role: mapCategoryToRole(selectedCategory),
    })
      .then((response) => {
        if (!isMounted) return
        const mappedUsers = response.results.map(mapUser)
        setUsers(mappedUsers)
        setTotalUsers(response.count)
        setActiveUsers(mappedUsers.filter((user) => user.isActive).length)
      })
      .catch((error: Error) => {
        if (!isMounted) return
        setUsers([])
        setTotalUsers(0)
        setActiveUsers(0)
        setUserError(error.message)
      })
      .finally(() => {
        if (isMounted) setIsLoadingUsers(false)
      })

    return () => {
      isMounted = false
    }
  }, [currentPage, rowsPerPage, searchQuery, selectedCategory])

  async function handleToggleUserStatus(user: DirectoryUser) {
    try {
      const updated = mapUser(await updateAdminUserStatus(Number(user.id), !user.isActive))
      setUsers((current) => current.map((item) => (item.id === user.id ? updated : item)))
      setOpenActionId(null)
    } catch (error) {
      setUserError(error instanceof Error ? error.message : 'Unable to update user status.')
    }
  }

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
              to="/dashboard"
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
            <span className="text-xs font-semibold text-[#dfe2ee] leading-tight">
              {auth.user?.full_name || 'Admin'}
            </span>
            <span className="text-[10px] font-medium text-[#89929b] tracking-wider leading-tight hidden sm:inline">
              {auth.user?.email || 'admin@goswiftbahamas.com'}
            </span>
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#93ccff] text-[#002c47] font-bold shrink-0 shadow-inner">
            <UserRound className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
        </div>
      </header>

      {/* ═══ MAIN CONTENT ══════════════════════════════════════════════════ */}
      <main className="flex flex-col items-start w-full pt-16 min-h-screen">
        
        {/* Top Ambient Glow Line */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#4cd7f6]/40 to-transparent" />

        <div className="flex flex-col gap-6 w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          
          {/* Section: Page Header & Key Metrics */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 w-full">
            
            {/* Title & Description Stack */}
            <div className="flex flex-col items-start gap-1 max-w-[768px]">
              {/* Breadcrumbs & Status */}
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10.5px] font-bold text-[#4cd7f6] uppercase tracking-widest">
                  IDENTITY &amp; ACCESS REGISTRY
                </span>
                <span className="text-[#89929b] text-xs">•</span>
                <span className="text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider">
                  BAHAMAS GATEWAY HUB
                </span>
                <span className="text-[#89929b] text-xs">•</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffb95f] animate-pulse" />
                  <span className="text-[10.5px] font-semibold text-[#ffb95f]">Sync Active</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#dfe2ee] tracking-tight m-0 text-left">
                All Users Directory
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#bfc7d2] leading-relaxed text-left m-0 pt-1">
                Comprehensive central registry of registered customers, service providers, and super admins.
              </p>
            </div>

            {/* Live Registry KPI Badges */}
            <div className="flex flex-wrap items-center gap-2 bg-[#0a0e16] border border-[#262b35] p-1.5 rounded-xl shadow-md shrink-0 self-start lg:self-auto max-w-full">
              {/* TOTAL */}
              <div className="flex items-center gap-2 bg-[#1c2028] px-3.5 py-1.5 rounded-lg border border-[#262b35]/60">
                <span className="text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider">TOTAL</span>
                <span className="text-base sm:text-lg font-extrabold text-[#dfe2ee]">{totalUsers}</span>
              </div>
              {/* ACTIVE */}
              <div className="flex items-center gap-1.5 bg-[#1c2028] px-3.5 py-1.5 rounded-lg border border-[#262b35]/60">
                <div className="w-2 h-2 rounded-full bg-[#4cd7f6]" />
                <span className="text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider">ACTIVE SHOWN</span>
                <span className="text-sm sm:text-base font-bold text-[#4cd7f6]">{activeUsers}</span>
              </div>
              {/* INACTIVE */}
              <div className="flex items-center gap-1.5 bg-[#1c2028] px-3.5 py-1.5 rounded-lg border border-[#262b35]/60">
                <div className="w-2 h-2 rounded-full bg-[#ffb95f]" />
                <span className="text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider">INACTIVE SHOWN</span>
                <span className="text-sm sm:text-base font-bold text-[#ffb95f]">{Math.max(0, users.length - activeUsers)}</span>
              </div>
            </div>
          </div>

          {/* Section: Search & Filter Controls Surface */}
          <div className="flex flex-col gap-4 p-4 bg-[#1c2028] border border-[#262b35] rounded-xl shadow-lg w-full">
            
            {/* Search Input Bar */}
            <div className="relative flex items-center w-full">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none flex items-center justify-center">
                <Search className="w-3.5 h-3.5 text-[#89929b]" aria-hidden="true" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by full name, email, phone, username, or ID..."
                className="w-full h-11 bg-[#0a0e16] border border-[#262b35] focus:border-[#4cd7f6] focus:ring-1 focus:ring-[#4cd7f6] rounded-md pl-10 pr-16 text-xs sm:text-sm text-[#dfe2ee] placeholder-[#89929b] outline-none transition-all shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.2)]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-[#89929b] hover:text-[#dfe2ee] bg-[#262b35] hover:bg-[#31353e] rounded transition-colors border-0 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Horizontal Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar w-full">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 border cursor-pointer ${
                      isSelected
                        ? 'bg-[#4cd7f6] text-[#003640] border-[#4cd7f6] shadow-md'
                        : 'bg-[#0a0e16] text-[#bfc7d2] border-[#262b35] hover:bg-[#262b35] hover:text-white'
                    }`}
                  >
                    {'Icon' in cat && cat.Icon && (
                      <cat.Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Section: Master User Data Table */}
          <div className="w-full bg-[#181c24] border border-[#262b35] rounded-xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto w-full admin-scrollbar">
              <table className="responsive-table w-full min-w-[980px] border-collapse text-left">
                {/* Table Header */}
                <thead className="bg-[#0a0e16] border-b border-[#262b35]">
                  <tr>
                    <th scope="col" className="py-3.5 px-6 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider w-[32%]">
                      USER / ENTITY
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider w-[14%]">
                      CATEGORY / ROLE
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider w-[20%]">
                      CONTACT DETAILS
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider w-[16%]">
                      LOCATION
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider w-[12%]">
                      REGISTRATION DATE
                    </th>
                    <th scope="col" className="py-3.5 px-6 text-[10.5px] font-bold text-[#89929b] uppercase tracking-wider text-right w-[6%]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-[#222834]">
                  {isLoadingUsers ? (
                    <tr>
                      <td data-label="" colSpan={6} className="py-12 text-center text-[#89929b] text-sm">
                        Loading users...
                      </td>
                    </tr>
                  ) : userError ? (
                    <tr>
                      <td data-label="" colSpan={6} className="py-12 text-center text-red-200 text-sm">
                        {userError}
                      </td>
                    </tr>
                  ) : paginatedUsers.length === 0 ? (
                    <tr>
                      <td data-label="" colSpan={6} className="py-12 text-center text-[#89929b] text-sm">
                        No users found matching &quot;{searchQuery}&quot; in category &quot;{selectedCategory}&quot;.
                      </td>
                    </tr>
                  ) : (
                    paginatedUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-[#1f242e]/70 transition-colors duration-150 relative"
                      >
                        {/* User / Entity */}
                        <td data-label="User / Entity" className="py-4 px-6 align-middle">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 font-bold text-sm shadow-sm border border-white/5"
                              style={{
                                backgroundColor: user.avatarBg,
                                color: user.avatarColor,
                              }}
                            >
                              {user.initials}
                            </div>
                            <div className="flex flex-col text-left">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-semibold text-[#dfe2ee] leading-tight">
                                  {user.name}
                                </span>
                                {user.verified && (
                                  <BadgeCheck
                                    className="w-3.5 h-3.5 text-[#4cd7f6]"
                                    aria-label="Verified"
                                  />
                                )}
                              </div>
                              <span className="text-[11px] font-mono text-[#89929b] leading-tight mt-0.5">
                                {user.swiftId}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category / Role */}
                        <td data-label="Category / Role" className="py-4 px-4 align-middle">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide"
                            style={{
                              backgroundColor: user.categoryBg,
                              color: user.categoryColor,
                              border: `1px solid ${user.categoryColor}30`,
                            }}
                          >
                            <UserCategoryIcon category={user.category} />
                            <span>{user.category}</span>
                          </span>
                        </td>

                        {/* Contact Details */}
                        <td data-label="Contact Details" className="py-4 px-4 align-middle">
                          <div className="flex flex-col text-left">
                            <span className="text-xs sm:text-[13px] font-medium text-[#dfe2ee] leading-snug">
                              {user.phone}
                            </span>
                            <span className="text-[11px] text-[#89929b] leading-snug mt-0.5 truncate max-w-[200px]">
                              {user.email}
                            </span>
                          </div>
                        </td>

                        {/* Location */}
                        <td data-label="Location" className="py-4 px-4 align-middle">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 shrink-0 opacity-70" aria-hidden="true" />
                            <span className="text-xs sm:text-[13px] font-medium text-[#bfc7d2] leading-snug">
                              {user.location}
                            </span>
                          </div>
                        </td>

                        {/* Registration Date */}
                        <td data-label="Registration Date" className="py-4 px-4 align-middle">
                          <span className="text-xs sm:text-[13px] text-[#dfe2ee]">
                            {user.date}
                          </span>
                        </td>

                        {/* Actions */}
                        <td data-label="Actions" className="mobile-action-cell py-4 px-6 align-middle text-right relative">
                          <button
                            type="button"
                            onClick={() => setOpenActionId(openActionId === user.id ? null : user.id)}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#262b35] transition-colors border-0 bg-transparent cursor-pointer"
                            title="Actions"
                            aria-label="User actions"
                          >
                            <EllipsisVertical className="w-4 h-4" aria-hidden="true" />
                          </button>

                          {/* Actions Dropdown Menu */}
                          {openActionId === user.id && (
                            <div className="absolute right-6 top-12 z-30 w-44 bg-[#1c2028] border border-[#262b35] rounded-lg shadow-2xl p-1 text-left flex flex-col gap-0.5">
                              <button
                                type="button"
                                onClick={() => handleToggleUserStatus(user)}
                                className={`px-3 py-1.5 text-xs rounded transition-colors text-left border-0 bg-transparent cursor-pointer ${
                                  user.isActive
                                    ? 'text-red-400 hover:bg-red-950/40'
                                    : 'text-[#4cd7f6] hover:bg-[#4cd7f6]/10'
                                }`}
                              >
                                {user.isActive ? 'Deactivate Account' : 'Activate Account'}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 sm:px-6 py-4 bg-[#0a0e16] border-t border-[#262b35]/60">
              
              {/* Records Counter */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs text-[#89929b]">
                  Showing{' '}
                  <strong className="text-[#dfe2ee] font-semibold">
                    {startIndex} to {endIndex}
                  </strong>{' '}
                  of <strong className="text-[#dfe2ee] font-semibold">{totalUsers}</strong> users
                </span>
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1c2028] border border-[#262b35]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]" />
                  <span className="text-[11px] text-[#89929b]">Live Bahamian Gateway</span>
                </div>
              </div>

              {/* Pagination Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full md:w-auto">
                {/* Rows Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#89929b] uppercase tracking-wider">ROWS:</span>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="bg-[#1c2028] border border-[#262b35] focus:border-[#4cd7f6] rounded px-2 py-1 text-xs text-[#dfe2ee] outline-none cursor-pointer"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>

                {/* Page Navigation Buttons */}
                <div className="flex items-center gap-1 overflow-x-auto admin-scrollbar pb-1 sm:pb-0 max-w-full">
                  {/* Prev Button */}
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    className="flex items-center justify-center w-8 h-8 rounded bg-[#1c2028] border border-[#262b35] text-[#dfe2ee] hover:bg-[#262b35] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    title="Previous page"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>

                  {/* Page number buttons */}
                  {pageNumbers.map((page, idx) => {
                    if (page === '...') {
                      return (
                        <span key={`dots-${idx}`} className="px-1 text-xs text-[#89929b]">
                          ...
                        </span>
                      )
                    }

                    const pageNum = Number(page)
                    const isActive = currentPage === pageNum
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`flex items-center justify-center w-8 h-8 rounded text-xs font-semibold cursor-pointer border-0 transition-all ${
                          isActive
                            ? 'bg-[#3198dc] text-[#002c47] font-bold shadow-sm'
                            : 'bg-[#1c2028] text-[#dfe2ee] hover:bg-[#262b35]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}

                  {/* Next Button */}
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    className="flex items-center justify-center w-8 h-8 rounded bg-[#1c2028] border border-[#262b35] text-[#dfe2ee] hover:bg-[#262b35] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    title="Next page"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
