import { withApiBase } from '@/config/api';

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: Record<string, unknown> | string | undefined;
};

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

const buildInit = (options: RequestOptions = {}): RequestInit => {
  const headers = new Headers(options.headers);
  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  return {
    ...options,
    headers,
    body:
      options.body && !(options.body instanceof FormData)
        ? typeof options.body === 'string'
          ? options.body
          : JSON.stringify(options.body)
        : options.body,
  } satisfies RequestInit;
};

export const request = async <T>(path: string, options?: RequestOptions): Promise<T> => {
  const response = await fetch(withApiBase(path), buildInit(options));

  if (!response.ok) {
    let details: unknown;
    try {
      details = await response.json();
    } catch (error) {
      details = await response.text();
    }
    throw new ApiError(response.statusText || 'Request failed', response.status, details);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};
