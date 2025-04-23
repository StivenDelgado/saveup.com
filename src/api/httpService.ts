import { apiClient } from './config';
import { AxiosResponse } from 'axios';

export class HttpService {
  static async get<T>(url: string, params?: any): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.get(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.post(url, data);
    return response.data;
  }

  static async put<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.put(url, data);
    return response.data;
  }

  static async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.delete(url);
    return response.data;
  }

}