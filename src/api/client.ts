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
  skipRefresh?: boolean
}

export function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  return window.localStorage.getItem(REFRESH_TOKEN_KEY)
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

  const response = await sendRequest(path, options)
  const data = await parseResponse(response)

  if (response.status === 401 && options.auth !== false && !options.skipRefresh) {
    const refreshed = await refreshAccessToken()
    if (refreshed) {
      const retryResponse = await sendRequest(path, { ...options, skipRefresh: true })
      const retryData = await parseResponse(retryResponse)

      if (!retryResponse.ok) {
        throw new ApiError(resolveErrorMessage(retryData, retryResponse.statusText), retryResponse.status, retryData)
      }

      return retryData as T
    }

    clearAuthTokens()
  }

  if (!response.ok) {
    throw new ApiError(resolveErrorMessage(data, response.statusText), response.status, data)
  }

  return data as T
}

async function sendRequest(path: string, options: ApiRequestOptions) {
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

  return fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body: hasJsonBody ? JSON.stringify(options.body) : (options.body as BodyInit | undefined),
  })
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get('content-type') || ''
  return contentType.includes('application/json') ? response.json() : response.text()
}

async function refreshAccessToken() {
  const refresh = getRefreshToken()
  if (!refresh) return false

  const response = await fetch(`${API_BASE_URL}/api/auth/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh }),
  })

  if (!response.ok) return false

  const data = (await parseResponse(response)) as { access?: string; refresh?: string }
  if (!data.access) return false

  setAuthTokens(data.access, data.refresh || refresh)
  return true
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
