import { useState } from 'react'

// ── Asset URLs (Figma-sourced) ─────────────────────────────────────────────
const imgChefPortrait = 'https://www.figma.com/api/mcp/asset/16004b10-81a1-4a99-9ed1-60fb11722828'
const imgRestaurantAmbience = 'https://www.figma.com/api/mcp/asset/f3a9e106-88e4-4ebe-a062-e1a695b0f78d'

export interface FoodVendorData {
  businessLegalName: string
  tradingName: string
  chefName?: string
  chefRole?: string
  cuisineType: string
  operatingHours: string
  kitchenType: string
  seatingCapacity?: number
  takeoutAvailable: boolean
  deliveryRadiusKm: number
  avgPreparationTime: string
  healthSanitaryCertNumber: string
  healthSanitaryExpiry: string
  healthInspectionGrade: string
  foodHandlersCount: number
  foodHandlersCertified: boolean
  liquorLicenseNumber?: string
  businessRegistrationNumber: string
  menuItemsCount: number
  bankPayoutAccount: string
  physicalAddress?: string
  operatingZone?: string
}

export interface FoodVendorModalProps {
  provider: {
    id: string
    name: string
    providerId: string
    avatarImage?: string
    avatarInitials?: string
    avatarBg?: string
    avatarColor?: string
    phone: string
    email: string
    hub: string
    status: 'Pending' | 'Approved' | 'Rejected'
    submittedDate?: string
    vendorData?: FoodVendorData
  }
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string, reason?: string) => void
  onRequestInfo?: (id: string, note?: string) => void
}

