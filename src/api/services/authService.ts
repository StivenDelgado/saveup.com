import { HttpService } from '../httpService';

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
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return HttpService.post<AuthResponse>('/user/login', credentials);
  }

  static async register(data: RegisterData): Promise<AuthResponse> {
    return HttpService.post<AuthResponse>('/user/register', data);
  }

  static async logout(): Promise<void> {
    return HttpService.post('/user/logout');
  }

  static async getCurrentUser(): Promise<AuthResponse> {
    return HttpService.get<AuthResponse>('/user/me');
  }
}