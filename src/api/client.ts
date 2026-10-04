const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')

const ACCESS_TOKEN_KEY = 'goswift_access_token'
const REFRESH_TOKEN_KEY = 'goswift_refresh_token'

export class ApiError extends Error {
  status: number
  data: unknown

  constructor(message: string, status: number, data: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
  auth?: boolean
}

export function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function setAuthTokens(access: string, refresh: string) {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, access)
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
}

export function clearAuthTokens() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  window.localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError('VITE_API_BASE_URL is not configured.', 0, null)
  }

  const headers = new Headers(options.headers)
  const hasJsonBody = options.body !== undefined && !(options.body instanceof FormData)

  if (hasJsonBody && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (options.auth !== false) {
    const token = getAccessToken()
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body: hasJsonBody ? JSON.stringify(options.body) : (options.body as BodyInit | undefined),
  })

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await response.json() : await response.text()

  if (!response.ok) {
    throw new ApiError(resolveErrorMessage(data, response.statusText), response.status, data)
  }

  return data as T
}

function resolveErrorMessage(data: unknown, fallback: string) {
  if (typeof data === 'string' && data.trim()) return data
  if (isRecord(data)) {
    if (typeof data.detail === 'string') return data.detail
    if (typeof data.message === 'string') return data.message
    const firstValue = Object.values(data)[0]
    if (Array.isArray(firstValue) && typeof firstValue[0] === 'string') return firstValue[0]
    if (typeof firstValue === 'string') return firstValue
  }
  return fallback || 'Request failed.'
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
