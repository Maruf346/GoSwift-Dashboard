import { useState } from 'react'

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
  const [activeTab, setActiveTab] = useState<'profile' | 'transit' | 'authorization' | 'zones'>('profile')
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectBox, setShowRejectBox] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(false)
  const [infoNote, setInfoNote] = useState('')
  const [docPreview, setDocPreview] = useState<string | null>(null)

  const defaultCourierData: CourierData = {
    courierType: 'Licensed Commercial Express Courier',
    dispatchVehicleType: 'Heavy-Duty Cargo Motorcycle (250cc) / Insulated Box',
    vehiclePlate: 'CR-7712 (Grand Bahama Dispatch)',
    maxPayloadKg: 45,
    cargoBoxEquipped: true,
    refrigeratedStorage: true,
    driverLicenseNumber: 'BS-DL-GB-88102',
    portAuthorityAuthNumber: 'GBPA-DISP-2024-9182',
    transitInsurancePolicy: 'BS-TR-INS-88190',
    policeRecordClearance: 'Verified & Clean Record (Freeport HQ)',
    primaryServiceHub: `${provider.hub || 'Grand Bahama'} Port Authority Industrial & Commercial Hub`,
    availabilityHours: '7:00 AM - 8:00 PM (Express On-Demand)',
    emergencyContact: '+1 (242) 555-0992',
  }

  const cData = provider.courierData || defaultCourierData

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-4xl bg-[#141822] border border-[#2a303c] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh]">
        
        {/* Top Header Glow Bar */}
        <div className="w-full h-1.5 bg-gradient-to-r from-[#4cd7f6] via-[#3198dc] to-[#20c8e4]" />

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
                    COURIER DISPATCH REVIEW PENDING
                  </span>
                )}
                {provider.status === 'Approved' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#4cd7f6]/15 border border-[#4cd7f6]/40 text-[#4cd7f6]">
                    ✓ AUTHORIZED COMMERCIAL COURIER
                  </span>
                )}
                {provider.status === 'Rejected' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-950/60 border border-red-500/40 text-red-300">
                    ✕ REJECTED COURIER
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#89929b] mt-1 font-medium">
                <span className="font-mono text-[#4cd7f6]">{provider.providerId}</span>
                <span>•</span>
                <span>{provider.hub} Hub, Bahamas</span>
                <span>•</span>
                <span>Submitted: {provider.submittedDate || '6 hours ago'}</span>
                <span>•</span>
                <span className="text-[#dfe2ee]">Bahamas Dispatch Jurisdiction</span>
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
            Courier Identity
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('transit')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'transit'
                ? 'border-[#4cd7f6] text-[#4cd7f6] bg-[#1a2130]'
                : 'border-transparent text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#161c28]'
            }`}
          >
            Transit Equipment &amp; Vehicle
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('authorization')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'authorization'
                ? 'border-[#4cd7f6] text-[#4cd7f6] bg-[#1a2130]'
                : 'border-transparent text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#161c28]'
            }`}
          >
            Authorizations &amp; Insurance
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('zones')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all border-b-2 cursor-pointer ${
              activeTab === 'zones'
                ? 'border-[#4cd7f6] text-[#4cd7f6] bg-[#1a2130]'
                : 'border-transparent text-[#89929b] hover:text-[#dfe2ee] hover:bg-[#161c28]'
            }`}
          >
            Service Zones &amp; Hours
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
                    Courier Personnel Info
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Legal Name:</span>
                      <span className="font-semibold text-[#dfe2ee]">{provider.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Courier Classification:</span>
                      <span className="font-semibold text-[#dfe2ee]">{cData.courierType}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Primary Phone:</span>
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
                    Emergency &amp; Dispatch Contact
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Emergency Contact:</span>
                      <span className="font-semibold text-[#dfe2ee]">{cData.emergencyContact}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1c2230]">
                      <span className="text-[#89929b]">Hub Assignment:</span>
                      <span className="font-semibold text-[#dfe2ee]">{provider.hub}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#89929b]">Port Authority License:</span>
                      <span className="font-mono text-[#4cd7f6]">{cData.portAuthorityAuthNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TRANSIT */}
          {activeTab === 'transit' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Vehicle Type</span>
                  <p className="text-xs font-extrabold text-[#dfe2ee] mt-1 mb-0">{cData.dispatchVehicleType}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Plate Number</span>
                  <p className="text-xs font-mono font-extrabold text-[#4cd7f6] mt-1 mb-0">{cData.vehiclePlate}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Max Payload</span>
                  <p className="text-sm font-extrabold text-[#ffb95f] mt-1 mb-0">{cData.maxPayloadKg} KG</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0f141e] border border-[#222834] text-center">
                  <span className="text-[10px] uppercase font-bold text-[#89929b]">Thermal Box</span>
                  <p className="text-sm font-extrabold text-emerald-400 mt-1 mb-0">Equipped</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AUTHORIZATION */}
          {activeTab === 'authorization' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#4cd7f6] uppercase tracking-wider m-0">
                    Grand Bahama Port Authority Dispatch Authorization
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                    Verified
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#141a26] border border-[#1f2738]">
                    <span className="text-[#89929b] block text-[10px] uppercase font-bold">Transit Insurance Policy</span>
                    <span className="font-mono text-xs font-semibold text-[#dfe2ee]">{cData.transitInsurancePolicy}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#141a26] border border-[#1f2738]">
                    <span className="text-[#89929b] block text-[10px] uppercase font-bold">Police Clearance</span>
                    <span className="text-xs font-semibold text-emerald-400">{cData.policeRecordClearance}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#141a26] border border-[#1f2738] text-xs">
                <div>
                  <span className="font-bold text-[#dfe2ee] block">Commercial Motorbike Dispatch Authorization PDF</span>
                  <span className="text-[11px] text-[#89929b]">{cData.portAuthorityAuthNumber}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDocPreview('Commercial Dispatch Authorization Permit')}
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

          {/* TAB 4: ZONES */}
          {activeTab === 'zones' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#89929b]">Designated Delivery Hub</span>
                <p className="text-sm font-bold text-[#dfe2ee] m-0">{cData.primaryServiceHub}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0f141e] border border-[#222834] space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#89929b]">Operating Hours</span>
                <p className="text-sm font-bold text-[#4cd7f6] m-0">{cData.availabilityHours}</p>
              </div>
            </div>
          )}

          {/* Conditional Rejection Form */}
          {showRejectBox && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-600/40 space-y-3">
              <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider m-0">
                Reason for Courier Rejection
              </h4>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Reason for declining courier application..."
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
                Request Courier Documentation
              </h4>
              <textarea
                value={infoNote}
                onChange={(e) => setInfoNote(e.target.value)}
                placeholder="Specify missing courier permits or insurance details..."
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
                  Approve Courier
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
