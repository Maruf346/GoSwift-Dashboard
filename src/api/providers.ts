import type { ProviderItem, ProviderStatus, ProviderCategory } from '../pages/ProviderManagement'
import { apiRequest } from './client'

export type ServiceCategory = 'rides' | 'restaurants' | 'courier' | 'rentals' | 'properties'
export type OnboardingStatus = 'completed' | 'incomplete' | 'submitted'

export type ProviderApplicationApi = {
  id: number
  user?: number
  user_email?: string
  user_full_name?: string
  service_category: ServiceCategory
  business_name?: string
  display_name?: string
  contact_phone?: string
  contact_email?: string
  business_address?: string
  city?: string
  state?: string
  country?: string
  onboarding_status: OnboardingStatus
  submitted_at?: string | null
  review_note?: string
  is_active?: boolean
  profile_photo?: string | null
  restaurant_photo?: string | null
  logo?: string | null
  legal_name?: string
  public_service_driver_license?: string
  vehicle_category?: string
  vehicle_make?: string
  vehicle_model?: string
  vehicle_year?: number | null
  license_plate?: string
  seat_capacity?: number | null
  restaurant_name?: string
  cuisine_concept?: string
  island_service_hub?: string
  kitchen_dispatch_address?: string
  manager_or_head_chef_name?: string
  commercial_line?: string
  billing_email?: string
  business_license_number?: string
  average_prep_window?: string
  operating_island_zone?: string
  transport_mode?: string
  driver_license_number?: string
  company_or_host_legal_name?: string
  operational_contact_name?: string
  business_contact_number?: string
  primary_operating_base?: string
  rental_license_number?: string
  estimated_active_fleet_size?: string
  host_name?: string
  official_host_email?: string
  mobile_phone?: string
  primary_property_location?: string
  property_typology?: string
  estimated_portfolio_scale?: string
  tourism_license_number?: string
  taxpayer_identification_number?: string
}

type PaginatedProviderApplications = {
  count: number
  next: string | null
  previous: string | null
  results: ProviderApplicationApi[]
}

export type ProviderApplicationFilters = {
  page: number
  pageSize: number
  serviceCategory: ServiceCategory
  onboardingStatus?: OnboardingStatus
  isActive?: boolean
  search?: string
}

export async function listProviderApplications(filters: ProviderApplicationFilters) {
  const params = new URLSearchParams()
  params.set('page', String(filters.page))
  params.set('page_size', String(filters.pageSize))

  if (filters.onboardingStatus) params.set('onboarding_status', filters.onboardingStatus)
  if (typeof filters.isActive === 'boolean') params.set('is_active', String(filters.isActive))
  if (filters.search?.trim()) params.set('search', filters.search.trim())

  const response = await apiRequest<PaginatedProviderApplications>(
    `${getProviderRequestBasePath(filters.serviceCategory)}/?${params.toString()}`
  )

  return {
    ...response,
    results: response.results.map(mapProviderApplication),
  }
}

export async function getProviderApplication(serviceCategory: ServiceCategory, id: string) {
  const response = await apiRequest<ProviderApplicationApi>(
    `${getProviderRequestBasePath(serviceCategory)}/${id}/`
  )
  return mapProviderApplication(response)
}

export async function approveProviderApplication(
  serviceCategory: ServiceCategory,
  id: string,
  note?: string
) {
  const response = await apiRequest<ProviderApplicationApi>(
    `${getProviderRequestBasePath(serviceCategory)}/${id}/approve/`,
    {
      method: 'POST',
      body: note ? { note } : {},
    }
  )
  return mapProviderApplication(response)
}

export async function rejectProviderApplication(
  serviceCategory: ServiceCategory,
  id: string,
  note?: string
) {
  const response = await apiRequest<ProviderApplicationApi>(
    `${getProviderRequestBasePath(serviceCategory)}/${id}/reject/`,
    {
      method: 'POST',
      body: note ? { note } : {},
    }
  )
  return mapProviderApplication(response)
}

function getProviderRequestBasePath(serviceCategory: ServiceCategory) {
  return `/api/providers/admin/${serviceCategory}/requests`
}

export function mapCategoryToServiceCategory(category: string): ServiceCategory | undefined {
  const map: Partial<Record<ProviderCategory | 'All', ServiceCategory>> = {
    Driver: 'rides',
    'Food Vendor': 'restaurants',
    Courier: 'courier',
    'Car Rental Provider': 'rentals',
    'Property Owner': 'properties',
  }
  return map[category as ProviderCategory | 'All']
}

