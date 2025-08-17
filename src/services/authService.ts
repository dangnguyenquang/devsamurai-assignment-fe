import { endpoints } from "@/lib/http/endpoints";
import { httpClient } from "@/lib/http/httpClient";
import type { AuthResponse, LoginRequest, RegisterRequest, User } from "@/types/auth";
import type { ApiResponse } from "@/types/response";

class AuthService {
  async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return httpClient.post<AuthResponse>(endpoints.auth.register, data);
  }

  async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return httpClient.post<AuthResponse>(endpoints.auth.login, data);
  }
  
  async logout(): Promise<ApiResponse> {
    const response = await httpClient.post(endpoints.auth.logout);
    if (response.success) {
      httpClient.removeAuthToken();
    }
    return response;
  }

  async getMe(): Promise<ApiResponse<User>> {
    return httpClient.get<User>(endpoints.auth.me);
  }
}

export const authService = new AuthService();