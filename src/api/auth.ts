import { apiRequest } from './client'

export type AdminUser = {
  id: number
  email: string
  full_name: string
  phone_number: string
  role: 'SUPER_ADMIN' | 'CUSTOMER' | 'SERVICE_PROVIDER'
  is_active: boolean
  profile_image: string | null
  street_address: string
  city: string
  state: string
  postal_code: string
  country: string
  latitude: string | null
  longitude: string | null
  created_at: string
  updated_at: string
}

export type AuthTokenResponse = {
  access: string
  refresh: string
  user: AdminUser
}

export function loginAdmin(email: string, password: string) {
  return apiRequest<AuthTokenResponse>('/api/auth/admin/login/', {
    method: 'POST',
    auth: false,
    body: { email, password },
  })
}

export function getCurrentUser() {
  return apiRequest<AdminUser>('/api/users/me/')
}