export function mapStatusToOnboardingStatus(status: string): OnboardingStatus | undefined {
  const map: Partial<Record<ProviderStatus | 'All', OnboardingStatus>> = {
    Pending: 'submitted',
    Approved: 'completed',
    Rejected: 'incomplete',
  }
  return map[status as ProviderStatus | 'All']
}

function mapProviderApplication(api: ProviderApplicationApi): ProviderItem {
  const category = mapServiceCategoryToCategory(api.service_category)
  const name = firstText(
    api.display_name,
    api.business_name,
    api.restaurant_name,
    api.company_or_host_legal_name,
    api.host_name,
    api.legal_name,
    api.user_full_name,
    'Unnamed Provider'
  )
  const hub = firstText(api.city, api.island_service_hub, api.operating_island_zone, api.state, api.country, 'Bahamas')
  const status = mapOnboardingStatusToStatus(api.onboarding_status)
  const avatarImage = firstText(api.profile_photo, api.restaurant_photo, api.logo)

  return {
    id: String(api.id),
    apiCategory: api.service_category,
    name,
    providerId: `SWIFT-${api.service_category.toUpperCase()}-${api.id}`,
    avatarImage,
    avatarInitials: getInitials(name),
    avatarBg: '#31353e',
    avatarColor: '#4cd7f6',
    hasPendingBadge: status === 'Pending',
    category,
    phone: firstText(api.contact_phone, api.commercial_line, api.business_contact_number, api.mobile_phone, 'N/A'),
    email: firstText(api.contact_email, api.user_email, api.billing_email, api.official_host_email, 'N/A'),
    hub,
    status,
    documentName: getDocumentName(api),
    documentStatus: getDocumentStatus(api),
    submittedDate: formatSubmittedDate(api.submitted_at),
    driverData:
      api.service_category === 'rides'
        ? {
            fullLegalName: firstText(api.legal_name, api.user_full_name, name),
            driverLicenseNumber: firstText(api.public_service_driver_license, 'N/A'),
            driverLicenseClass: firstText(api.vehicle_category, 'N/A'),
            driverLicenseExpiry: 'N/A',
            nibNumber: 'N/A',
            vehicleMake: firstText(api.vehicle_make, 'N/A'),
            vehicleModel: firstText(api.vehicle_model, 'N/A'),
            vehicleYear: api.vehicle_year || 0,
            vehicleColor: 'N/A',
            licensePlate: firstText(api.license_plate, 'N/A'),
            vehicleType: firstText(api.vehicle_category, 'N/A'),
            seatingCapacity: api.seat_capacity || 0,
            policeRecordDocStatus: status === 'Approved' ? 'Clear / Verified' : 'Pending Verification',
            insurancePolicyNumber: 'N/A',
            insuranceExpiry: 'N/A',
            roadTrafficInspectionDate: 'N/A',
            inspectionExpiry: 'N/A',
            operatingZone: hub,
          }
        : undefined,
    vendorData:
      api.service_category === 'restaurants'
        ? {
            businessLegalName: firstText(api.business_name, api.restaurant_name, name),
            tradingName: firstText(api.restaurant_name, api.display_name, name),
            chefName: api.manager_or_head_chef_name,
            cuisineType: firstText(api.cuisine_concept, 'N/A'),
            operatingHours: 'N/A',
            kitchenType: firstText(api.kitchen_dispatch_address, api.business_address, 'N/A'),
            takeoutAvailable: true,
            deliveryRadiusKm: 0,
            avgPreparationTime: firstText(api.average_prep_window, 'N/A'),
            healthSanitaryCertNumber: 'N/A',
            healthSanitaryExpiry: 'N/A',
            healthInspectionGrade: status === 'Approved' ? 'Verified' : 'Pending Review',
            foodHandlersCount: 0,
            foodHandlersCertified: status === 'Approved',
            businessRegistrationNumber: firstText(api.business_license_number, 'N/A'),
            menuItemsCount: 0,
            bankPayoutAccount: 'N/A',
            physicalAddress: firstText(api.kitchen_dispatch_address, api.business_address),
            operatingZone: hub,
          }
        : undefined,
    courierData:
      api.service_category === 'courier'
        ? {
            courierType: firstText(api.transport_mode, 'Courier Delivery Provider'),
            dispatchVehicleType: firstText(api.transport_mode, 'N/A'),
            vehiclePlate: 'N/A',
            maxPayloadKg: 0,
            cargoBoxEquipped: false,
            refrigeratedStorage: false,
            driverLicenseNumber: firstText(api.driver_license_number, 'N/A'),
            portAuthorityAuthNumber: 'N/A',
            transitInsurancePolicy: 'N/A',
            policeRecordClearance: status === 'Approved' ? 'Verified' : 'Pending Review',
            primaryServiceHub: hub,
            availabilityHours: 'N/A',
            emergencyContact: firstText(api.contact_phone, 'N/A'),
            companyName: firstText(api.business_name, api.display_name, name),
            fullLegalName: firstText(api.legal_name, api.user_full_name, name),
          }
        : undefined,
    rentalData:
      api.service_category === 'rentals'
        ? {
            companyLegalName: firstText(api.company_or_host_legal_name, api.business_name, name),
            tradingName: firstText(api.display_name, api.business_name, name),
            representativeName: api.operational_contact_name,
            fleetSize: Number(api.estimated_active_fleet_size) || 0,
            vehicleCategories: [],
            officeLocation: firstText(api.primary_operating_base, api.business_address, 'N/A'),
            airportPickupAvailable: false,
            businessLicenseNumber: firstText(api.business_license_number, 'N/A'),
            commercialFleetInsurancePolicy: 'N/A',
            insuranceCoverageAmount: 'N/A',
            insuranceExpiry: 'N/A',
            roadTrafficRentalPermitNumber: firstText(api.rental_license_number, 'N/A'),
            minimumRenterAge: 0,
            securityDepositBSD: 0,
            gpsTrackingEquipped: false,
            roadsideAssistancePartner: 'N/A',
          }
        : undefined,
    propertyData:
      api.service_category === 'properties'
        ? {
            ownerName: firstText(api.host_name, api.user_full_name, name),
            nibNumber: 'N/A',
            businessName: firstText(api.business_name, name),
            propertyTitle: firstText(api.display_name, api.business_name, name),
            propertyType: firstText(api.property_typology, 'N/A'),
            propertyAddress: firstText(api.primary_property_location, api.business_address, 'N/A'),
            settlement: firstText(api.city, 'N/A'),
            island: hub,
            bedroomCount: 0,
            bathroomCount: 0,
            maxGuests: 0,
            nightlyRate: 0,
            currency: 'BSD / USD',
            securityDeposit: 0,
            minimumStayNights: 0,
            amenities: [],
            tourismRegNumber: firstText(api.tourism_license_number, 'N/A'),
            tourismRegDocStatus: status === 'Approved' ? 'Verified' : 'Pending Review',
            proofOfOwnershipDoc: 'N/A',
            businessLicenseNumber: firstText(api.taxpayer_identification_number, 'N/A'),
            taxComplianceCertStatus: status === 'Approved' ? 'Valid' : 'Pending',
            insurancePolicyNumber: 'N/A',
            insuranceExpiry: 'N/A',
            fireSafetyCertified: false,
            healthSanitationRating: 'N/A',
            payoutAccount: 'N/A',
            inventorySummary: api.estimated_portfolio_scale,
          }
        : undefined,
  }
}

