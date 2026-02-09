import { apiClient } from './api';
import { API_ENDPOINTS } from '../config/api.config';
import type { User, UserFormData } from '../types/user.types';

export class UserApiService {

  static async getUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get<User[]>(API_ENDPOINTS.users);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }

 
  static async createUser(userData: UserFormData): Promise<User> {
    try {
      const response = await apiClient.post<User>(API_ENDPOINTS.users, userData);
      return response.data;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  }


  static async updateUser(id: string, userData: UserFormData): Promise<User> {
    try {
      const response = await apiClient.put<User>(
        `${API_ENDPOINTS.users}/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  }

  static async deleteUser(id: string): Promise<void> {
    try {
      await apiClient.delete(`${API_ENDPOINTS.users}/${id}`);
    } catch (error) {
      console.error('Failed to delete user:', error);
      throw error;
    }
  }


  static async getUserById(id: string): Promise<User> {
    try {
      const response = await apiClient.get<User>(`${API_ENDPOINTS.users}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw error;
    }
  }
}
