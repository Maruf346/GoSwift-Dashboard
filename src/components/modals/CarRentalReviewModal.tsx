import { useState } from 'react'

// ── Asset URLs (Figma-sourced) ─────────────────────────────────────────────
const imgCarRentalBrand = 'https://www.figma.com/api/mcp/asset/f94103e3-4cd2-416b-ada8-34361d50cea6'
const imgLicensePreview = 'https://www.figma.com/api/mcp/asset/d3ddf3d6-168f-484d-843b-effe0dc29d82'
const imgRoadworthyPreview = 'https://www.figma.com/api/mcp/asset/cb9ad0e2-e7ff-4368-8114-190e9b1d581c'

export interface CarRentalData {
  companyLegalName: string
  tradingName: string
  representativeName?: string
  representativeRole?: string
  fleetSize: number
  vehicleCategories: string[]
  officeLocation: string
  airportPickupAvailable: boolean
  businessLicenseNumber: string
  commercialFleetInsurancePolicy: string
  insuranceCoverageAmount: string
  insuranceExpiry: string
  roadTrafficRentalPermitNumber: string
  minimumRenterAge: number
  securityDepositBSD: number
  gpsTrackingEquipped: boolean
  roadsideAssistancePartner: string
}

export interface CarRentalModalProps {
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
    rentalData?: CarRentalData
  }
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string, reason?: string) => void
  onRequestInfo?: (id: string, note?: string) => void
}

