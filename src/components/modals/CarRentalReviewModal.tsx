import { useState } from 'react'

export interface CarRentalData {
  companyLegalName: string
  tradingName: string
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
  const [activeTab, setActiveTab] = useState<'profile' | 'fleet' | 'insurance' | 'documents'>('profile')
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectBox, setShowRejectBox] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(false)
  const [infoNote, setInfoNote] = useState('')
  const [docPreview, setDocPreview] = useState<string | null>(null)

  const defaultRentalData: CarRentalData = {
    companyLegalName: `${provider.name} Operations Ltd.`,
    tradingName: provider.name,
    fleetSize: 18,
    vehicleCategories: ['Compact Sedans', '4x4 Island SUVs', 'Open-Top Jeeps', '8-Passenger Minivans'],
    officeLocation: `Marsh Harbour Commercial Center & Airport Hub, ${provider.hub || 'Abaco'}`,
    airportPickupAvailable: true,
    businessLicenseNumber: 'BL-RNT-2024-8812',
    commercialFleetInsurancePolicy: 'BS-COMM-FLT-77192',
    insuranceCoverageAmount: '$1,500,000 BSD Comprehensive Fleet Coverage',
    insuranceExpiry: provider.status === 'Rejected' ? 'Oct 10, 2024 (Expired)' : 'Nov 30, 2025',
    roadTrafficRentalPermitNumber: 'RTD-RNT-AB-2024-099',
    minimumRenterAge: 25,
    securityDepositBSD: 500,
    gpsTrackingEquipped: true,
    roadsideAssistancePartner: 'Bahamas Towing & Fleet Rescue 24/7',
  }

  const rData = provider.rentalData || defaultRentalData

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-4xl bg-[#141822] border border-[#2a303c] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh]">
        
        {/* Top Header Glow Bar */}
        <div className="w-full h-1.5 bg-gradient-to-r from-[#89929b] via-[#4cd7f6] to-[#03b5d3]" />

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 bg-[#0e121a] border-b border-[#222834]">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1c2230] border border-[#313a4d] overflow-hidden shrink-0 shadow-inner">
              {provider.avatarImage ? (
                <img src={provider.avatarImage} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="font-extrabold text-lg text-[#dfe2ee]">
                  {provider.avatarInitials || provider.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            
            <div className="flex flex-col text-left">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-black text-[#dfe2ee] tracking-tight m-0">
                  {rData.tradingName}
                </h2>
                {provider.status === 'Pending' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ca8100]/25 border border-[#ca8100]/50 text-[#ffb95f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f] animate-pulse" />
                    FLEET COMPLIANCE PENDING REVIEW
                  </span>
                )}
                {provider.status === 'Approved' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#4cd7f6]/15 border border-[#4cd7f6]/40 text-[#4cd7f6]">
                    ✓ VERIFIED CAR RENTAL OPERATOR
                  </span>
                )}
                {provider.status === 'Rejected' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-950/60 border border-red-500/40 text-red-300">
                    ✕ REJECTED FLEET POLICY
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#89929b] mt-1 font-medium">
                <span className="font-mono text-[#4cd7f6]">{provider.providerId}</span>
                <span>•</span>
                <span>{provider.hub} Hub, Bahamas</span>
                <span>•</span>
                <span>Submitted: {provider.submittedDate || 'Oct 14, 2024'}</span>
                <span>•</span>
                <span className="text-[#dfe2ee]">Bahamas Road Traffic Dept Rental Operator</span>
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
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#4cd7f6] text-[#4cd7f6] bg-[#1a2130]'
                : 'border-transparent text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#161c28]'
            }`}
          >
            Agency Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('fleet')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'fleet'
                ? 'border-[#4cd7f6] text-[#4cd7f6] bg-[#1a2130]'
                : 'border-transparent text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#161c28]'
            }`}
          >
            Fleet Inventory &amp; Classes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('insurance')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'insurance'
                ? 'border-[#4cd7f6] text-[#4cd7f6] bg-[#1a2130]'
                : 'border-transparent text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#161c28]'
            }`}
          >
            Fleet Insurance &amp; Permits
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
            Audit Documents
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
          
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-3">
                  <h4 className="text-xs font-bold text-[#4cd7f6] uppercase tracking-wider m-0">
                    Rental Agency Identity
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Trading Name:</span>
                      <span className="font-semibold text-[#dfe2ee]">{rData.tradingName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Legal Entity:</span>
                      <span className="font-semibold text-[#dfe2ee]">{rData.companyLegalName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Business License:</span>
                      <span className="font-mono font-semibold text-[#dfe2ee]">{rData.businessLicenseNumber}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#89929b]">Phone:</span>
                      <span className="font-semibold text-[#dfe2ee]">{provider.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-3">
                  <h4 className="text-xs font-bold text-[#ffb95f] uppercase tracking-wider m-0">
                    Operations &amp; Kiosk Location
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Primary Location:</span>
                      <span className="font-semibold text-[#dfe2ee]">{rData.officeLocation}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Airport Terminal Pickup:</span>
                      <span className="font-bold text-emerald-400">Available</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#89929b]">Email:</span>
                      <span className="font-semibold text-[#4cd7f6]">{provider.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FLEET */}
          {activeTab === 'fleet' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Fleet Size</span>
                  <p className="text-xl font-extrabold text-[#dfe2ee] mt-1 mb-0">{rData.fleetSize} Vehicles</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Min Age</span>
                  <p className="text-xl font-extrabold text-[#4cd7f6] mt-1 mb-0">{rData.minimumRenterAge}+ Yrs</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Security Deposit</span>
                  <p className="text-xl font-extrabold text-[#ffb95f] mt-1 mb-0">${rData.securityDepositBSD} BSD</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">GPS Telematics</span>
                  <p className="text-sm font-extrabold text-emerald-400 mt-2 mb-0">100% Active</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-3">
                <h4 className="text-xs font-bold text-[#dfe2ee] uppercase tracking-wider m-0">
                  Fleet Vehicle Categories
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {rData.vehicleCategories.map((cat, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#141a26] border border-[#1f2738] text-xs text-[#dfe2ee] flex items-center gap-2">
                      <span className="text-[#4cd7f6]">🚗</span>
                      <span>{cat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INSURANCE */}
          {activeTab === 'insurance' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#4cd7f6] uppercase tracking-wider m-0">
                    Commercial Fleet Insurance Master Policy
                  </h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    rData.insuranceExpiry.includes('Expired')
                      ? 'bg-red-950/60 border border-red-500/40 text-red-300'
                      : 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-400'
                  }`}>
                    {rData.insuranceExpiry.includes('Expired') ? 'Policy Expired' : 'Active & Verified'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#141a26] border border-[#1f2738]">
                    <span className="text-[#89929b] block text-[10px] uppercase font-bold">Policy Number</span>
                    <span className="font-mono text-sm font-bold text-[#dfe2ee]">{rData.commercialFleetInsurancePolicy}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#141a26] border border-[#1f2738]">
                    <span className="text-[#89929b] block text-[10px] uppercase font-bold">Policy Expiration</span>
                    <span className={`text-sm font-bold ${rData.insuranceExpiry.includes('Expired') ? 'text-red-400' : 'text-emerald-400'}`}>
                      {rData.insuranceExpiry}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#141a26] border border-[#1f2738] text-xs">
                <div>
                  <span className="font-bold text-[#dfe2ee] block">Road Traffic Department Commercial Rental Permit</span>
                  <span className="text-[11px] text-[#89929b]">{rData.roadTrafficRentalPermitNumber}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDocPreview('Commercial Fleet Rental Operator Permit')}
                  className="px-3 py-1 rounded-md bg-[#1f2636] text-[#4cd7f6] text-xs font-bold border border-[#2a3750] cursor-pointer"
                >
                  View
                </button>
              </div>

              {docPreview && (
                <div className="p-3 rounded-xl bg-[#172030] border border-[#4cd7f6]/40 flex items-center justify-between text-xs">
                  <span className="text-[#4cd7f6] font-semibold">📄 Viewing: {docPreview}</span>
                  <button type="button" onClick={() => setDocPreview(null)} className="text-[#89929b] hover:text-white bg-transparent border-0 cursor-pointer">
                    Close
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Conditional Rejection Form */}
          {showRejectBox && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-600/40 space-y-3">
              <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider m-0">
                Reason for Rejection
              </h4>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Reason for declining rental agency application (e.g. Expired fleet insurance)..."
                rows={3}
                className="w-full p-3 rounded-lg bg-[#0e121a] border border-red-800/60 text-xs text-[#dfe2ee] outline-none"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowRejectBox(false)} className="px-3 py-1.5 rounded-lg bg-[#222834] text-xs font-semibold">
                  Cancel
                </button>
                <button type="button" onClick={() => onReject(provider.id, rejectionReason)} className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold">
                  Confirm Rejection
                </button>
              </div>
            </div>
          )}

          {/* Conditional Request Info Form */}
          {showInfoBox && (
            <div className="p-4 rounded-xl bg-[#ca8100]/20 border border-[#ca8100]/40 space-y-3">
              <h4 className="text-xs font-bold text-[#ffb95f] uppercase tracking-wider m-0">
                Request Fleet Policy Renewal
              </h4>
              <textarea
                value={infoNote}
                onChange={(e) => setInfoNote(e.target.value)}
                placeholder="Details of required fleet documents or updated insurance certificates..."
                rows={3}
                className="w-full p-3 rounded-lg bg-[#0e121a] border border-[#ca8100]/60 text-xs text-[#dfe2ee] outline-none"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowInfoBox(false)} className="px-3 py-1.5 rounded-lg bg-[#222834] text-xs font-semibold">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onRequestInfo) onRequestInfo(provider.id, infoNote)
                    setShowInfoBox(false)
                  }}
                  className="px-4 py-1.5 rounded-lg bg-[#ca8100] text-black text-xs font-bold"
                >
                  Send Request
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
            className="px-4 py-2.5 rounded-xl bg-[#1c2230] hover:bg-[#262e40] text-[#dfe2ee] text-xs font-bold border border-[#2a3548] cursor-pointer"
          >
            Close
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
                  className="px-3.5 py-2.5 rounded-xl bg-[#202736] hover:bg-[#2b354a] text-[#ffb95f] border border-[#ffb95f]/30 text-xs font-bold cursor-pointer"
                >
                  Request Info
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRejectBox(!showRejectBox)
                    setShowInfoBox(false)
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800 text-xs font-bold cursor-pointer"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => onApprove(provider.id)}
                  className="px-5 py-2.5 rounded-xl bg-[#3198dc] hover:bg-[#45a4e3] text-[#002c47] text-xs font-extrabold border-0 cursor-pointer shadow-lg shadow-[#3198dc]/20"
                >
                  Approve Rental Agency
                </button>
              </>
            )}

            {provider.status === 'Approved' && (
              <button
                type="button"
                onClick={() => onReject(provider.id, 'Administrative suspension')}
                className="px-4 py-2 rounded-xl bg-red-950/50 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold cursor-pointer"
              >
                Revoke / Suspend Operator
              </button>
            )}

            {provider.status === 'Rejected' && (
              <button
                type="button"
                onClick={() => onApprove(provider.id)}
                className="px-4 py-2 rounded-xl bg-[#3198dc] hover:bg-[#45a4e3] text-[#002c47] text-xs font-bold border-0 cursor-pointer"
              >
                Re-Approve Agency
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
