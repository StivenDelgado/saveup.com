import { clearTokens, setTokens } from '@/lib/utils';
import { HttpService } from '../httpService';
import Cookies from 'js-cookie';
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken?: string;
  refreshToken?: string;
  success: boolean;
  message?: string;
}

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<boolean> {

    const response = await HttpService.post<AuthResponse>('/user/login', credentials);
    setTokens(response.accessToken, response.refreshToken);
    return response.success;
    
  }

  static async register(data: RegisterData): Promise<AuthResponse> {
    return await HttpService.post<AuthResponse>('/user/register', data);
  }

  static async logout(): Promise<void> {
    await HttpService.post('/user/logout');
    clearTokens();
  }

  static async getCurrentUser(): Promise<AuthResponse> {
    return HttpService.get<AuthResponse>('/user/me');
  }

  static async refreshAccessToken(): Promise<AuthResponse> {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await HttpService.post<AuthResponse>('/user/generate-token', { refreshToken });
    setTokens(response.accessToken, response.refreshToken);
    return response;
  }

  static async recoverPassword(email: string): Promise<void> {
    await HttpService.post('/user/recover-password', { email });
  }

  static async changePassword(id_user: number,newPassword: string): Promise<AuthResponse> {
    return await HttpService.post<AuthResponse>(`/user/change-password`, { id_user, newPassword });
  }
}