import { useState } from 'react'

// ── Asset URLs (Figma-sourced) ─────────────────────────────────────────────
const imgDriverHeadshot = 'https://www.figma.com/api/mcp/asset/f5b1b1c6-2828-4d84-aa30-2bbb86864936'
const imgNationalIdPreview = 'https://www.figma.com/api/mcp/asset/2b45a522-6340-415e-b081-03e36d25a129'
const imgLicensePreview = 'https://www.figma.com/api/mcp/asset/8b7bca00-f9fb-4abe-a6a1-7357e288a85f'
const imgVehiclePhoto = 'https://www.figma.com/api/mcp/asset/9c9c6d74-7e5c-4dec-a094-12c6725d38fe'
const imgInspectionDisc = 'https://www.figma.com/api/mcp/asset/fa3901c1-94b8-47a3-8cc2-d8db2fac2377'

export interface DriverData {
  driverLicenseNumber: string
  driverLicenseClass: string
  driverLicenseExpiry: string
  nibNumber: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: number
  vehicleColor: string
  licensePlate: string
  vehicleType: string
  seatingCapacity: number
  policeRecordDocStatus: 'Clear / Verified' | 'Pending Verification' | 'Flagged'
  insurancePolicyNumber: string
  insuranceExpiry: string
  roadTrafficInspectionDate: string
  inspectionExpiry: string
  operatingZone: string
  rating?: number
  completedTrips?: number
  fullLegalName?: string
}

export interface DriverModalProps {
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
    driverData?: DriverData
  }
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string, reason?: string) => void
  onRequestInfo?: (id: string, note?: string) => void
}

