import { useState } from 'react'

// ── Asset URLs (Figma-sourced) ─────────────────────────────────────────────
const imgCourierPortrait = 'https://www.figma.com/api/mcp/asset/55f0bfbc-ea88-4b0f-9df7-73f9dace489b'
const imgPoliceRecordThumb = 'https://www.figma.com/api/mcp/asset/49bf6797-f491-4b31-b594-29b0814a68ad'

export interface CourierData {
  courierType: string
  dispatchVehicleType: string
  vehiclePlate: string
  maxPayloadKg: number
  cargoBoxEquipped: boolean
  refrigeratedStorage: boolean
  driverLicenseNumber: string
  portAuthorityAuthNumber: string
  transitInsurancePolicy: string
  policeRecordClearance: string
  primaryServiceHub: string
  availabilityHours: string
  emergencyContact: string
  companyName?: string
  fullLegalName?: string
  experienceYears?: number
}

export interface CourierModalProps {
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
    courierData?: CourierData
  }
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string, reason?: string) => void
  onRequestInfo?: (id: string, note?: string) => void
}

export default function CourierReviewModal({
  provider,
  onClose,
  onApprove,
  onReject,
  onRequestInfo,
}: CourierModalProps) {
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectBox, setShowRejectBox] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(false)
  const [infoNote, setInfoNote] = useState('')
  const [docPreview, setDocPreview] = useState<string | null>(null)

  const defaultCourierData: CourierData = {
    courierType: 'Licensed Commercial Express Courier',
    dispatchVehicleType: 'Heavy-Duty Cargo Motorcycle (250cc) • Insulated Cargo Box',
    vehiclePlate: 'CR-1029 (Grand Bahama Dispatch)',
    maxPayloadKg: 40,
    cargoBoxEquipped: true,
    refrigeratedStorage: true,
    driverLicenseNumber: 'BS-DL-GB-10290',
    portAuthorityAuthNumber: 'GBPA-DISP-2024-1029',
    transitInsurancePolicy: 'BS-TR-INS-10290',
    policeRecordClearance: 'Verified & Clean Record (Freeport HQ)',
    primaryServiceHub: 'Grand Bahama Port Authority & Freeport Industrial Hub',
    availabilityHours: '7:30 AM - 8:30 PM (Express On-Demand)',
    emergencyContact: '+1 (242) 555-9921',
    companyName: 'Island Express Logistics Ltd.',
    fullLegalName: provider.name.includes('Bethel') ? 'Devon Jamal Bethel' : `${provider.name} Cartwright`,
    experienceYears: 6,
  }

  const cData = provider.courierData || defaultCourierData

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-[1024px] bg-[#111620] border border-[#262e3d] rounded-2xl shadow-2xl overflow-hidden max-h-[94vh]">
        
        {/* Top Ambient Glow Line */}
        <div className="w-full h-1 bg-gradient-to-r from-[#4cd7f6] via-[#3198dc] to-[#03b5d3]" />

        {/* ═══ 1. MODAL HEADER (node 85:2184) ═══════════════════════════════ */}
        <div className="flex flex-col gap-3 px-6 pt-5 pb-4 bg-[#0d1118] border-b border-[#1f2735]">
          <div className="flex flex-wrap items-center justify-between gap-3 w-full">
            
            {/* Status Tag and Metadata Pills (node 85:2186) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              
              {/* Status Badge with Pulsing Dot (node 85:2187) */}
              {provider.status === 'Pending' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ca8100]/20 border border-[#ca8100]/40 text-[#ffb95f] text-xs font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f] animate-pulse" />
                  <span>PENDING REGISTRATION REVIEW</span>
                </div>
              )}
              {provider.status === 'Approved' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4cd7f6]/15 border border-[#4cd7f6]/40 text-[#4cd7f6] text-xs font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]" />
                  <span>AUTHORIZED COURIER</span>
                </div>
              )}
              {provider.status === 'Rejected' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-bold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>REJECTED APPLICATION</span>
                </div>
              )}

              {/* Identifier Token (node 85:2192) */}
              <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#18202d] border border-[#263347] text-[#4cd7f6] text-xs font-mono font-bold tracking-wider">
                ID: {provider.providerId}
              </div>

              {/* Submitted Elapsed Time (node 85:2196) */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#89929b] font-medium">
                <svg className="w-3.5 h-3.5 text-[#89929b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Submitted: {provider.submittedDate || '6 hours ago'}</span>
              </div>

              {/* Hub Pill (node 85:2198) */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#18202d] border border-[#263347] text-xs font-medium text-[#dfe2ee]">
                <svg className="w-3 h-3 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>{provider.hub} Hub, Bahamas</span>
              </div>

              {/* Category Pill (node 85:2200) */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#18202d] border border-[#263347] text-xs font-medium text-[#4cd7f6]">
                <span>📦</span>
                <span>Commercial Courier</span>
              </div>
            </div>

            {/* Close Button (node 85:2204) */}
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

          {/* Heading 1 - Modal Title (node 85:2202) */}
          <div className="pt-1 text-left">
            <h2 className="text-xl sm:text-2xl font-black text-[#dfe2ee] tracking-tight m-0">
              Commercial Dispatch Courier Review
            </h2>
            <p className="text-xs text-[#89929b] font-medium m-0 mt-0.5">
              Grand Bahama Port Authority (GBPA) &amp; Road Traffic Department Dispatch Authorization
            </p>
          </div>
        </div>

        {/* ═══ SCROLLABLE MODAL BODY (node 85:2207) ═════════════════════════ */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-left">
          
          {/* ═══ COURIER PROFILE GRID (node 85:2208) ══════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left Column: Portrait & Identity (node 85:2209) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-4 rounded-2xl bg-[#0d1118] border border-[#1f2735] space-y-4">
                
                {/* Courier Portrait (node 85:2211) */}
                <div className="relative h-56 rounded-xl overflow-hidden bg-[#151c27] border border-[#222c3b] shadow-inner group">
                  <img
                    src={imgCourierPortrait}
                    alt={provider.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget
                      target.style.display = 'none'
                      if (target.parentElement) {
                        target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center font-bold text-2xl text-[#4cd7f6]">DB</div>'
                      }
                    }}
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-[#4cd7f6] border border-[#4cd7f6]/30">
                    ID Badge Verified
                  </div>
                </div>

                {/* Identity Metadata (node 85:2213) */}
                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                    COURIER DISPATCH OPERATOR
                  </span>
                  <h3 className="text-lg font-black text-[#dfe2ee] m-0">
                    {provider.name}
                  </h3>
                  <span className="text-xs text-[#4cd7f6] font-semibold block">
                    Certified Dispatch Courier • {cData.experienceYears || 6}+ Yrs Island Delivery
                  </span>
                </div>

              </div>
            </div>

            {/* Right Column: Entity & Fleet Details (node 85:2220) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-[#0d1118] border border-[#1f2735] space-y-4">
                
                {/* Dispatch Entity Header (node 85:2222) */}
                <div className="pb-3 border-b border-[#1f2735]">
                  <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                    DISPATCH ENTITY &amp; FLEET OPERATOR
                  </span>
                  <h4 className="text-base font-extrabold text-[#dfe2ee] m-0 mt-0.5">
                    {cData.companyName || 'Island Express Delivery Ltd.'}
                  </h4>
                </div>

                {/* Information Grid (node 85:2226) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  
                  {/* Field 1: Operational Zone / Island (node 85:2227) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      OPERATIONAL ZONE / ISLAND
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <svg className="w-3.5 h-3.5 text-[#4cd7f6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span className="text-xs font-bold text-[#dfe2ee] truncate">
                        {cData.primaryServiceHub}
                      </span>
                    </div>
                  </div>

                  {/* Field 2: Official Work Email (node 85:2236) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      OFFICIAL WORK EMAIL
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <svg className="w-3.5 h-3.5 text-[#4cd7f6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs font-semibold text-[#4cd7f6] truncate">{provider.email}</span>
                    </div>
                  </div>

                  {/* Field 3: Registered Full Legal Name (node 85:2241) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      REGISTERED FULL LEGAL NAME
                    </span>
                    <span className="text-xs font-bold text-[#dfe2ee] mt-1 block">
                      {cData.fullLegalName || provider.name}
                    </span>
                  </div>

                  {/* Field 4: Direct Business Phone (node 85:2246) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      DIRECT BUSINESS PHONE
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <svg className="w-3.5 h-3.5 text-[#4cd7f6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-xs font-bold text-[#dfe2ee]">{provider.phone}</span>
                    </div>
                  </div>

                  {/* Field 5: Fleet & Transport Specification (node 85:2251) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b] sm:col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider">
                        FLEET &amp; TRANSPORT SPECIFICATION
                      </span>
                      <span className="text-[10px] font-mono text-[#4cd7f6]">{cData.vehiclePlate}</span>
                    </div>
                    <span className="text-xs font-semibold text-[#dfe2ee] block">
                      {cData.dispatchVehicleType} ({cData.maxPayloadKg}kg Max Capacity)
                    </span>
                  </div>

                </div>

                {/* License & Clearance Micro-Panels (node 85:2257) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  
                  {/* Card 1: Port Authority Authorization (node 85:2259) */}
                  <div className="p-3.5 rounded-xl bg-[#141a24] border border-[#4cd7f6]/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                        PORT AUTHORITY AUTHORIZATION
                      </span>
                      <span className="text-xs font-mono font-bold text-[#4cd7f6] mt-0.5 block">
                        {cData.portAuthorityAuthNumber}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium">
                        ✓ Active Dispatch Authority
                      </span>
                    </div>
                    <span className="text-xl">⚓</span>
                  </div>

                  {/* Card 2: Commercial Transit Insurance (node 85:2263) */}
                  <div className="p-3.5 rounded-xl bg-[#141a24] border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                        COMMERCIAL TRANSIT INSURANCE
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400 mt-0.5 block">
                        Policy #{cData.transitInsurancePolicy}
                      </span>
                      <span className="text-[10px] text-[#89929b]">
                        Full Goods in Transit Coverage
                      </span>
                    </div>
                    <span className="text-xl">🛡️</span>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* ═══ DOCUMENTS INSPECTION SECTION (node 85:2268) ══════════════════ */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h4 className="text-xs font-bold text-[#dfe2ee] uppercase tracking-wider m-0">
                  OFFICIAL COMPLIANCE &amp; DRIVER CREDENTIALS
                </h4>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400">
                All 3 Required Documents Verified
              </span>
            </div>

            {/* 3 Document Cards Row (node 85:2277) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Document 1: Commercial Driving License (node 85:2278) */}
              <div className="p-4 rounded-2xl bg-[#0d1118] border border-[#1f2735] flex flex-col justify-between shadow-md space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#18202d] border border-[#2e3b4e] flex items-center justify-center text-lg text-[#4cd7f6]">
                    🪪
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#dfe2ee] m-0">
                      Bahamas Driving License
                    </h5>
                    <span className="text-[10px] text-[#89929b]">
                      Commercial Class B • PSV Endorsed
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDocPreview('Official Bahamas Commercial Driver License (Class B & PSV Endorsement)')}
                  className="w-full py-2 px-3 rounded-lg bg-[#18202d] hover:bg-[#222c3d] text-[#4cd7f6] text-xs font-bold border border-[#263347] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>Inspect License</span>
                </button>
              </div>

              {/* Document 2: Dispatch Permit (node 85:2294) */}
              <div className="p-4 rounded-2xl bg-[#0d1118] border border-[#1f2735] flex flex-col justify-between shadow-md space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#18202d] border border-[#2e3b4e] flex items-center justify-center text-lg text-emerald-400">
                    📜
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#dfe2ee] m-0">
                      Courier Dispatch Permit
                    </h5>
                    <span className="text-[10px] text-[#89929b]">
                      GBPA Authorization #{cData.portAuthorityAuthNumber}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDocPreview('Grand Bahama Port Authority Commercial Courier Dispatch Authorization Permit')}
                  className="w-full py-2 px-3 rounded-lg bg-[#18202d] hover:bg-[#222c3d] text-[#4cd7f6] text-xs font-bold border border-[#263347] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>View Permit</span>
                </button>
              </div>

              {/* Document 3: Police Character Certificate (node 85:2309) */}
              <div className="p-4 rounded-2xl bg-[#0d1118] border border-[#1f2735] flex flex-col justify-between shadow-md space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#18202d] border border-[#2e3b4e] overflow-hidden shrink-0 flex items-center justify-center">
                    <img
                      src={imgPoliceRecordThumb}
                      alt="Police Certificate Thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget
                        target.style.display = 'none'
                        if (target.parentElement) {
                          target.parentElement.innerHTML = '<span class="text-lg">👮‍♂️</span>'
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#dfe2ee] m-0">
                      Police Record (RBPF)
                    </h5>
                    <span className="text-[10px] text-emerald-400">
                      Clean Clearance Certificate
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDocPreview('Royal Bahamas Police Force (RBPF) Official Character & Background Clearance Certificate')}
                  className="w-full py-2 px-3 rounded-lg bg-[#18202d] hover:bg-[#222c3d] text-[#4cd7f6] text-xs font-bold border border-[#263347] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>View Police Record</span>
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
                placeholder="Specify reasons for rejecting this courier (e.g. Incomplete Port Authority authorization, expired vehicle transit insurance)..."
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
                Request Additional Documentation
              </h4>
              <textarea
                value={infoNote}
                onChange={(e) => setInfoNote(e.target.value)}
                placeholder="Explain what updated dispatch permits or insurance certificates are required from this courier..."
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
                  Send Notice to Courier
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ═══ 4. MODAL FOOTER ACTION BANNER (node 85:2324) ══════════════════ */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#0a0e16] border-t border-[#1f2735]">
          
          {/* Left: Informational Dispatch Note (node 85:2325) */}
          <div className="flex items-center gap-2 text-xs text-[#89929b] font-medium">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Grand Bahama Port Authority (GBPA) &amp; Road Traffic Department Authorized Dispatcher</span>
          </div>

          {/* Right: Primary Review Action Buttons (node 85:2331) */}
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

                {/* Reject Application Button (node 85:2332) */}
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

                {/* Approve Courier Button (node 85:2336) */}
                <button
                  type="button"
                  onClick={() => onApprove(provider.id)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#3198dc] hover:bg-[#45a4e3] text-[#002c47] text-xs font-extrabold border-0 cursor-pointer transition-colors shadow-lg shadow-[#3198dc]/20"
                >
                  <svg className="w-4 h-4 text-[#002c47]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Approve Courier</span>
                </button>
              </>
            )}

            {provider.status === 'Approved' && (
              <button
                type="button"
                onClick={() => onReject(provider.id, 'Administrative suspension')}
                className="px-4 py-2 rounded-xl bg-red-950/50 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold cursor-pointer"
              >
                Revoke / Suspend Courier
              </button>
            )}

            {provider.status === 'Rejected' && (
              <button
                type="button"
                onClick={() => onApprove(provider.id)}
                className="px-4 py-2 rounded-xl bg-[#3198dc] hover:bg-[#45a4e3] text-[#002c47] text-xs font-bold border-0 cursor-pointer"
              >
                Re-Approve Courier
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