export default function FoodVendorReviewModal({
  provider,
  onClose,
  onApprove,
  onReject,
  onRequestInfo,
}: FoodVendorModalProps) {
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectBox, setShowRejectBox] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(false)
  const [infoNote, setInfoNote] = useState('')
  const [docPreview, setDocPreview] = useState<string | null>(null)

  const defaultVendorData: FoodVendorData = {
    businessLegalName: `${provider.name} Hospitality Ltd.`,
    tradingName: provider.name,
    chefName: 'Chef Devon Bethel',
    chefRole: 'Head Chef & Managing Owner',
    cuisineType: 'Authentic Bahamian Seafood, Conch Salad & Grilled Snapper',
    operatingHours: '11:00 AM - 11:00 PM (Mon - Sun)',
    kitchenType: 'Commercial Waterfront Kitchen & Restaurant',
    seatingCapacity: 85,
    takeoutAvailable: true,
    deliveryRadiusKm: 18,
    avgPreparationTime: '15 - 20 minutes',
    healthSanitaryCertNumber: 'MOH-BS-SAN-4109',
    healthSanitaryExpiry: 'Nov 02, 2025',
    healthInspectionGrade: 'Grade A (Score: 99/100)',
    foodHandlersCount: 8,
    foodHandlersCertified: true,
    liquorLicenseNumber: 'LL-NIB-2024-5510',
    businessRegistrationNumber: 'REG-VEN-BS-4109',
    menuItemsCount: 54,
    bankPayoutAccount: 'CIBC FirstCaribbean Bank •••• 4109',
    physicalAddress: 'West Bay Street, Fish Fry at Arawak Cay, Unit #14, Nassau, Bahamas',
    operatingZone: 'Fish Fry at Arawak Cay, Nassau Metro Zone',
  }

  const vData = provider.vendorData || defaultVendorData

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-[1024px] bg-[#111620] border border-[#262e3d] rounded-2xl shadow-2xl overflow-hidden max-h-[94vh]">
        
        {/* Top Ambient Glow Line */}
        <div className="w-full h-1 bg-gradient-to-r from-[#ffb95f] via-[#4cd7f6] to-[#03b5d3]" />

        {/* ═══ 1. HEADER (node 85:2008) ════════════════════════════════════ */}
        <div className="flex flex-col gap-3 px-6 pt-5 pb-4 bg-[#0d1118] border-b border-[#1f2735]">
          <div className="flex flex-wrap items-center justify-between gap-3 w-full">
            
            {/* Metadata Pills Row (node 85:2010) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              
              {/* Status Badge with Pulsing Dot (node 85:2011) */}
              {provider.status === 'Pending' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ca8100]/20 border border-[#ca8100]/40 text-[#ffb95f] text-xs font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f] animate-pulse" />
                  <span>PENDING REGISTRATION REVIEW</span>
                </div>
              )}
              {provider.status === 'Approved' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4cd7f6]/15 border border-[#4cd7f6]/40 text-[#4cd7f6] text-xs font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]" />
                  <span>APPROVED FOOD VENDOR</span>
                </div>
              )}
              {provider.status === 'Rejected' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>REJECTED APPLICATION</span>
                </div>
              )}

              {/* Identifier Token (node 85:2014) */}
              <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#18202d] border border-[#263347] text-[#4cd7f6] text-xs font-mono font-bold tracking-wider">
                ID: {provider.providerId}
              </div>

              {/* Submitted Elapsed Time (node 85:2016) */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#89929b] font-medium">
                <svg className="w-3.5 h-3.5 text-[#89929b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Submitted: {provider.submittedDate || '4 hours ago'}</span>
              </div>

              {/* Operational Hub Pill (node 85:2018) */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#18202d] border border-[#263347] text-xs font-medium text-[#dfe2ee]">
                <svg className="w-3 h-3 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>{provider.hub} Hub, Bahamas</span>
              </div>

              {/* Category Pill (node 85:2020) */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#18202d] border border-[#263347] text-xs font-medium text-[#ffb95f]">
                <span>🍤</span>
                <span>Bahamas Food Vendor</span>
              </div>
            </div>

            {/* Close Button (node 85:2025) */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#1f2735] border border-transparent hover:border-[#2a3548] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Heading 2 Title (node 85:2022) */}
          <div className="pt-1 text-left">
            <h2 className="text-xl sm:text-2xl font-black text-[#dfe2ee] tracking-tight m-0">
              {vData.tradingName}
            </h2>
            <p className="text-xs text-[#89929b] font-medium m-0 mt-0.5">
              Bahamas Ministry of Health (MOH) Sanitary &amp; BAHFSA Food Safety Compliance Review
            </p>
          </div>
        </div>

        {/* ═══ SCROLLABLE MODAL BODY (node 85:2028) ═════════════════════════ */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-left">
          
          {/* ═══ 2. VENDOR & RESTAURANT PROFILE SECTION (node 85:2029) ════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left Card: Chef/Owner & Restaurant Imagery (node 85:2030) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-4 rounded-2xl bg-[#0d1118] border border-[#1f2735] space-y-4">
                
                {/* Chef Profile Row (node 85:2031) */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#18202d] border border-[#2e3b4e] shrink-0 shadow-inner">
                    <img
                      src={imgChefPortrait}
                      alt={vData.chefName || 'Chef'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget
                        target.style.display = 'none'
                        if (target.parentElement) {
                          target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center font-bold text-lg text-[#ffb95f]">👨‍🍳</div>'
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider">
                      HEAD CHEF / MANAGING OWNER
                    </span>
                    <h3 className="text-sm font-black text-[#dfe2ee] m-0 mt-0.5">
                      {vData.chefName}
                    </h3>
                    <span className="text-[11px] text-[#4cd7f6] font-medium">
                      Executive Culinary Director
                    </span>
                  </div>
                </div>

                {/* Dining Room & Kitchen Overview (node 85:2039) */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                    DINING ROOM &amp; KITCHEN OVERVIEW
                  </span>
                  <div className="relative h-36 rounded-xl overflow-hidden bg-[#151c27] border border-[#222c3b] group">
                    <img
                      src={imgRestaurantAmbience}
                      alt="Restaurant Interior Ambience"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget
                        target.style.display = 'none'
                        if (target.parentElement) {
                          target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-xs text-[#89929b]">Kitchen & Dining Facility</div>'
                        }
                      }}
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-[#dfe2ee] border border-white/10">
                      Waterfront Seating • {vData.seatingCapacity || 85} Guests
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Details: Metadata, Zone, Address & Regulatory Credentials (node 85:2044) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-[#0d1118] border border-[#1f2735] space-y-4">
                
                {/* Legal Entity Heading (node 85:2046) */}
                <div className="pb-3 border-b border-[#1f2735]">
                  <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                    LEGAL REGISTERED ENTITY
                  </span>
                  <h4 className="text-base font-extrabold text-[#dfe2ee] m-0 mt-0.5">
                    {vData.businessLegalName}
                  </h4>
                </div>

                {/* 4 Fields Grid (node 85:2052) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  
                  {/* Field 1: Operational Zone / Island (node 85:2053) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      OPERATIONAL ZONE / ISLAND
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <svg className="w-3.5 h-3.5 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span className="text-xs font-bold text-[#dfe2ee]">
                        {vData.operatingZone || `${provider.hub} Metro Zone`}
                      </span>
                    </div>
                  </div>

                  {/* Field 2: Official Email Address (node 85:2061) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      OFFICIAL EMAIL ADDRESS
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <svg className="w-3.5 h-3.5 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs font-semibold text-[#4cd7f6] truncate">{provider.email}</span>
                    </div>
                  </div>

                  {/* Field 3: Full Physical Address (node 85:2066) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      FULL PHYSICAL ADDRESS
                    </span>
                    <span className="text-xs font-medium text-[#dfe2ee] mt-1 block">
                      {vData.physicalAddress || 'West Bay Street, Fish Fry at Arawak Cay, Nassau, Bahamas'}
                    </span>
                  </div>

                  {/* Field 4: Direct Business Phone (node 85:2071) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      DIRECT BUSINESS PHONE
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <svg className="w-3.5 h-3.5 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-xs font-bold text-[#dfe2ee]">{provider.phone}</span>
                    </div>
                  </div>

                </div>

                {/* Regulatory Badges Strip (node 85:2076) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  
                  {/* Card 1: Ministry of Health Sanitary Certificate (node 85:2078) */}
                  <div className="p-3.5 rounded-xl bg-[#141a24] border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                        MINISTRY OF HEALTH SANITARY
                      </span>
                      <span className="text-sm font-extrabold text-emerald-400 mt-0.5 block">
                        {vData.healthInspectionGrade}
                      </span>
                      <span className="text-[10px] text-[#89929b]">
                        Certificate #{vData.healthSanitaryCertNumber}
                      </span>
                    </div>
                    <span className="text-2xl">🏅</span>
                  </div>

                  {/* Card 2: BAHFSA Food Handler Certification (node 85:2082) */}
                  <div className="p-3.5 rounded-xl bg-[#141a24] border border-[#4cd7f6]/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                        BAHFSA FOOD HANDLERS
                      </span>
                      <span className="text-sm font-extrabold text-[#4cd7f6] mt-0.5 block">
                        {vData.foodHandlersCount} of {vData.foodHandlersCount} Staff Certified
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium">
                        ✓ 100% Active Compliance Badges
                      </span>
                    </div>
                    <span className="text-2xl">📋</span>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* ═══ 3. DOCUMENTS & PERMITS PREVIEW SECTION (node 85:2086) ═══════ */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h4 className="text-xs font-bold text-[#dfe2ee] uppercase tracking-wider m-0">
                OFFICIAL BAHAMAS REGULATORY &amp; SAFETY PERMITS
              </h4>
            </div>

            {/* 3 Document Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Doc 1: Commercial Business License (node 85:2095) */}
              <div className="p-4 rounded-2xl bg-[#0d1118] border border-[#1f2735] flex flex-col justify-between shadow-md space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#18202d] border border-[#2e3b4e] flex items-center justify-center text-lg text-[#4cd7f6]">
                    📜
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#dfe2ee] m-0">
                      Bahamas Commercial License
                    </h5>
                    <span className="text-[10px] text-[#89929b]">
                      Registrar General #{vData.businessRegistrationNumber}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDocPreview('Bahamas Official Commercial Business License Certificate')}
                  className="w-full py-2 px-3 rounded-lg bg-[#18202d] hover:bg-[#222c3d] text-[#4cd7f6] text-xs font-bold border border-[#263347] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Inspect PDF</span>
                </button>
              </div>

              {/* Doc 2: BAHFSA Food Safety & Sanitation Permit (node 85:2109) */}
              <div className="p-4 rounded-2xl bg-[#0d1118] border border-[#1f2735] flex flex-col justify-between shadow-md space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#18202d] border border-[#2e3b4e] flex items-center justify-center text-lg text-emerald-400">
                    🛡️
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#dfe2ee] m-0">
                      BAHFSA Sanitation Permit
                    </h5>
                    <span className="text-[10px] text-[#89929b]">
                      MOH Sanitary #{vData.healthSanitaryCertNumber}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDocPreview('BAHFSA Food Safety & Ministry of Health Sanitation Permit')}
                  className="w-full py-2 px-3 rounded-lg bg-[#18202d] hover:bg-[#222c3d] text-[#4cd7f6] text-xs font-bold border border-[#263347] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>View Permit</span>
                </button>
              </div>

              {/* Doc 3: Restaurant Premises Inspection Photo (node 85:2123) */}
              <div className="p-4 rounded-2xl bg-[#0d1118] border border-[#1f2735] flex flex-col justify-between shadow-md space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#18202d] border border-[#2e3b4e] flex items-center justify-center text-lg text-[#ffb95f]">
                    📸
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#dfe2ee] m-0">
                      Kitchen &amp; Dining Facility
                    </h5>
                    <span className="text-[10px] text-[#89929b]">
                      Annual Commercial Inspection Photo
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDocPreview('Commercial Kitchen & Dining Premises Official Inspection Photographs')}
                  className="w-full py-2 px-3 rounded-lg bg-[#18202d] hover:bg-[#222c3d] text-[#4cd7f6] text-xs font-bold border border-[#263347] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>View Photo</span>
                </button>
              </div>

            </div>
          </div>

          {/* Interactive Document Preview Box */}
          {docPreview && (
            <div className="p-4 rounded-xl bg-[#141e2c] border border-[#4cd7f6]/40 flex items-center justify-between text-xs animate-fadeIn">
              <div className="flex items-center gap-2 text-[#4cd7f6]">
                <span className="text-base">📄</span>
                <span className="font-bold">Viewing Document: {docPreview}</span>
              </div>
              <button
                type="button"
                onClick={() => setDocPreview(null)}
                className="text-[#89929b] hover:text-white bg-transparent border-0 cursor-pointer font-bold"
              >
                Close Preview
              </button>
            </div>
          )}

          {/* Rejection Form Box */}
          {showRejectBox && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-600/40 space-y-3 animate-fadeIn">
              <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider m-0">
                Reason for Application Rejection
              </h4>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Specify reasons for rejecting this food vendor (e.g. Expired Ministry of Health certificate, missing staff food handler badges)..."
                rows={3}
                className="w-full p-3 rounded-lg bg-[#0d1118] border border-red-800/60 text-xs text-[#dfe2ee] placeholder-[#89929b] outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRejectBox(false)}
                  className="px-3 py-1.5 rounded-lg bg-[#222834] text-[#dfe2ee] text-xs font-semibold border-0 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => onReject(provider.id, rejectionReason)}
                  className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold border-0 cursor-pointer"
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          )}

          {/* Request Info Box */}
          {showInfoBox && (
            <div className="p-4 rounded-xl bg-[#ca8100]/20 border border-[#ca8100]/40 space-y-3 animate-fadeIn">
              <h4 className="text-xs font-bold text-[#ffb95f] uppercase tracking-wider m-0">
                Request Vendor Compliance Information
              </h4>
              <textarea
                value={infoNote}
                onChange={(e) => setInfoNote(e.target.value)}
                placeholder="Explain what updated sanitary documents or certificates are required from this vendor..."
                rows={3}
                className="w-full p-3 rounded-lg bg-[#0d1118] border border-[#ca8100]/60 text-xs text-[#dfe2ee] placeholder-[#89929b] outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInfoBox(false)}
                  className="px-3 py-1.5 rounded-lg bg-[#222834] text-[#dfe2ee] text-xs font-semibold border-0 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onRequestInfo) onRequestInfo(provider.id, infoNote)
                    setShowInfoBox(false)
                  }}
                  className="px-4 py-1.5 rounded-lg bg-[#ca8100] hover:bg-[#df9000] text-black text-xs font-bold border-0 cursor-pointer"
                >
                  Send Notice to Vendor
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ═══ 4. BOTTOM ACTION BAR (node 85:2137) ══════════════════════════ */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#0a0e16] border-t border-[#1f2735]">
          
          {/* Left MOH & BAHFSA Verification Active Notice (node 85:2138) */}
          <div className="flex items-center gap-2 text-xs text-[#89929b] font-medium">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Bahamas Ministry of Health (MOH) &amp; BAHFSA Verification Active</span>
          </div>

          {/* Right Action CTA Buttons (node 85:2143) */}
          <div className="flex items-center gap-2.5">
            {provider.status === 'Pending' && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setShowInfoBox(!showInfoBox)
                    setShowRejectBox(false)
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-[#1f2838] hover:bg-[#283449] text-[#ffb95f] border border-[#ffb95f]/30 text-xs font-bold cursor-pointer transition-colors"
                >
                  Request Info
                </button>

                {/* Reject Application button (node 85:2144) */}
                <button
                  type="button"
                  onClick={() => {
                    setShowRejectBox(!showRejectBox)
                    setShowInfoBox(false)
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800 text-xs font-bold cursor-pointer transition-colors"
                >
                  <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Reject Application</span>
                </button>

                {/* Approve Vendor button (node 85:2148) */}
                <button
                  type="button"
                  onClick={() => onApprove(provider.id)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#3198dc] hover:bg-[#45a4e3] text-[#002c47] text-xs font-extrabold border-0 cursor-pointer transition-colors shadow-lg shadow-[#3198dc]/20"
                >
                  <svg className="w-4 h-4 text-[#002c47]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Approve Vendor</span>
                </button>
              </>
            )}

            {provider.status === 'Approved' && (
              <button
                type="button"
                onClick={() => onReject(provider.id, 'Administrative suspension')}
                className="px-4 py-2 rounded-xl bg-red-950/50 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold cursor-pointer"
              >
                Revoke / Suspend Vendor
              </button>
            )}

            {provider.status === 'Rejected' && (
              <button
                type="button"
                onClick={() => onApprove(provider.id)}
                className="px-4 py-2 rounded-xl bg-[#3198dc] hover:bg-[#45a4e3] text-[#002c47] text-xs font-bold border-0 cursor-pointer"
              >
                Re-Approve Vendor
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
