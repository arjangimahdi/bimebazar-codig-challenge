import type { ApiConfig, RequestOptions, ApiResponse, ApiClient } from '@/types/api'

export const useApi = (config: ApiConfig = {}): ApiClient => {
  const {
    baseURL = import.meta.env.VITE_APP_API_BASE_URL as string,
    timeout = Number(import.meta.env.VITE_APP_API_TIMEOUT) ?? 15000,
    headers: defaultHeaders = {},
  } = config

  const buildUrl = (url: string, query?: Record<string, unknown>): string => {
    const u = new URL(url, baseURL || window.location.origin)
    if (query) {
      Object.entries(query).forEach(([k, v]) => {
        if (v !== undefined && v !== null) u.searchParams.set(k, String(v))
      })
    }
    return baseURL ? u.toString() : u.pathname + u.search
  }

  const request = async <T = unknown>(
    url: string,
    options: RequestOptions = {},
  ): Promise<ApiResponse<T>> => {
    const { method = 'GET', headers = {}, body, query } = options

    const targetUrl = buildUrl(url, query)
    const init: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders,
        ...headers,
      },
    }
    if (body !== undefined) init.body = typeof body === 'string' ? body : JSON.stringify(body)
    try {
      const resp = await fetch(baseURL ? new URL(targetUrl, baseURL).toString() : targetUrl, init)
      const payload = await resp.json()
      if (!resp.ok) {
        const error = new Error(payload.error || 'خطایی رخ داده است')
        throw error
      }
      return {
        data: payload as unknown as T,
        status: resp.status,
        statusText: resp.statusText,
      }
    } catch (error: unknown) {
      if (error instanceof Error) throw error
      throw new Error('خطایی رخ داده است')
    }
  }

  const get = <T = unknown>(url: string, options: Omit<RequestOptions, 'method' | 'body'> = {}) => {
    return request<T>(url, { ...options, method: 'GET' })
  }

  const post = <T = unknown>(
    url: string,
    body?: unknown,
    options: Omit<RequestOptions, 'method'> = {},
  ) => {
    return request<T>(url, { ...options, method: 'POST', body })
  }

  return {
    request,
    get,
    post,
  }
}
