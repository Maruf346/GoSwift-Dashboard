import { useState } from 'react'

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
  const [activeTab, setActiveTab] = useState<'profile' | 'vehicle' | 'licensing' | 'activity'>('profile')
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectBox, setShowRejectBox] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(false)
  const [infoNote, setInfoNote] = useState('')
  const [docPreview, setDocPreview] = useState<string | null>(null)

  const defaultDriverData: DriverData = {
    driverLicenseNumber: 'BS-DL-8910-2490',
    driverLicenseClass: 'Class B & Public Service Vehicle (PSV) Endorsed',
    driverLicenseExpiry: 'Nov 14, 2026',
    nibNumber: 'NIB-9941-8012',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry Hybrid (Executive Class)',
    vehicleYear: 2023,
    vehicleColor: 'Ocean Silver Metallic',
    licensePlate: 'TX-8921 (Nassau Public Taxi)',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-4xl bg-[#141822] border border-[#2a303c] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh]">
        
        {/* Top Header Glow Bar */}
        <div className="w-full h-1.5 bg-gradient-to-r from-[#03b5d3] via-[#3198dc] to-[#4cd7f6]" />

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 bg-[#0e121a] border-b border-[#222834]">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1c2230] border border-[#313a4d] overflow-hidden shrink-0 shadow-inner">
              {provider.avatarImage ? (
                <img src={provider.avatarImage} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="font-extrabold text-lg text-[#4cd7f6]">
                  {provider.avatarInitials || provider.name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            
            <div className="flex flex-col text-left">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-black text-[#dfe2ee] tracking-tight m-0">
                  {provider.name}
                </h2>
                {provider.status === 'Pending' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ca8100]/25 border border-[#ca8100]/50 text-[#ffb95f]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f] animate-pulse" />
                    DRIVER KYC REVIEW REQUIRED
                  </span>
                )}
                {provider.status === 'Approved' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#4cd7f6]/15 border border-[#4cd7f6]/40 text-[#4cd7f6]">
                    ✓ VERIFIED LICENSED DRIVER
                  </span>
                )}
                {provider.status === 'Rejected' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-950/60 border border-red-500/40 text-red-300">
                    ✕ REJECTED APPLICANT
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#89929b] mt-1 font-medium">
                <span className="font-mono text-[#4cd7f6]">{provider.providerId}</span>
                <span>•</span>
                <span>{provider.hub} Hub, Bahamas</span>
                <span>•</span>
                <span>Applied: {provider.submittedDate || '2 hours ago'}</span>
                <span>•</span>
                <span className="text-[#dfe2ee]">Bahamas Road Traffic Dept Verified</span>
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
            Driver Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vehicle')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'vehicle'
                ? 'border-[#4cd7f6] text-[#4cd7f6] bg-[#1a2130]'
                : 'border-transparent text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#161c28]'
            }`}
          >
            Vehicle &amp; Registration
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('licensing')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'licensing'
                ? 'border-[#4cd7f6] text-[#4cd7f6] bg-[#1a2130]'
                : 'border-transparent text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#161c28]'
            }`}
          >
            Licensing &amp; Police Record
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'activity'
                ? 'border-[#4cd7f6] text-[#4cd7f6] bg-[#1a2130]'
                : 'border-transparent text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#161c28]'
            }`}
          >
            Operating Zone &amp; Metrics
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
                    Contact &amp; Identification
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Full Name:</span>
                      <span className="font-semibold text-[#dfe2ee]">{provider.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">National Insurance (NIB):</span>
                      <span className="font-mono font-semibold text-[#dfe2ee]">{dData.nibNumber}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Phone Number:</span>
                      <span className="font-semibold text-[#dfe2ee]">{provider.phone}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#89929b]">Email:</span>
                      <span className="font-semibold text-[#4cd7f6]">{provider.email}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-3">
                  <h4 className="text-xs font-bold text-[#ffb95f] uppercase tracking-wider m-0">
                    Driver License Information
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">License Number:</span>
                      <span className="font-mono font-semibold text-[#dfe2ee]">{dData.driverLicenseNumber}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">License Class:</span>
                      <span className="font-semibold text-[#dfe2ee]">{dData.driverLicenseClass}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#89929b]">Expiry Date:</span>
                      <span className="font-semibold text-emerald-400">{dData.driverLicenseExpiry}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VEHICLE */}
          {activeTab === 'vehicle' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Vehicle Model</span>
                  <p className="text-sm font-extrabold text-[#dfe2ee] mt-1 mb-0">{dData.vehicleMake} {dData.vehicleModel}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Year / Color</span>
                  <p className="text-sm font-extrabold text-[#dfe2ee] mt-1 mb-0">{dData.vehicleYear} • {dData.vehicleColor}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">License Plate</span>
                  <p className="text-sm font-mono font-extrabold text-[#4cd7f6] mt-1 mb-0">{dData.licensePlate}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Capacity</span>
                  <p className="text-sm font-extrabold text-[#ffb95f] mt-1 mb-0">{dData.seatingCapacity} Passengers</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-3">
                <h4 className="text-xs font-bold text-[#dfe2ee] uppercase tracking-wider m-0">
                  Vehicle Safety &amp; Roadworthiness Inspection
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#141a26] border border-[#1f2738]">
                    <span className="text-[#89929b] block text-[10px] uppercase font-bold">Annual Inspection Date</span>
                    <span className="font-semibold text-[#dfe2ee]">{dData.roadTrafficInspectionDate}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#141a26] border border-[#1f2738]">
                    <span className="text-[#89929b] block text-[10px] uppercase font-bold">Inspection Expiry</span>
                    <span className="font-semibold text-emerald-400">{dData.inspectionExpiry}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LICENSING */}
          {activeTab === 'licensing' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#4cd7f6] uppercase tracking-wider m-0">
                    Royal Bahamas Police Force Background Check
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                    {dData.policeRecordDocStatus}
                  </span>
                </div>
                <p className="text-xs text-[#89929b] m-0">
                  Clean criminal record clearance certificate issued by Bahamas Police Headquarters, East Street, Nassau.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#141a26] border border-[#1f2738] text-xs">
                  <div>
                    <span className="font-bold text-[#dfe2ee] block">Commercial Auto Liability Insurance</span>
                    <span className="text-[11px] text-[#89929b]">Policy #{dData.insurancePolicyNumber} • Expires {dData.insuranceExpiry}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDocPreview('Auto Liability Insurance Certificate')}
                    className="px-3 py-1 rounded-md bg-[#1f2636] text-[#4cd7f6] text-xs font-bold border border-[#2a3750] cursor-pointer"
                  >
                    View Document
                  </button>
                </div>
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

          {/* TAB 4: ACTIVITY */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#89929b]">Authorized Dispatch Hub &amp; Operating Zone</span>
                <p className="text-sm font-bold text-[#dfe2ee] m-0">{dData.operatingZone}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834]">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Completed Rides</span>
                  <p className="text-xl font-extrabold text-[#4cd7f6] mt-1 mb-0">{dData.completedTrips} Trips</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834]">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Customer Rating</span>
                  <p className="text-xl font-extrabold text-[#ffb95f] mt-1 mb-0">⭐ {dData.rating} / 5.0</p>
                </div>
              </div>
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
                placeholder="Reason for declining driver application..."
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
                Request Driver Documents
              </h4>
              <textarea
                value={infoNote}
                onChange={(e) => setInfoNote(e.target.value)}
                placeholder="Details of required documents (e.g. updated police record)..."
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
                  Approve Driver
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
