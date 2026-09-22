import { useState } from 'react'

// ── Asset URLs (Figma-sourced) ─────────────────────────────────────────────
const imgVillaEmblem = 'https://www.figma.com/api/mcp/asset/886cd796-e4d9-44bf-b3ae-21409b1a1774'
const imgTinCertificate = 'https://www.figma.com/api/mcp/asset/cf7fe035-b0d8-4e3f-82e3-677932943e24'
const imgPassportPreview = 'https://www.figma.com/api/mcp/asset/6087df06-034e-40c8-a1df-f4c4dd2fe71f'

export interface PropertyOwnerData {
  ownerName: string
  nibNumber: string
  businessName: string
  propertyTitle: string
  propertyType: string
  propertyAddress: string
  settlement: string
  island: string
  bedroomCount: number
  bathroomCount: number
  maxGuests: number
  nightlyRate: number
  currency: string
  securityDeposit: number
  minimumStayNights: number
  amenities: string[]
  tourismRegNumber: string
  tourismRegDocStatus: 'Verified' | 'Pending Review' | 'Expired'
  proofOfOwnershipDoc: string
  businessLicenseNumber: string
  taxComplianceCertStatus: 'Valid' | 'Pending'
  insurancePolicyNumber: string
  insuranceExpiry: string
  fireSafetyCertified: boolean
  healthSanitationRating: string
  payoutAccount: string
  inventorySummary?: string
  sqFootage?: string
  ownerRole?: string
}

export interface PropertyOwnerModalProps {
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
    propertyData?: PropertyOwnerData
  }
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string, reason?: string) => void
  onRequestInfo?: (id: string, note?: string) => void
}

