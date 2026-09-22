import PropertyOwnerReviewModal, { type PropertyOwnerData } from './PropertyOwnerReviewModal'
import DriverReviewModal, { type DriverData } from './DriverReviewModal'
import FoodVendorReviewModal, { type FoodVendorData } from './FoodVendorReviewModal'
import CourierReviewModal, { type CourierData } from './CourierReviewModal'
import CarRentalReviewModal, { type CarRentalData } from './CarRentalReviewModal'
import type { ProviderCategory, ProviderStatus } from '../../pages/ProviderManagement'

export interface ProviderDetailItem {
  id: string
  name: string
  providerId: string
  avatarImage?: string
  avatarInitials?: string
  avatarBg?: string
  avatarColor?: string
  hasPendingBadge?: boolean
  category: ProviderCategory
  categoryIcon: string
  phone: string
  email: string
  hub: string
  status: ProviderStatus
  documentName?: string
  documentStatus?: string
  submittedDate?: string
  propertyData?: PropertyOwnerData
  driverData?: DriverData
  vendorData?: FoodVendorData
  courierData?: CourierData
  rentalData?: CarRentalData
}

export interface ProviderDetailModalProps {
  provider: ProviderDetailItem
  onClose: () => void
  onApprove: (id: string) => void
  onReject: (id: string, reason?: string) => void
  onRequestInfo?: (id: string, note?: string) => void
}

export default function ProviderDetailModal({
  provider,
  onClose,
  onApprove,
  onReject,
  onRequestInfo,
}: ProviderDetailModalProps) {
  switch (provider.category) {
    case 'Property Owner':
      return (
        <PropertyOwnerReviewModal
          provider={provider}
          onClose={onClose}
          onApprove={onApprove}
          onReject={onReject}
          onRequestInfo={onRequestInfo}
        />
      )

    case 'Driver':
      return (
        <DriverReviewModal
          provider={provider}
          onClose={onClose}
          onApprove={onApprove}
          onReject={onReject}
          onRequestInfo={onRequestInfo}
        />
      )

    case 'Food Vendor':
      return (
        <FoodVendorReviewModal
          provider={provider}
          onClose={onClose}
          onApprove={onApprove}
          onReject={onReject}
          onRequestInfo={onRequestInfo}
        />
      )

    case 'Courier':
      return (
        <CourierReviewModal
          provider={provider}
          onClose={onClose}
          onApprove={onApprove}
          onReject={onReject}
          onRequestInfo={onRequestInfo}
        />
      )

    case 'Car Rental Provider':
      return (
        <CarRentalReviewModal
          provider={provider}
          onClose={onClose}
          onApprove={onApprove}
          onReject={onReject}
          onRequestInfo={onRequestInfo}
        />
      )

    default:
      return (
        <PropertyOwnerReviewModal
          provider={provider}
          onClose={onClose}
          onApprove={onApprove}
          onReject={onReject}
          onRequestInfo={onRequestInfo}
        />
      )
  }
}
