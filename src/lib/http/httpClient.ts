import type { ApiResponse } from "@/types/response";

const TOKEN_STORAGE_KEY = 'auth_token';

export class HttpClient {
  private baseURL: string;
  private defaultHeaders: HeadersInit;

  constructor(baseURL: string = import.meta.env.VITE_PUBLIC_BACKEND_URL || '/api') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };

    this.restoreAuthToken();
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }

      if (!response.ok) {
        if (response.status === 401 && this.hasAuthToken()) {
          this.removeAuthToken();
        }

        return {
          success: false,
          message: data.message || `HTTP ${response.status}: ${response.statusText}`,
          errors: data.errors || {},
          status: response.status,
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
        status: response.status,
      };
    } catch (error) {
      console.error('HTTP Request Error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error occurred',
        status: 0,
      };
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  setAuthToken(token: string) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      Authorization: `Bearer ${token}`,
    };

    try {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch (error) {
      console.warn('Failed to save token to localStorage:', error);
    }
  }

  removeAuthToken() {
    const { Authorization, ...headers } = this.defaultHeaders as any;
    this.defaultHeaders = headers;

    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to remove token from localStorage:', error);
    }
  }

  private restoreAuthToken() {
    try {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (token) {
        this.defaultHeaders = {
          ...this.defaultHeaders,
          Authorization: `Bearer ${token}`,
        };
      }
    } catch (error) {
      console.warn('Failed to restore token from localStorage:', error);
    }
  }

  hasAuthToken(): boolean {
    return 'Authorization' in this.defaultHeaders;
  }

  getAuthToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to get token from localStorage:', error);
      return null;
    }
  }

  setBaseURL(url: string) {
    this.baseURL = url;
  }

  setDefaultHeader(key: string, value: string) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      [key]: value,
    };
  }

  removeDefaultHeader(key: string) {
    const { [key]: removed, ...headers } = this.defaultHeaders as any;
    this.defaultHeaders = headers;
  }
}

export const httpClient = new HttpClient();
export default httpClient;