export default function PropertyOwnerReviewModal({
  provider,
  onClose,
  onApprove,
  onReject,
  onRequestInfo,
}: PropertyOwnerModalProps) {
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectBox, setShowRejectBox] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(false)
  const [infoNote, setInfoNote] = useState('')
  const [docPreview, setDocPreview] = useState<string | null>(null)

  const defaultPropertyData: PropertyOwnerData = {
    ownerName: provider.name.includes('Coral') ? 'Sean Cartwright' : 'Alexander & Elena Forbes',
    ownerRole: 'Managing Principal & Bahamian Resident Owner',
    nibNumber: 'NIB-8829-1049',
    businessName: `${provider.name} Hospitality Ltd.`,
    propertyTitle: provider.name.includes('Villa') ? provider.name : `${provider.name} Luxury Oceanfront Villa Estates`,
    propertyType: 'Luxury Beachfront Villa & Resort Residence',
    propertyAddress: 'Pelican Beach Road, George Town, Exuma, Commonwealth of The Bahamas',
    settlement: 'George Town / Tar Bay',
    island: provider.hub || 'Exuma',
    bedroomCount: 6,
    bathroomCount: 7,
    maxGuests: 12,
    nightlyRate: 1850,
    currency: 'BSD / USD',
    securityDeposit: 1500,
    minimumStayNights: 3,
    inventorySummary: '4 Oceanfront Villas, Private Deep-Water Dockage & Helipad',
    sqFootage: '6 Bedrooms, 7 Baths, 8,200 sq.ft Primary Villa',
    amenities: [
      'Private Oceanfront Beach Access',
      'Infinity Edge Saltwater Pool & Spa',
      'High-Speed Starlink Internet',
      'Backup Generator (125kVA)',
      'Commercial Reverse Osmosis Water Unit',
      'Private Boat Dockage',
    ],
    tourismRegNumber: 'MOT-EXU-2024-7193',
    tourismRegDocStatus: provider.status === 'Approved' ? 'Verified' : 'Pending Review',
    proofOfOwnershipDoc: 'Deed of Conveyance & Title Certificate (Vol. 5104 / Pg. 112)',
    businessLicenseNumber: 'BL-NIB-2024-71930',
    taxComplianceCertStatus: 'Valid',
    insurancePolicyNumber: 'BS-LGT-PROP-719301',
    insuranceExpiry: 'Dec 31, 2025',
    fireSafetyCertified: true,
    healthSanitationRating: 'Grade A - Luxury Vacation Rental Standard',
    payoutAccount: 'FirstCaribbean Int. Bank (FCIB) •••• 7193',
  }

  const pData = provider.propertyData || defaultPropertyData

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-[1152px] bg-[#111620] border border-[#262e3d] rounded-2xl shadow-2xl overflow-hidden max-h-[94vh]">
        
        {/* Top Decorative Ambient Highlight Bar */}
        <div className="w-full h-1 bg-gradient-to-r from-[#03b5d3] via-[#4cd7f6] to-[#ffb95f]" />

        {/* ═══ MODAL HEADER (node 85:1135) ══════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 bg-[#0d1118] border-b border-[#1f2735]">
          
          {/* Header Left Badges & Title */}
          <div className="flex flex-col text-left">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              
              {/* Status Pill with Pulsing Dot (node 85:1139) */}
              {provider.status === 'Pending' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ca8100]/20 border border-[#ca8100]/40 text-[#ffb95f] text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f] animate-pulse" />
                  PENDING REGISTRATION REVIEW
                </span>
              )}
              {provider.status === 'Approved' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#4cd7f6]/15 border border-[#4cd7f6]/40 text-[#4cd7f6] text-[11px] font-bold">
                  ✓ VERIFIED PROPERTY OWNER
                </span>
              )}
              {provider.status === 'Rejected' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-[11px] font-bold">
                  ✕ REJECTED APPLICATION
                </span>
              )}

              <span className="text-[#3f4850]">•</span>
              <span className="font-mono text-xs text-[#4cd7f6] font-semibold">
                ID: {provider.providerId}
              </span>
              <span className="text-[#3f4850]">•</span>
              <span className="text-xs text-[#89929b]">
                Submitted: {provider.submittedDate || '1 day ago'}
              </span>
              <span className="text-[#3f4850]">•</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#18202d] border border-[#263347] text-[11px] text-[#dfe2ee]">
                🏝️ {pData.island} Hub, Bahamas
              </span>
            </div>

            {/* Modal Heading (node 85:1154) */}
            <h2 className="text-lg sm:text-2xl font-black text-[#dfe2ee] tracking-tight m-0 mt-1">
              {pData.propertyTitle}
            </h2>
          </div>

          {/* Close Action Button (node 85:1160) */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#1f2735] border border-transparent hover:border-[#2a3548] transition-colors cursor-pointer self-start sm:self-auto"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ═══ MODAL CONTENT BODY (node 85:1164) ════════════════════════════ */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-left">
          
          {/* ═══ SECTION: PROPERTY & ENTITY INFORMATION (node 85:1165) ════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Left Column: Property Asset Brand Card (node 85:1166) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-[#0d1118] border border-[#1f2735] flex flex-col items-center text-center relative overflow-hidden">
                
                {/* Emblem Logo (node 85:1181) */}
                <div className="relative w-36 h-36 rounded-2xl bg-gradient-to-b from-[#18202d] to-[#0d1118] border border-[#2e3b4e] p-3 flex items-center justify-center shadow-xl mb-3">
                  <img
                    src={imgVillaEmblem}
                    alt={pData.propertyTitle}
                    className="w-full h-full object-contain filter drop-shadow"
                    onError={(e) => {
                      const target = e.currentTarget
                      target.style.display = 'none'
                      if (target.parentElement) {
                        target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center font-black text-2xl text-[#ffddb8]">🏝️ VILLA</div>'
                      }
                    }}
                  />
                </div>

                {/* Asset Classification Pill (node 85:1168) */}
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#ffb95f]/10 border border-[#ffb95f]/30 text-[#ffb95f] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                  LUXURY SHORT-TERM RESIDENCE
                </div>

                {/* Heading 2 Property Geography (node 85:1170) */}
                <h3 className="text-base font-black text-[#dfe2ee] m-0 leading-tight">
                  {pData.propertyTitle}
                </h3>

                {/* Location Tag (node 85:1173) */}
                <div className="flex items-center gap-1 text-xs text-[#89929b] font-medium mt-1.5">
                  <svg className="w-3.5 h-3.5 text-[#4cd7f6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>Pelican Beach Road, George Town, Exuma</span>
                </div>

                {/* MOT Reg Badge (node 85:1179) */}
                <div className="w-full mt-3.5 p-2 rounded-xl bg-[#141a24] border border-[#222c3b] text-center">
                  <span className="text-[11px] font-mono font-bold text-[#4cd7f6]">
                    Ministry of Tourism Reg #{pData.tourismRegNumber}
                  </span>
                </div>

              </div>
            </div>

            {/* Right Column: Registration & Legal Details Grid (node 85:1184) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-[#0d1118] border border-[#1f2735] space-y-4">
                
                {/* Entity Trade Header (node 85:1185) */}
                <div className="pb-3 border-b border-[#1f2735]">
                  <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                    COMMERCIAL OPERATING ENTITY
                  </span>
                  <h4 className="text-base font-black text-[#dfe2ee] m-0 mt-0.5">
                    {pData.businessName}
                  </h4>
                  <span className="text-[11px] text-emerald-400 font-medium block mt-0.5">
                    ✓ Registrar General Department Incorporated • Good Standing
                  </span>
                </div>

                {/* Two Column Specifications (6 Fields) (node 85:1193) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  
                  {/* Field 1: Owner Identity (node 85:1194) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      REGISTERED PRINCIPAL OWNER
                    </span>
                    <span className="text-sm font-bold text-[#dfe2ee] mt-0.5 block">
                      {pData.ownerName}
                    </span>
                    <span className="text-[11px] text-[#89929b] mt-0.5 block">
                      {pData.ownerRole || 'Managing Principal & Bahamian Resident Owner'}
                    </span>
                  </div>

                  {/* Field 2: Work Email (node 85:1201) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      OFFICIAL BUSINESS EMAIL
                    </span>
                    <span className="text-xs font-semibold text-[#4cd7f6] mt-0.5 block truncate">
                      {provider.email}
                    </span>
                    <span className="text-[11px] text-emerald-400 mt-0.5 block">
                      ✓ Domain MX &amp; DMARC Verified
                    </span>
                  </div>

                  {/* Field 3: Direct Phones (node 85:1210) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      DIRECT BAHAMAS CONTACT NUMBERS
                    </span>
                    <span className="text-xs font-bold text-[#dfe2ee] mt-0.5 block">
                      {provider.phone}
                    </span>
                    <span className="text-[11px] text-[#89929b] mt-0.5 block">
                      Mobile / Concierge Desk (24/7 Monitored)
                    </span>
                  </div>

                  {/* Field 4: Physical Location (node 85:1215) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      PHYSICAL ESTATE ADDRESS
                    </span>
                    <span className="text-xs font-medium text-[#dfe2ee] mt-0.5 block">
                      {pData.propertyAddress}
                    </span>
                  </div>

                  {/* Field 5: Property Type & Spec (node 85:1220) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      PROPERTY TYPE &amp; INVENTORY
                    </span>
                    <span className="text-xs font-bold text-[#dfe2ee] mt-0.5 block">
                      {pData.propertyType}
                    </span>
                    <span className="text-[11px] text-[#89929b] mt-0.5 block">
                      {pData.inventorySummary || '4 Oceanfront Villas, Private Dockage & Helipad'}
                    </span>
                  </div>

                  {/* Field 6: Valuation & Size (node 85:1227) */}
                  <div className="p-3 rounded-xl bg-[#141a24] border border-[#222c3b]">
                    <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider block">
                      PROPERTY VALUATION &amp; FOOTPRINT
                    </span>
                    <span className="text-xs font-bold text-[#ffb95f] mt-0.5 block">
                      {pData.sqFootage || `${pData.bedroomCount} Bedrooms, ${pData.bathroomCount} Baths`}
                    </span>
                    <span className="text-[11px] text-[#4cd7f6] mt-0.5 block">
                      Nightly: ${pData.nightlyRate} {pData.currency}
                    </span>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* ═══ SECTION: COMPLIANCE VERIFICATION DOCUMENTS (node 85:1232) ════ */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#4cd7f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h4 className="text-xs font-bold text-[#dfe2ee] uppercase tracking-wider m-0">
                COMPLIANCE VERIFICATION DOCUMENTS (3 REQUIRED FILES)
              </h4>
            </div>

            {/* 3 Document Cards Grid (node 85:1240) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Card 1: Taxpayer Identification Certificate (node 85:1241) */}
              <div className="rounded-2xl bg-[#0d1118] border border-[#1f2735] overflow-hidden flex flex-col justify-between shadow-md">
                <div className="relative h-36 bg-[#151c27] overflow-hidden group">
                  <img
                    src={imgTinCertificate}
                    alt="Taxpayer Identification Certificate"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1118] via-transparent to-transparent" />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    TIN Validated
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h5 className="text-xs font-bold text-[#dfe2ee] m-0">
                      Taxpayer Identification (TIN)
                    </h5>
                    <span className="text-[10px] text-[#89929b]">
                      Ministry of Finance DIR Certificate
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDocPreview('Commonwealth of The Bahamas Ministry of Finance Department of Inland Revenue Taxpayer Identification Number (TIN) Certificate')}
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

              {/* Card 2: Government ID & Passport (node 85:1254) */}
              <div className="rounded-2xl bg-[#0d1118] border border-[#1f2735] overflow-hidden flex flex-col justify-between shadow-md">
                <div className="relative h-36 bg-[#151c27] overflow-hidden group">
                  <img
                    src={imgPassportPreview}
                    alt="Bahamas Passport & ID"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1118] via-transparent to-transparent" />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    Biometric Verified
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h5 className="text-xs font-bold text-[#dfe2ee] m-0">
                      Bahamas Passport &amp; ID
                    </h5>
                    <span className="text-[10px] text-[#89929b]">
                      Registered Principal Owner Biometric Card
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDocPreview('Official Commonwealth of The Bahamas Passport Biographical Data Page & Biometric ID')}
                    className="w-full py-2 px-3 rounded-lg bg-[#18202d] hover:bg-[#222c3d] text-[#4cd7f6] text-xs font-bold border border-[#263347] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    <span>Inspect Government ID</span>
                  </button>
                </div>
              </div>

              {/* Card 3: Bahamas Tourism License (node 85:1268) */}
              <div className="rounded-2xl bg-[#0d1118] border border-[#1f2735] overflow-hidden flex flex-col justify-between shadow-md">
                <div className="p-4 flex flex-col justify-between h-36 bg-gradient-to-br from-[#141b26] to-[#0d1118]">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🏖️</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 border border-emerald-500 text-emerald-300">
                      Active MOT #{pData.tourismRegNumber}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#dfe2ee] m-0">
                      Tourism Board License
                    </h5>
                    <span className="text-[10px] text-[#89929b] block mt-0.5">
                      Short-Term Vacation Rental Act 2024
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <button
                    type="button"
                    onClick={() => setDocPreview('Bahamas Ministry of Tourism Official Short-Term Vacation Rental Operator License')}
                    className="w-full py-2 px-3 rounded-lg bg-[#18202d] hover:bg-[#222c3d] text-[#4cd7f6] text-xs font-bold border border-[#263347] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>View Tourism License</span>
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
                placeholder="Specify reasons for rejecting this property owner application (e.g. Expired Ministry of Tourism registration, incomplete title deed)..."
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
                placeholder="Explain what updated property title deeds or Tourism licenses are required from this owner..."
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
                  Send Notice to Owner
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ═══ MODAL FOOTER ACTION BAR (node 85:1280) ═══════════════════════ */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#0a0e16] border-t border-[#1f2735]">
          
          {/* Explanatory Status Note (node 85:1281) */}
          <div className="flex items-center gap-2 text-xs text-[#89929b] font-medium">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Bahamas Vacation Homes Act 2024 &amp; Ministry of Tourism Short-Term Rental Verified</span>
          </div>

          {/* Action CTA Buttons (node 85:1287) */}
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

                {/* Reject Application Button (node 85:1288) */}
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

                {/* Approve Property Owner Button (node 85:1292) */}
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
                Revoke / Suspend Property Owner
              </button>
            )}

            {provider.status === 'Rejected' && (
              <button
                type="button"
                onClick={() => onApprove(provider.id)}
                className="px-4 py-2 rounded-xl bg-[#3198dc] hover:bg-[#45a4e3] text-[#002c47] text-xs font-bold border-0 cursor-pointer"
              >
                Re-Approve Property Owner
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
