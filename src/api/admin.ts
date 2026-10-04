import { apiRequest } from './client'

export type DashboardSummary = {
  pending_provider_registrations: number
  active_accounts: number
  total_registered_users: number
  customers: number
  drivers: number
  food_vendors: number
  couriers: number
  car_rentals: number
  properties: number
  support_tickets: number
  new_support_tickets: number
}

export type AdminUserRole = 'SUPER_ADMIN' | 'CUSTOMER' | 'SERVICE_PROVIDER'

export type AdminUserRecord = {
  id: number
  email: string
  username: string
  full_name: string
  first_name: string
  last_name: string
  phone_number: string
  role: AdminUserRole
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  profile_image: string | null
  street_address: string
  city: string
  state: string
  postal_code: string
  country: string
  date_joined: string
  last_login: string | null
  created_at: string
  updated_at: string
}

type PaginatedAdminUsers = {
  count: number
  next: string | null
  previous: string | null
  results: AdminUserRecord[]
}

export function getDashboardSummary() {
  return apiRequest<DashboardSummary>('/api/admin/dashboard/summary/')
}

export function listAdminUsers(filters: {
  page: number
  pageSize: number
  search?: string
  role?: AdminUserRole
  isActive?: boolean
}) {
  const params = new URLSearchParams()
  params.set('page', String(filters.page))
  params.set('page_size', String(filters.pageSize))
  if (filters.search?.trim()) params.set('search', filters.search.trim())
  if (filters.role) params.set('role', filters.role)
  if (typeof filters.isActive === 'boolean') params.set('is_active', String(filters.isActive))

  return apiRequest<PaginatedAdminUsers>(`/api/users/admin/users/?${params.toString()}`)
}

export function getAdminUser(id: string | number) {
  return apiRequest<AdminUserRecord>(`/api/users/admin/users/${id}/`)
}

export function updateAdminUserStatus(id: string | number, isActive: boolean) {
  return apiRequest<AdminUserRecord>(`/api/users/admin/users/${id}/status/`, {
    method: 'PATCH',
    body: { is_active: isActive },
  })
}

export function getSuperAdminProfile() {
  return apiRequest<AdminUserRecord>('/api/users/admin/profile/')
}

export function updateSuperAdminProfile(input: {
  full_name?: string
  first_name?: string
  last_name?: string
  phone_number?: string
  profile_image?: File | null
  street_address?: string
  city?: string
  state?: string
  postal_code?: string
  country?: string
}) {
  const form = new FormData()
  Object.entries(input).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    form.append(key, value)
  })

  return apiRequest<AdminUserRecord>('/api/users/admin/profile/', {
    method: 'PATCH',
    body: form,
  })
}
