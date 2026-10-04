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

export function initiatePasswordReset(email: string) {
  return apiRequest<{ message: string; expires_in_seconds: number }>('/api/auth/forget-pass/initiate/', {
    method: 'POST',
    auth: false,
    body: { email },
  })
}

export function verifyPasswordResetOtp(email: string, otp: string) {
  return apiRequest<{ reset_token: string; message: string }>('/api/auth/forget-pass/verify/', {
    method: 'POST',
    auth: false,
    body: { email, otp },
  })
}

export function completePasswordReset(resetToken: string, newPassword: string, confirmNewPassword: string) {
  return apiRequest<{ reset_token: string }>('/api/auth/forget-pass/complete/', {
    method: 'POST',
    auth: false,
    body: {
      reset_token: resetToken,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    },
  })
}

export function updateCurrentUserProfile(input: { full_name: string; phone_number: string }) {
  return apiRequest<AdminUser>('/api/users/me/update/', {
    method: 'PATCH',
    body: input,
  })
}

export function changePassword(currentPassword: string, newPassword: string, confirmNewPassword: string) {
  return apiRequest<{ message?: string }>('/api/users/change-password/', {
    method: 'POST',
    body: {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    },
  })
}

export function logoutSession(refresh: string) {
  return apiRequest<void>('/api/auth/logout/', {
    method: 'POST',
    body: { refresh },
  })
}
