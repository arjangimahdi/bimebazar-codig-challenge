export interface ApiConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
}

export type HttpMethod = 'GET' | 'POST'

export interface RequestOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: unknown
  query?: Record<string, unknown>
  timeout?: number
}

export interface ApiResponse<T = unknown> {
  data: T
  status: number
  statusText: string
}

export interface ApiClient {
  request: <T = unknown>(url: string, options?: RequestOptions) => Promise<ApiResponse<T>>
  get: <T = unknown>(
    url: string,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ) => Promise<ApiResponse<T>>
  post: <T = unknown>(
    url: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'method'>,
  ) => Promise<ApiResponse<T>>
}