export default function DriverReviewModal({
  provider,
  onClose,
  onApprove,
  onReject,
  onRequestInfo,
}: DriverModalProps) {
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectBox, setShowRejectBox] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(false)
  const [infoNote, setInfoNote] = useState('')
  const [docPreview, setDocPreview] = useState<string | null>(null)

  const defaultDriverData: DriverData = {
    fullLegalName: provider.name.includes('Rolle') ? 'Marcus Anthony Rolle' : `${provider.name} Christie`,
    driverLicenseNumber: 'BS-DL-8921-9902',
    driverLicenseClass: 'Class B (Public Service Vehicle Endorsed)',
    driverLicenseExpiry: 'Nov 14, 2026',
    nibNumber: 'NIB-8821-0029',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry Hybrid (Executive Class)',
    vehicleYear: 2023,
    vehicleColor: 'Ocean Silver Metallic',
    licensePlate: 'TX-8921',
    vehicleType: 'Executive Sedan / Airport Express',
    seatingCapacity: 4,
    policeRecordDocStatus: 'Clear / Verified',
    insurancePolicyNumber: 'BS-BAH-AUTO-44019',
    insuranceExpiry: 'Dec 15, 2025',
    roadTrafficInspectionDate: 'Oct 01, 2024',
    inspectionExpiry: 'Oct 01, 2025',
    operatingZone: `${provider.hub || 'Nassau'} Metro & Lynden Pindling International Airport (LPIA)`,
    rating: 4.95,
    completedTrips: 184,
  }

  const dData = provider.driverData || defaultDriverData

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-[1152px] bg-[#111620] border border-[#262e3d] rounded-2xl shadow-2xl overflow-hidden max-h-[94vh]">
        
        {/* Top Decorative Highlight Ambient Bar (node 85:2429) */}
        <div className="w-full h-1 bg-gradient-to-r from-[#03b5d3] via-[#4cd7f6] to-[#3198dc]" />

        {/* ═══ MODAL HEADER (node 85:2430) ══════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 bg-[#0d1118] border-b border-[#1f2735]">
          
          {/* Header Left Info */}
          <div className="flex flex-col text-left">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-[#4cd7f6] uppercase tracking-wider">
                DRIVER ONBOARDING
              </span>
              <span className="text-[#3f4850]">•</span>
              <span className="font-mono text-xs text-[#89929b] font-semibold">
                ID: {provider.providerId}
              </span>
              <span className="text-[#3f4850]">•</span>
              {provider.status === 'Pending' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ca8100]/20 border border-[#ca8100]/40 text-[#ffb95f] text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f] animate-pulse" />
                  PENDING REVIEW
                </span>
              )}
              {provider.status === 'Approved' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#4cd7f6]/15 border border-[#4cd7f6]/40 text-[#4cd7f6] text-[11px] font-bold">
                  ✓ VERIFIED DRIVER
                </span>
              )}
              {provider.status === 'Rejected' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-[11px] font-bold">
                  ✕ REJECTED APPLICATION
                </span>
              )}
            </div>

            {/* Heading 2 Title (node 85:2446) */}
            <h2 className="text-lg sm:text-2xl font-black text-[#dfe2ee] tracking-tight m-0 mt-1">
              {provider.name} — Driver Registration Application
            </h2>
          </div>

          {/* Header Right Hub & Close */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#89929b] font-medium bg-[#141a24] border border-[#222c3b] px-3 py-1.5 rounded-lg">
              <svg className="w-3.5 h-3.5 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span>{provider.hub} Hub • {provider.submittedDate || '2 hours ago'}</span>
            </div>

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
        </div>

        {/* ═══ MODAL BODY (2-COLUMN STRUCTURE) (node 85:2461) ═══════════════ */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* ═══ LEFT COLUMN: DRIVER PORTRAIT & CORE APPLICANT IDENTITY (node 85:2463) ═══ */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-4 rounded-2xl bg-[#0d1118] border border-[#1f2735] space-y-4">
                
                {/* Driver Headshot & Badges (node 85:2465) */}
                <div className="flex items-center gap-3.5">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#18202d] border border-[#2e3b4e] shrink-0 shadow-inner group">
                    <img
                      src={imgDriverHeadshot}
                      alt={provider.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget
                        target.style.display = 'none'
                        if (target.parentElement) {
                          target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center font-bold text-xl text-[#4cd7f6]">MR</div>'
                        }
                      }}
                    />
                  </div>

                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider">
                      COMMERCIAL TAXI / PSV
                    </span>
                    <h3 className="text-base font-black text-[#dfe2ee] m-0 mt-0.5">
                      {provider.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xs font-bold text-[#ffb95f]">⭐ {dData.rating || 4.95}</span>
                      <span className="text-[#3f4850]">•</span>
                      <span className="text-[11px] text-[#89929b] font-medium">{dData.completedTrips || 184} Rides</span>
                    </div>
                    <div className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Active Dispatch Status</span>
                    </div>
                  </div>
                </div>

                {/* Identity Details Stack (node 85:2481) */}
                <div className="space-y-2.5 pt-2 border-t border-[#1f2735] text-xs">
                  
                  {/* Full Legal Name (node 85:2482) */}
                  <div className="p-2.5 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      FULL LEGAL NAME
                    </span>
                    <span className="text-xs font-bold text-[#dfe2ee] mt-0.5 block">
                      {dData.fullLegalName || provider.name}
                    </span>
                  </div>

                  {/* Email Address (node 85:2487) */}
                  <div className="p-2.5 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      EMAIL ADDRESS
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#4cd7f6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs font-semibold text-[#4cd7f6] truncate">{provider.email}</span>
                    </div>
                  </div>

                  {/* Bahamas Phone Number (node 85:2495) */}
                  <div className="p-2.5 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider">
                        BAHAMAS PHONE NUMBER
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold">WhatsApp Verified</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#4cd7f6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a11.042 11.042 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-xs font-bold text-[#dfe2ee]">{provider.phone}</span>
                    </div>
                  </div>

                  {/* Driving License Number (node 85:2506) */}
                  <div className="p-2.5 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider">
                        DRIVING LICENSE NUMBER
                      </span>
                      <span className="text-[10px] font-bold text-[#4cd7f6] bg-[#4cd7f6]/10 px-1.5 py-0.5 rounded border border-[#4cd7f6]/30">
                        Class B • PSV
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-0.5">
                      <span className="text-xs font-mono font-bold text-[#dfe2ee]">{dData.driverLicenseNumber}</span>
                      <span className="text-[10px] text-emerald-400">Exp: {dData.driverLicenseExpiry}</span>
                    </div>
                  </div>

                  {/* Bahamas National ID Number (node 85:2517) */}
                  <div className="p-2.5 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider">
                        BAHAMAS NATIONAL ID (NIB)
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400">Verified</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#dfe2ee] mt-0.5 block">
                      {dData.nibNumber}
                    </span>
                  </div>

                </div>

              </div>
            </div>

            {/* ═══ RIGHT COLUMN: DOCUMENT PHOTO CARDS & VEHICLE DETAILS (node 85:2528) ═══ */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              
              {/* ── SECTION A: DOCUMENT PHOTO CARDS (node 85:2529) ── */}
              <div className="p-4 rounded-2xl bg-[#0d1118] border border-[#1f2735] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h4 className="text-xs font-bold text-[#dfe2ee] uppercase tracking-wider m-0">
                      GOVERNMENT IDENTIFICATION &amp; DRIVING LICENSE
                    </h4>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400">
                    Both Documents Validated
                  </span>
                </div>

                {/* 2 Document Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  {/* Bahamas National ID (NIB) Photo Preview (node 85:2539) */}
                  <div className="rounded-xl bg-[#141a24] border border-[#222c3b] overflow-hidden flex flex-col justify-between shadow-sm">
                    <div className="p-2.5 flex items-center justify-between border-b border-[#1f2735]">
                      <div className="flex items-center gap-1.5 text-xs text-[#dfe2ee] font-semibold">
                        <svg className="w-3.5 h-3.5 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                        </svg>
                        <span>National Insurance Card (NIB)</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">NIB Valid</span>
                    </div>
                    <div className="relative h-28 bg-[#18202d] overflow-hidden group">
                      <img
                        src={imgNationalIdPreview}
                        alt="NIB Preview"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-2">
                        <span className="text-[10px] font-mono text-[#dfe2ee]">{dData.nibNumber}</span>
                        <button
                          type="button"
                          onClick={() => setDocPreview('Bahamas National Insurance Board (NIB) Smart ID Card')}
                          className="px-2 py-0.5 rounded bg-[#3198dc] text-[#002c47] text-[10px] font-bold cursor-pointer border-0"
                        >
                          Inspect
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bahamas Driving License Photo Preview (node 85:2555) */}
                  <div className="rounded-xl bg-[#141a24] border border-[#222c3b] overflow-hidden flex flex-col justify-between shadow-sm">
                    <div className="p-2.5 flex items-center justify-between border-b border-[#1f2735]">
                      <div className="flex items-center gap-1.5 text-xs text-[#dfe2ee] font-semibold">
                        <svg className="w-3.5 h-3.5 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        <span>Commercial PSV Driving License</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">Class B Certified</span>
                    </div>
                    <div className="relative h-28 bg-[#18202d] overflow-hidden group">
                      <img
                        src={imgLicensePreview}
                        alt="License Preview"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-2">
                        <span className="text-[10px] font-mono text-[#dfe2ee]">{dData.driverLicenseNumber}</span>
                        <button
                          type="button"
                          onClick={() => setDocPreview('Commonwealth of The Bahamas Official Public Service Driver License')}
                          className="px-2 py-0.5 rounded bg-[#3198dc] text-[#002c47] text-[10px] font-bold cursor-pointer border-0"
                        >
                          Inspect
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* ── SECTION B: VEHICLE DETAILS & INSPECTION MEDIA (node 85:2571) ── */}
              <div className="p-4 rounded-2xl bg-[#0d1118] border border-[#1f2735] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <h4 className="text-xs font-bold text-[#dfe2ee] uppercase tracking-wider m-0">
                      REGISTERED DISPATCH VEHICLE
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                    Inspection Valid thru {dData.inspectionExpiry}
                  </span>
                </div>

                {/* Vehicle Meta Header (node 85:2580) */}
                <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#dfe2ee]">
                        {dData.vehicleYear} {dData.vehicleMake} {dData.vehicleModel}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#4cd7f6]/15 border border-[#4cd7f6]/30 text-[#4cd7f6] text-[10px] font-bold font-mono">
                        {dData.licensePlate}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#89929b] block mt-0.5">
                      {dData.vehicleColor} • {dData.vehicleType}
                    </span>
                  </div>

                  <div className="px-3 py-1 rounded-lg bg-[#18202d] border border-[#263347] text-xs font-semibold text-[#dfe2ee] self-start sm:self-auto">
                    {dData.seatingCapacity} Passengers • Climate Controlled AC
                  </div>
                </div>

                {/* Vehicle Photo & Registration Previews (node 85:2603) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  {/* Vehicle Exterior Photo Preview (node 85:2604) */}
                  <div className="rounded-xl bg-[#141a24] border border-[#222c3b] overflow-hidden flex flex-col justify-between shadow-sm">
                    <div className="p-2.5 flex items-center justify-between border-b border-[#1f2735]">
                      <span className="text-xs text-[#dfe2ee] font-semibold">Vehicle Exterior Condition</span>
                      <span className="text-[10px] text-emerald-400 font-bold">Passed Visual</span>
                    </div>
                    <div className="relative h-28 bg-[#18202d] overflow-hidden group">
                      <img
                        src={imgVehiclePhoto}
                        alt="Vehicle Exterior"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-2">
                        <span className="text-[10px] text-[#89929b]">Plate: {dData.licensePlate}</span>
                        <button
                          type="button"
                          onClick={() => setDocPreview('Commercial Vehicle Exterior Inspection Photograph (Toyota Camry)')}
                          className="px-2 py-0.5 rounded bg-[#3198dc] text-[#002c47] text-[10px] font-bold cursor-pointer border-0"
                        >
                          Inspect
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Registration & Inspection Disc Certificate Preview (node 85:2620) */}
                  <div className="rounded-xl bg-[#141a24] border border-[#222c3b] overflow-hidden flex flex-col justify-between shadow-sm">
                    <div className="p-2.5 flex items-center justify-between border-b border-[#1f2735]">
                      <span className="text-xs text-[#dfe2ee] font-semibold">Road Traffic Inspection Disc</span>
                      <span className="text-[10px] text-emerald-400 font-bold">2025 Current</span>
                    </div>
                    <div className="relative h-28 bg-[#18202d] overflow-hidden group">
                      <img
                        src={imgInspectionDisc}
                        alt="Inspection Disc"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-2">
                        <span className="text-[10px] text-[#89929b]">RTD Seal Verified</span>
                        <button
                          type="button"
                          onClick={() => setDocPreview('Bahamas Road Traffic Department Official Annual Vehicle Inspection Certificate Disc')}
                          className="px-2 py-0.5 rounded bg-[#3198dc] text-[#002c47] text-[10px] font-bold cursor-pointer border-0"
                        >
                          Inspect
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

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
                placeholder="Specify reasons for rejecting this driver (e.g. Expired PSV driving license, roadworthiness inspection expired)..."
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
                Request Driver Documentation Update
              </h4>
              <textarea
                value={infoNote}
                onChange={(e) => setInfoNote(e.target.value)}
                placeholder="Explain what updated driver licenses or vehicle inspection discs are required from this driver..."
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
                  Send Notice to Driver
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ═══ MODAL FOOTER ACTION BAR (node 85:2636) ═══════════════════════ */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#0a0e16] border-t border-[#1f2735]">
          
          {/* Left: Background Check & RTD Notice */}
          <div className="flex items-center gap-2 text-xs text-[#89929b] font-medium">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Royal Bahamas Police Force Background Check &amp; Road Traffic Department Verified</span>
          </div>

          {/* Right: Reject & Approve Buttons (node 85:2637) */}
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

                {/* Reject Application Button (node 85:2638) */}
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

                {/* Approve Driver Button (node 85:2643) */}
                <button
                  type="button"
                  onClick={() => onApprove(provider.id)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#3198dc] hover:bg-[#45a4e3] text-[#002c47] text-xs font-extrabold border-0 cursor-pointer transition-colors shadow-lg shadow-[#3198dc]/20"
                >
                  <svg className="w-4 h-4 text-[#002c47]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Approve Driver</span>
                </button>
              </>
            )}

            {provider.status === 'Approved' && (
              <button
                type="button"
                onClick={() => onReject(provider.id, 'Administrative suspension')}
                className="px-4 py-2 rounded-xl bg-red-950/50 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold cursor-pointer"
              >
                Revoke / Suspend Driver
              </button>
            )}

            {provider.status === 'Rejected' && (
              <button
                type="button"
                onClick={() => onApprove(provider.id)}
                className="px-4 py-2 rounded-xl bg-[#3198dc] hover:bg-[#45a4e3] text-[#002c47] text-xs font-bold border-0 cursor-pointer"
              >
                Re-Approve Driver
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
