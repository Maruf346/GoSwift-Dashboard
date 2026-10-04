import { apiRequest } from './client'

export type SupportTicketStatus = 'pending' | 'resolved'

export type SupportTicketApi = {
  id: string
  subject: string
  email: string
  message: string
  attachment: string | null
  status: SupportTicketStatus
  created_at: string
  updated_at: string
  user: number | null
}

type RawSupportTicketList =
  | {
      count: number
      next: string | null
      previous: string | null
      results: SupportTicketApi[]
    }
  | {
      count: number
      next: string | null
      previous: string | null
      results: Array<{
        count?: number
        next?: string | null
        previous?: string | null
        results?: SupportTicketApi[]
      }>
    }

export async function listSupportTickets(filters: {
  page: number
  pageSize: number
  search?: string
  status?: SupportTicketStatus
}) {
  const params = new URLSearchParams()
  params.set('page', String(filters.page))
  params.set('page_size', String(filters.pageSize))
  params.set('ordering', '-created_at')
  if (filters.search?.trim()) params.set('search', filters.search.trim())
  if (filters.status) params.set('status', filters.status)

  const response = await apiRequest<RawSupportTicketList>(
    `/api/supports/admin/support-tickets/?${params.toString()}`
  )

  if (response.results.length > 0 && 'results' in response.results[0]) {
    const nested = response.results[0]
    return {
      count: nested.count ?? response.count,
      next: nested.next ?? null,
      previous: nested.previous ?? null,
      results: nested.results ?? [],
    }
  }

  return response as {
    count: number
    next: string | null
    previous: string | null
    results: SupportTicketApi[]
  }
}

export function getSupportTicket(id: string) {
  return apiRequest<SupportTicketApi>(`/api/supports/admin/support-tickets/${id}/`)
}

export function updateSupportTicketStatus(id: string, status: SupportTicketStatus) {
  return apiRequest<SupportTicketApi>(`/api/supports/admin/support-tickets/${id}/`, {
    method: 'PATCH',
    body: { status },
  })
}