export default function CarRentalReviewModal({
  provider,
  onClose,
  onApprove,
  onReject,
  onRequestInfo,
}: CarRentalModalProps) {
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectBox, setShowRejectBox] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(false)
  const [infoNote, setInfoNote] = useState('')
  const [docPreview, setDocPreview] = useState<string | null>(null)

  const defaultRentalData: CarRentalData = {
    companyLegalName: `${provider.name} Ltd.`,
    tradingName: provider.name,
    representativeName: 'Derek Cartwright',
    representativeRole: 'Managing Director & Fleet Owner',
    fleetSize: 22,
    vehicleCategories: ['Compact Sedans (35%)', '4x4 Island SUVs (45%)', 'Open-Top Jeeps (20%)'],
    officeLocation: 'Bay Street Marina & Terminal B, Paradise Island, Bahamas',
    airportPickupAvailable: true,
    businessLicenseNumber: 'BL-RNT-2024-4401',
    commercialFleetInsurancePolicy: 'BS-COMM-FLT-4401',
    insuranceCoverageAmount: '$2,000,000 BSD Comprehensive Fleet Liability',
    insuranceExpiry: provider.status === 'Rejected' ? 'Oct 10, 2024 (Expired)' : 'Dec 15, 2025',
    roadTrafficRentalPermitNumber: 'RTD-RNT-NAS-2024-4401',
    minimumRenterAge: 25,
    securityDepositBSD: 500,
    gpsTrackingEquipped: true,
    roadsideAssistancePartner: 'Bahamas Towing & Fleet Rescue 24/7',
  }

  const rData = provider.rentalData || defaultRentalData

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-[1140px] bg-[#111620] border border-[#262e3d] rounded-2xl shadow-2xl overflow-hidden max-h-[94vh]">
        
        {/* Top Subtle Ambient Highlight (node 85:1427) */}
        <div className="w-full h-1 bg-gradient-to-r from-[#03b5d3] via-[#4cd7f6] to-[#3198dc]" />

        {/* ═══ 1. MODAL HEADER (node 85:1428) ══════════════════════════════ */}
        <div className="flex flex-col gap-3 px-6 pt-5 pb-4 bg-[#0d1118] border-b border-[#1f2735]">
          {/* Badges & Registry Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 w-full">
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              
              {/* Status Badge with Pulsing Dot */}
              {provider.status === 'Pending' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ca8100]/20 border border-[#ca8100]/40 text-[#ffb95f] text-xs font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f] animate-pulse" />
                  <span>PENDING REVIEW</span>
                </div>
              )}
              {provider.status === 'Approved' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4cd7f6]/15 border border-[#4cd7f6]/40 text-[#4cd7f6] text-xs font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]" />
                  <span>VERIFIED OPERATOR</span>
                </div>
              )}
              {provider.status === 'Rejected' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>REJECTED APPLICATION</span>
                </div>
              )}

              {/* Identifier Token */}
              <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#18202d] border border-[#263347] text-[#4cd7f6] text-xs font-mono font-bold tracking-wider">
                ID: {provider.providerId}
              </div>

              {/* Submitted Elapsed Time */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#89929b] font-medium">
                <svg className="w-3.5 h-3.5 text-[#89929b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{provider.submittedDate || '1 day ago'}</span>
              </div>

              {/* Island Hub Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#18202d] border border-[#263347] text-xs font-medium text-[#dfe2ee]">
                <svg className="w-3 h-3 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>{provider.hub} Hub, Bahamas</span>
              </div>

              {/* Category Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#18202d] border border-[#263347] text-xs font-medium text-[#dfe2ee]">
                <span>🚗</span>
                <span>Car Rental Provider</span>
              </div>
            </div>

            {/* Close Button */}
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

          {/* Main Title & Operational Scope */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
            <div className="flex flex-col text-left">
              <h2 className="text-xl sm:text-2xl font-black text-[#dfe2ee] tracking-tight m-0">
                {rData.companyLegalName}
              </h2>
              <p className="text-xs text-[#89929b] font-medium m-0 mt-0.5">
                Bahamas Commercial Fleet Operator &amp; Luxury Island Vehicle Hire Review
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#142030] border border-[#263c5a] text-xs font-semibold text-[#4cd7f6] self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Ministry of Transport Validated</span>
            </div>
          </div>
        </div>

        {/* ═══ MODAL BODY (SCROLLABLE) ══════════════════════════════════════ */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-left">
          
          {/* ═══ SECTION 2: PROVIDER PROFILE & COMPANY DETAILS (node 85:1463) ═══ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left Column: Company Logo & Identity Card (node 85:1545) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-[#0d1118] border border-[#1f2735] flex flex-col items-center text-center relative overflow-hidden">
                {/* Brand Logo Container */}
                <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-b from-[#18202d] to-[#0d1118] border border-[#2e3b4e] p-3 flex items-center justify-center shadow-xl mb-3">
                  <img
                    src={imgCarRentalBrand}
                    alt={rData.tradingName}
                    className="w-full h-full object-contain filter drop-shadow"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.currentTarget
                      target.style.display = 'none'
                      if (target.parentElement) {
                        target.parentElement.innerHTML = '<span class="text-3xl font-black text-[#4cd7f6]">BD</span>'
                      }
                    }}
                  />
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 text-[#4cd7f6] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                  REGISTERED BAHAMAS OPERATOR
                </div>

                <h3 className="text-lg font-black text-[#dfe2ee] m-0 leading-tight">
                  {rData.tradingName}
                </h3>
                <span className="text-xs text-[#89929b] font-semibold mt-1">
                  Tier-A Premium Island Fleet
                </span>

                {/* Island Operational Hubs Summary Indicator (node 85:1557) */}
                <div className="w-full mt-4 p-3 rounded-xl bg-[#141a24] border border-[#222c3b] text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider">
                      OPERATIONAL HUBS
                    </span>
                    <span className="text-[10px] font-bold text-[#4cd7f6]">2 Locations</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#dfe2ee] font-medium">
                    <svg className="w-3.5 h-3.5 text-[#ffb95f] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>Paradise Island &amp; LPIA Airport</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Verification Field Grid (node 85:1464) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-[#0d1118] border border-[#1f2735] space-y-4">
                
                {/* 6 Key Verification Fields in 2x3 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  
                  {/* Field 1: Trade / Legal Name (node 85:1466) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      TRADE / LEGAL COMPANY NAME
                    </span>
                    <span className="text-sm font-bold text-[#dfe2ee] mt-1 block">
                      {rData.companyLegalName}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium mt-0.5 block">
                      ✓ Registrar General Dept. Verified
                    </span>
                  </div>

                  {/* Field 2: Fleet Category Badge (node 85:1473) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      FLEET CATEGORY CLASSIFICATION
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-sm font-bold text-[#4cd7f6]">Tier-A Premium Fleet</span>
                    </div>
                    <span className="text-[11px] text-[#89929b] font-medium mt-0.5 block">
                      SUVs, Sedans, Jeeps &amp; Convertibles
                    </span>
                  </div>

                  {/* Field 3: Owner / Authorized Representative (node 85:1484) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      AUTHORIZED REPRESENTATIVE
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <svg className="w-3.5 h-3.5 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm font-bold text-[#dfe2ee]">{rData.representativeName}</span>
                    </div>
                    <span className="text-[11px] text-[#89929b] font-medium mt-0.5 block">
                      {rData.representativeRole}
                    </span>
                  </div>

                  {/* Field 4: Official Business Email (node 85:1494) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      OFFICIAL BUSINESS EMAIL
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <svg className="w-3.5 h-3.5 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs font-semibold text-[#4cd7f6] truncate">{provider.email}</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-medium mt-0.5 block">
                      ✓ Domain MX &amp; DMARC Authenticated
                    </span>
                  </div>

                  {/* Field 5: Direct Bahamas Phone Number (node 85:1504) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      DIRECT BAHAMAS TELEPHONY
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <svg className="w-3.5 h-3.5 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-xs font-bold text-[#dfe2ee]">{provider.phone}</span>
                    </div>
                    <span className="text-[11px] text-[#89929b] font-medium mt-0.5 block">
                      Mobile / WhatsApp: +1 (242) 555-4421
                    </span>
                  </div>

                  {/* Field 6: Bahamas RTD License Number (node 85:1514) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      BAHAMAS RTD LICENSE NUMBER
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xs font-mono font-bold text-[#4cd7f6]">{rData.roadTrafficRentalPermitNumber}</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-medium mt-0.5 block">
                      ✓ Ministry of Transport Validated
                    </span>
                  </div>
                </div>

                {/* Field: Registered Physical Depot / Address (node 85:1524) */}
                <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b] text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider">
                      REGISTERED PHYSICAL DEPOT / ADDRESS
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold">📍 Geotagged &amp; Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#dfe2ee] font-medium">
                    <svg className="w-4 h-4 text-[#4cd7f6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{rData.officeLocation}</span>
                  </div>
                </div>

                {/* Field: Fleet Capacity Breakdown (node 85:1534) */}
                <div className="p-3.5 rounded-xl bg-[#141a24] border border-[#222c3b] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider">
                      FLEET CAPACITY BREAKDOWN
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#dfe2ee]">
                        {rData.fleetSize} Total Vehicles Registered
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                        100% GPS Monitored
                      </span>
                    </div>
                  </div>

                  {/* Segmented Capacity Bar Graphic (node 85:1541) */}
                  <div className="w-full h-2.5 rounded-full bg-[#0d1118] overflow-hidden flex">
                    <div className="h-full bg-[#4cd7f6]" style={{ width: '35%' }} title="Sedans (35%)" />
                    <div className="h-full bg-[#3198dc]" style={{ width: '45%' }} title="4x4 SUVs (45%)" />
                    <div className="h-full bg-[#ffb95f]" style={{ width: '20%' }} title="Island Jeeps (20%)" />
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-[#89929b] pt-0.5 font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#4cd7f6]" />
                      <span>Sedans (35%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#3198dc]" />
                      <span>4x4 SUVs (45%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ffb95f]" />
                      <span>Island Jeeps (20%)</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ═══ SECTION 3: COMPLIANCE VERIFICATION DOCUMENTS & LICENSES (node 85:1567) ═══ */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h4 className="text-xs font-bold text-[#dfe2ee] uppercase tracking-wider m-0">
                COMPLIANCE VERIFICATION DOCUMENTS &amp; LICENSES
              </h4>
            </div>

            {/* 3 Document Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Card 1: Official Bahamas Rental License Certificate (node 85:1575) */}
              <div className="rounded-2xl bg-[#0d1118] border border-[#1f2735] overflow-hidden flex flex-col justify-between shadow-md">
                <div className="relative h-40 bg-[#151c27] overflow-hidden group">
                  <img
                    src={imgLicensePreview}
                    alt="Official Bahamas Rental License Certificate"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1118] via-transparent to-transparent" />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    MOT Validated
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-xs font-bold text-[#dfe2ee] block">
                      Bahamas Rental Operator License
                    </span>
                    <span className="text-[11px] text-[#89929b]">
                      RTD Permit #{rData.roadTrafficRentalPermitNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDocPreview('Official Commonwealth of The Bahamas Ministry of Transport Commercial Car Rental Operator License Certificate document')}
                    className="w-full py-2 px-3 rounded-lg bg-[#18202d] hover:bg-[#222c3d] text-[#4cd7f6] text-xs font-bold border border-[#263347] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>Inspect Certificate</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Fleet Roadworthiness & Annual Inspection Record (node 85:1589) */}
              <div className="rounded-2xl bg-[#0d1118] border border-[#1f2735] overflow-hidden flex flex-col justify-between shadow-md">
                <div className="relative h-40 bg-[#151c27] overflow-hidden flex items-center justify-center p-3">
                  <img
                    src={imgRoadworthyPreview}
                    alt="Fleet Roadworthiness Records"
                    className="max-h-full object-contain filter drop-shadow"
                    onError={(e) => {
                      const target = e.currentTarget
                      target.style.display = 'none'
                      if (target.parentElement) {
                        target.parentElement.innerHTML = '<div class="flex gap-2"><div class="w-10 h-10 rounded-full bg-[#4cd7f6]/20 border border-[#4cd7f6] flex items-center justify-center text-[#4cd7f6] text-xs font-bold">2024</div><div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 text-xs font-bold">2025</div></div>'
                      }
                    }}
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    22 Discs Current
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-xs font-bold text-[#dfe2ee] block">
                      Fleet Roadworthiness Records
                    </span>
                    <span className="text-[11px] text-[#89929b]">
                      All 22 Vehicles Inspected &amp; Certified
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDocPreview('Fleet Annual Roadworthiness & Safety Inspection Certificate Discs')}
                    className="w-full py-2 px-3 rounded-lg bg-[#18202d] hover:bg-[#222c3d] text-[#4cd7f6] text-xs font-bold border border-[#263347] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>View Inspection Discs</span>
                  </button>
                </div>
              </div>

              {/* Card 3: Commercial Fleet Liability Certificate (node 85:1617) */}
              <div className="rounded-2xl bg-[#0d1118] border border-[#1f2735] overflow-hidden flex flex-col justify-between shadow-md">
                <div className="p-5 flex flex-col justify-between h-40 bg-gradient-to-br from-[#141b26] to-[#0d1118]">
                  <div className="flex items-center justify-between">
                    <span className="text-xl">🛡️</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rData.insuranceExpiry.includes('Expired')
                        ? 'bg-red-950/80 border border-red-500 text-red-300'
                        : 'bg-emerald-950/80 border border-emerald-500 text-emerald-300'
                    }`}>
                      {rData.insuranceExpiry.includes('Expired') ? 'Policy Expired' : 'Active ($2M BSD)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#dfe2ee] block">
                      Commercial Fleet Liability Certificate
                    </span>
                    <span className="text-[11px] font-mono text-[#89929b] block mt-0.5">
                      Policy #{rData.commercialFleetInsurancePolicy}
                    </span>
                    <span className="text-[10px] text-[#89929b] block">
                      Expires: {rData.insuranceExpiry}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <button
                    type="button"
                    onClick={() => setDocPreview('Commercial Fleet Master Liability & Comprehensive Collision Policy Certificate')}
                    className="w-full py-2 px-3 rounded-lg bg-[#18202d] hover:bg-[#222c3d] text-[#4cd7f6] text-xs font-bold border border-[#263347] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View Liability Policy</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Document Preview Box */}
          {docPreview && (
            <div className="p-4 rounded-xl bg-[#141e2c] border border-[#4cd7f6]/40 flex items-center justify-between text-xs animate-fadeIn">
              <div className="flex items-center gap-2 text-[#4cd7f6]">
                <span className="text-base">📄</span>
                <span className="font-bold">Document Inspector: {docPreview}</span>
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
                placeholder="Specify reasons for rejecting this rental provider (e.g. Expired commercial fleet insurance policy, incomplete RTD permit)..."
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
                Request Information / Updated Certificates
              </h4>
              <textarea
                value={infoNote}
                onChange={(e) => setInfoNote(e.target.value)}
                placeholder="Explain what updated documents or certificates are required from this rental agency..."
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
                  Send Notice to Agency
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ═══ MODAL FOOTER ACTION BAR (node 85:1628) ═══════════════════════ */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#0a0e16] border-t border-[#1f2735]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#18202d] hover:bg-[#222c3d] text-[#dfe2ee] text-xs font-bold border border-[#263347] cursor-pointer transition-colors"
          >
            Close Window
          </button>

          {/* Action CTA Buttons (node 85:1629) */}
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

                {/* Reject Application Button (node 85:1630) */}
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

                {/* Approve Button (node 85:1634) */}
                <button
                  type="button"
                  onClick={() => onApprove(provider.id)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#3198dc] hover:bg-[#45a4e3] text-[#002c47] text-xs font-extrabold border-0 cursor-pointer transition-colors shadow-lg shadow-[#3198dc]/20"
                >
                  <svg className="w-4 h-4 text-[#002c47]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Approve</span>
                </button>
              </>
            )}

            {provider.status === 'Approved' && (
              <button
                type="button"
                onClick={() => onReject(provider.id, 'Administrative suspension')}
                className="px-4 py-2 rounded-xl bg-red-950/50 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold cursor-pointer"
              >
                Revoke / Suspend Provider
              </button>
            )}

            {provider.status === 'Rejected' && (
              <button
                type="button"
                onClick={() => onApprove(provider.id)}
                className="px-4 py-2 rounded-xl bg-[#3198dc] hover:bg-[#45a4e3] text-[#002c47] text-xs font-bold border-0 cursor-pointer"
              >
                Re-Approve Rental Operator
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