function mapServiceCategoryToCategory(serviceCategory: ServiceCategory): ProviderCategory {
  const map: Record<ServiceCategory, ProviderCategory> = {
    rides: 'Driver',
    restaurants: 'Food Vendor',
    courier: 'Courier',
    rentals: 'Car Rental Provider',
    properties: 'Property Owner',
  }
  return map[serviceCategory]
}

function mapOnboardingStatusToStatus(status: OnboardingStatus): ProviderStatus {
  const map: Record<OnboardingStatus, ProviderStatus> = {
    submitted: 'Pending',
    completed: 'Approved',
    incomplete: 'Rejected',
  }
  return map[status]
}

function getDocumentName(api: ProviderApplicationApi) {
  if (api.service_category === 'rides') return 'Driver & Vehicle Verification'
  if (api.service_category === 'restaurants') return 'Restaurant Business Verification'
  if (api.service_category === 'courier') return 'Courier Dispatch Verification'
  if (api.service_category === 'rentals') return 'Car Rental Business Verification'
  return 'Property Host Verification'
}

function getDocumentStatus(api: ProviderApplicationApi) {
  if (api.review_note) return api.review_note
  if (api.onboarding_status === 'completed') return 'Verified by Bahamas Authorities'
  if (api.onboarding_status === 'submitted') return 'KYC Verification Required'
  return 'Application Rejected or Incomplete'
}

function formatSubmittedDate(value?: string | null) {
  if (!value) return 'N/A'
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(value))
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function firstText(...values: Array<string | null | undefined>) {
  return values.find((value) => typeof value === 'string' && value.trim().length > 0)?.trim() || ''
}
