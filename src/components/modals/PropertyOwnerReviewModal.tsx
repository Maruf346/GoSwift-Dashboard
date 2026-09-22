import { useState } from 'react'

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
  const [activeTab, setActiveTab] = useState<'overview' | 'property' | 'compliance' | 'documents'>('overview')
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectBox, setShowRejectBox] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(false)
  const [infoNote, setInfoNote] = useState('')
  const [documentPreview, setDocumentPreview] = useState<string | null>(null)

  const defaultPropertyData: PropertyOwnerData = {
    ownerName: provider.name,
    nibNumber: 'NIB-8829-1049',
    businessName: `${provider.name} Holdings Ltd.`,
    propertyTitle: provider.name.includes('Villa') ? provider.name : `${provider.name} Luxury Oceanfront Villa`,
    propertyType: 'Beachfront Luxury Villa & Private Estate',
    propertyAddress: 'Lot 14, Queens Highway, Tar Bay',
    settlement: 'Tar Bay Settlement',
    island: provider.hub || 'Exuma',
    bedroomCount: 4,
    bathroomCount: 4.5,
    maxGuests: 10,
    nightlyRate: 1450,
    currency: 'BSD / USD',
    securityDeposit: 1000,
    minimumStayNights: 3,
    amenities: [
      'Private Oceanfront Beach Access',
      'Infinity Edge Saltwater Pool',
      'High-Speed Starlink Internet',
      'Backup Generator (100kVA)',
      'Reverse Osmosis Water Filtration',
      'Private Dock / Boat Slip',
      'Central Climate Control & AC',
      '24/7 Gated Security Monitoring',
    ],
    tourismRegNumber: 'MOT-EXU-2024-8841',
    tourismRegDocStatus: provider.status === 'Approved' ? 'Verified' : 'Pending Review',
    proofOfOwnershipDoc: 'Deed of Conveyance & Title Certificate (Vol. 4102 / Pg. 88)',
    businessLicenseNumber: 'BL-NIB-2024-99120',
    taxComplianceCertStatus: 'Valid',
    insurancePolicyNumber: 'BS-LGT-PROP-994102',
    insuranceExpiry: 'Dec 31, 2025',
    fireSafetyCertified: true,
    healthSanitationRating: 'Grade A - Luxury Short Term Rental Standard',
    payoutAccount: 'FirstCaribbean Int. Bank (FCIB) •••• 9104',
  }

  const pData = provider.propertyData || defaultPropertyData

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-5xl bg-[#141822] border border-[#2a303c] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh]">
        
        {/* Top Header Glow Bar */}
        <div className="w-full h-1.5 bg-gradient-to-r from-[#03b5d3] via-[#4cd7f6] to-[#ffb95f]" />

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 bg-[#0e121a] border-b border-[#222834]">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1c2230] border border-[#313a4d] overflow-hidden shrink-0 shadow-inner">
              {provider.avatarImage ? (
                <img src={provider.avatarImage} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="font-extrabold text-lg text-[#ffddb8]">
                  {provider.avatarInitials || provider.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            
            <div className="flex flex-col text-left">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-black text-[#dfe2ee] tracking-tight m-0">
                  {pData.propertyTitle}
                </h2>
                {provider.status === 'Pending' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ca8100]/25 border border-[#ca8100]/50 text-[#ffb95f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f] animate-pulse" />
                    PENDING REGISTRATION REVIEW
                  </span>
                )}
                {provider.status === 'Approved' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#4cd7f6]/15 border border-[#4cd7f6]/40 text-[#4cd7f6]">
                    ✓ VERIFIED PROPERTY OWNER
                  </span>
                )}
                {provider.status === 'Rejected' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-950/60 border border-red-500/40 text-red-300">
                    ✕ REJECTED APPLICATION
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#89929b] mt-1 font-medium">
                <span className="font-mono text-[#4cd7f6]">{provider.providerId}</span>
                <span>•</span>
                <span>{pData.island} Hub, Bahamas</span>
                <span>•</span>
                <span>Submitted: {provider.submittedDate || 'Oct 20, 2024'}</span>
                <span>•</span>
                <span className="text-[#dfe2ee]">Bahamas Ministry of Tourism Verified Jurisdiction</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#1f2635] border border-transparent hover:border-[#313a4d] transition-colors cursor-pointer self-start sm:self-auto"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="flex items-center gap-2 px-6 pt-3 bg-[#111620] border-b border-[#222834] overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'border-[#4cd7f6] text-[#4cd7f6] bg-[#1a2130]'
                : 'border-transparent text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#161c28]'
            }`}
          >
            Overview &amp; Contact
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('property')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'property'
                ? 'border-[#4cd7f6] text-[#4cd7f6] bg-[#1a2130]'
                : 'border-transparent text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#161c28]'
            }`}
          >
            Property Specs &amp; Amenities
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('compliance')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'compliance'
                ? 'border-[#4cd7f6] text-[#4cd7f6] bg-[#1a2130]'
                : 'border-transparent text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#161c28]'
            }`}
          >
            Compliance &amp; Tourism Reg
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'documents'
                ? 'border-[#4cd7f6] text-[#4cd7f6] bg-[#1a2130]'
                : 'border-transparent text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#161c28]'
            }`}
          >
            Submitted Legal Documents
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
          
          {/* TAB 1: OVERVIEW & APPLICANT DETAILS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Top Quick Status Alert */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#172234] to-[#121926] border border-[#2a3a54] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4cd7f6]/20 border border-[#4cd7f6]/40 flex items-center justify-center text-[#4cd7f6] font-bold text-lg">
                    🏝️
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#dfe2ee] m-0">
                      Bahamas Luxury Villa Registration Portfolio
                    </h4>
                    <p className="text-xs text-[#89929b] m-0">
                      Registered Under Bahamas Vacation Homes Licensing Act 2024
                    </p>
                  </div>
                </div>
                <div className="text-right sm:border-l sm:border-[#2a3a54] sm:pl-4">
                  <span className="text-[10.5px] uppercase font-bold text-[#89929b] tracking-wider block">Nightly Rate</span>
                  <span className="text-base font-extrabold text-[#4cd7f6]">${pData.nightlyRate} {pData.currency}</span>
                </div>
              </div>

              {/* Grid 1: Owner & Entity Profile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-3">
                  <h4 className="text-xs font-bold text-[#4cd7f6] uppercase tracking-wider m-0 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4cd7f6]" />
                    Primary Registered Owner
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Full Legal Name:</span>
                      <span className="font-semibold text-[#dfe2ee]">{pData.ownerName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">National Insurance (NIB):</span>
                      <span className="font-mono font-semibold text-[#dfe2ee]">{pData.nibNumber}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Operating Entity:</span>
                      <span className="font-semibold text-[#dfe2ee]">{pData.businessName}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#89929b]">Direct Contact:</span>
                      <span className="font-semibold text-[#dfe2ee]">{provider.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-3">
                  <h4 className="text-xs font-bold text-[#ffb95f] uppercase tracking-wider m-0 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ffb95f]" />
                    Location &amp; Estate Jurisdiction
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Island / Hub:</span>
                      <span className="font-semibold text-[#dfe2ee]">{pData.island}, Bahamas</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Settlement / District:</span>
                      <span className="font-semibold text-[#dfe2ee]">{pData.settlement}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Physical Address:</span>
                      <span className="font-semibold text-[#dfe2ee]">{pData.propertyAddress}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#89929b]">Contact Email:</span>
                      <span className="font-semibold text-[#4cd7f6] truncate max-w-[200px]">{provider.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payout & Financial Integration Card */}
              <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#89929b] uppercase tracking-wider">Settlement &amp; Payout Routing</span>
                  <div className="text-sm font-semibold text-[#dfe2ee] flex items-center gap-2">
                    🏦 {pData.payoutAccount}
                  </div>
                  <span className="text-xs text-[#4cd7f6]">Bahamas Central Bank Automated Clearing House (ACH) Connected</span>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-[#1c2436] border border-[#2a3750] text-xs font-semibold text-[#dfe2ee]">
                  Status: <span className="text-[#4cd7f6]">Direct Payout Active</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROPERTY SPECS & AMENITIES */}
          {activeTab === 'property' && (
            <div className="space-y-6">
              {/* Specs Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Bedrooms</span>
                  <p className="text-xl font-extrabold text-[#dfe2ee] mt-1 mb-0">{pData.bedroomCount} Suites</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Bathrooms</span>
                  <p className="text-xl font-extrabold text-[#dfe2ee] mt-1 mb-0">{pData.bathroomCount} Baths</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Max Guests</span>
                  <p className="text-xl font-extrabold text-[#4cd7f6] mt-1 mb-0">{pData.maxGuests} Guests</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Min Stay</span>
                  <p className="text-xl font-extrabold text-[#ffb95f] mt-1 mb-0">{pData.minimumStayNights} Nights</p>
                </div>
              </div>

              {/* Property Amenities List */}
              <div className="p-5 rounded-xl bg-[#0f141e] border border-[#222834] space-y-3">
                <h4 className="text-xs font-bold text-[#dfe2ee] uppercase tracking-wider m-0">
                  Verified Property Amenities &amp; Infrastructure
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {pData.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-[#141a26] border border-[#1f2738] text-xs text-[#dfe2ee]">
                      <span className="text-[#4cd7f6] font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial & Deposit Rules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-2">
                  <span className="text-[#89929b] font-bold uppercase text-[10px]">Rental Pricing</span>
                  <div className="flex justify-between py-1 border-b border-[#1c2230]">
                    <span className="text-[#89929b]">Base Nightly Rate:</span>
                    <span className="font-bold text-[#dfe2ee]">${pData.nightlyRate} {pData.currency}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#89929b]">Refundable Security Deposit:</span>
                    <span className="font-bold text-[#4cd7f6]">${pData.securityDeposit} BSD</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-2">
                  <span className="text-[#89929b] font-bold uppercase text-[10px]">Guest Policies</span>
                  <div className="flex justify-between py-1 border-b border-[#1c2230]">
                    <span className="text-[#89929b]">Minimum Stay Duration:</span>
                    <span className="font-bold text-[#dfe2ee]">{pData.minimumStayNights} Nights Minimum</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#89929b]">Check-In / Out:</span>
                    <span className="font-bold text-[#dfe2ee]">3:00 PM / 11:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMPLIANCE & TOURISM REG */}
          {activeTab === 'compliance' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#4cd7f6] uppercase tracking-wider m-0">
                    Bahamas Ministry of Tourism Certification
                  </h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    pData.tourismRegDocStatus === 'Verified'
                      ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-400'
                      : 'bg-[#ca8100]/20 border border-[#ca8100]/40 text-[#ffb95f]'
                  }`}>
                    {pData.tourismRegDocStatus}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#141a26] border border-[#1f2738]">
                    <span className="text-[#89929b] block text-[10px] uppercase font-bold">MOT License Number</span>
                    <span className="font-mono text-sm font-bold text-[#dfe2ee]">{pData.tourismRegNumber}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#141a26] border border-[#1f2738]">
                    <span className="text-[#89929b] block text-[10px] uppercase font-bold">Sanitation Standard</span>
                    <span className="text-sm font-bold text-[#4cd7f6]">{pData.healthSanitationRating}</span>
                  </div>
                </div>
              </div>

              {/* Safety Checklist Audit */}
              <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-3">
                <h4 className="text-xs font-bold text-[#dfe2ee] uppercase tracking-wider m-0">
                  Short-Term Vacation Rental Audit Standards
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#141a26] border border-[#1f2738]">
                    <span className="text-[#dfe2ee]">Fire &amp; Smoke Detectors Passed</span>
                    <span className="font-bold text-emerald-400">✓ CERTIFIED</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#141a26] border border-[#1f2738]">
                    <span className="text-[#dfe2ee]">First Aid &amp; AED Equipment</span>
                    <span className="font-bold text-emerald-400">✓ EQUIPPED</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#141a26] border border-[#1f2738]">
                    <span className="text-[#dfe2ee]">Hurricane Shutter Compliance</span>
                    <span className="font-bold text-emerald-400">✓ VERIFIED</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#141a26] border border-[#1f2738]">
                    <span className="text-[#dfe2ee]">Liability Insurance ($2M BSD)</span>
                    <span className="font-bold text-emerald-400">✓ ACTIVE ({pData.insuranceExpiry})</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SUBMITTED LEGAL DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-3">
                <h4 className="text-xs font-bold text-[#dfe2ee] uppercase tracking-wider m-0">
                  Government &amp; Title Verification Documents
                </h4>
                
                <div className="space-y-2.5">
                  {/* Doc 1 */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#141a26] border border-[#1f2738] text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400 font-bold">
                        PDF
                      </div>
                      <div>
                        <span className="font-bold text-[#dfe2ee] block">Bahamas Ministry of Tourism Registration Cert</span>
                        <span className="text-[11px] text-[#89929b]">{pData.tourismRegNumber} • Issued Nassau</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDocumentPreview('Ministry of Tourism Registration Certificate - Verified')}
                      className="px-3 py-1 rounded-md bg-[#1f2636] hover:bg-[#283246] text-[#4cd7f6] text-xs font-bold border border-[#2a3750] cursor-pointer"
                    >
                      Preview
                    </button>
                  </div>

                  {/* Doc 2 */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#141a26] border border-[#1f2738] text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400 font-bold">
                        PDF
                      </div>
                      <div>
                        <span className="font-bold text-[#dfe2ee] block">Proof of Ownership / Deed of Conveyance</span>
                        <span className="text-[11px] text-[#89929b]">{pData.proofOfOwnershipDoc}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDocumentPreview('Proof of Ownership Deed - Verified Title')}
                      className="px-3 py-1 rounded-md bg-[#1f2636] hover:bg-[#283246] text-[#4cd7f6] text-xs font-bold border border-[#2a3750] cursor-pointer"
                    >
                      Preview
                    </button>
                  </div>

                  {/* Doc 3 */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#141a26] border border-[#1f2738] text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-950/40 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                        DOC
                      </div>
                      <div>
                        <span className="font-bold text-[#dfe2ee] block">Commercial Property Insurance Policy</span>
                        <span className="text-[11px] text-[#89929b]">Policy #{pData.insurancePolicyNumber} • Expires {pData.insuranceExpiry}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDocumentPreview('Commercial Property Insurance Certificate')}
                      className="px-3 py-1 rounded-md bg-[#1f2636] hover:bg-[#283246] text-[#4cd7f6] text-xs font-bold border border-[#2a3750] cursor-pointer"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </div>

              {documentPreview && (
                <div className="p-4 rounded-xl bg-[#172030] border border-[#4cd7f6]/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#4cd7f6]">
                    <span>📄</span>
                    <span className="font-bold">Viewing: {documentPreview}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDocumentPreview(null)}
                    className="text-[#89929b] hover:text-white bg-transparent border-0 cursor-pointer font-bold"
                  >
                    Close Preview
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Conditional Rejection Form */}
          {showRejectBox && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-600/40 space-y-3">
              <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider m-0">
                Reason for Application Rejection
              </h4>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Specify the regulatory or document deficiency (e.g. Expired Ministry of Tourism certificate, incomplete title deed)..."
                rows={3}
                className="w-full p-3 rounded-lg bg-[#0e121a] border border-red-800/60 text-xs text-[#dfe2ee] placeholder-[#89929b] outline-none"
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

          {/* Conditional Request Info Form */}
          {showInfoBox && (
            <div className="p-4 rounded-xl bg-[#ca8100]/20 border border-[#ca8100]/40 space-y-3">
              <h4 className="text-xs font-bold text-[#ffb95f] uppercase tracking-wider m-0">
                Request Additional Information / Re-upload
              </h4>
              <textarea
                value={infoNote}
                onChange={(e) => setInfoNote(e.target.value)}
                placeholder="Explain what additional documents are required from the Property Owner..."
                rows={3}
                className="w-full p-3 rounded-lg bg-[#0e121a] border border-[#ca8100]/60 text-xs text-[#dfe2ee] placeholder-[#89929b] outline-none"
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

        {/* Modal Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#0a0e16] border-t border-[#222834]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#1c2230] hover:bg-[#262e40] text-[#dfe2ee] text-xs font-bold border border-[#2a3548] cursor-pointer transition-colors"
          >
            Close Window
          </button>

          <div className="flex items-center gap-2.5">
            {provider.status === 'Pending' && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setShowInfoBox(!showInfoBox)
                    setShowRejectBox(false)
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-[#202736] hover:bg-[#2b354a] text-[#ffb95f] border border-[#ffb95f]/30 text-xs font-bold cursor-pointer transition-colors"
                >
                  Request Info
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowRejectBox(!showRejectBox)
                    setShowInfoBox(false)
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800 text-xs font-bold cursor-pointer transition-colors"
                >
                  Reject
                </button>

                <button
                  type="button"
                  onClick={() => onApprove(provider.id)}
                  className="px-5 py-2.5 rounded-xl bg-[#3198dc] hover:bg-[#45a4e3] text-[#002c47] text-xs font-extrabold border-0 cursor-pointer transition-colors shadow-lg shadow-[#3198dc]/20"
                >
                  Approve Property Owner
                </button>
              </>
            )}

            {provider.status === 'Approved' && (
              <button
                type="button"
                onClick={() => onReject(provider.id, 'Administrative suspension')}
                className="px-4 py-2 rounded-xl bg-red-950/50 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold cursor-pointer"
              >
                Revoke / Suspend Approval
              </button>
            )}

            {provider.status === 'Rejected' && (
              <button
                type="button"
                onClick={() => onApprove(provider.id)}
                className="px-4 py-2 rounded-xl bg-[#3198dc] hover:bg-[#45a4e3] text-[#002c47] text-xs font-bold border-0 cursor-pointer"
              >
                Re-Approve Provider
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
