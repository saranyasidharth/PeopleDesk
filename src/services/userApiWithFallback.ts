import { UserApiService } from './userApi';
import { LocalStorageApiService } from './localStorageApi';
import type { User, UserFormData } from '../types/user.types';

/**
 * Unified API service that tries JSON-server first, falls back to localStorage
 * Perfect for production deployment where JSON-server is not available
 */
export class UserApiWithFallback {
  private static useLocalStorage = false;
  private static hasCheckedApi = false;

  /**
   * Check if API is available
   */
  private static async checkApiAvailability(): Promise<boolean> {
    if (this.hasCheckedApi) {
      return !this.useLocalStorage;
    }

    try {
      // Try to fetch users with a short timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/users`, {
        signal: controller.signal,
        method: 'HEAD'
      });
      
      clearTimeout(timeoutId);
      this.useLocalStorage = false;
      this.hasCheckedApi = true;
      console.log('✅ API server available - using JSON-server');
      return true;
    } catch (error) {
      this.useLocalStorage = true;
      this.hasCheckedApi = true;
      console.log('⚠️ API server unavailable - using localStorage fallback');
      return false;
    }
  }

  /**
   * Fetch all users (with fallback)
   */
  static async getUsers(): Promise<User[]> {
    await this.checkApiAvailability();

    if (this.useLocalStorage) {
      return LocalStorageApiService.getAllUsers();
    }

    try {
      return await UserApiService.getUsers();
    } catch (error) {
      console.warn('API failed, falling back to localStorage:', error);
      this.useLocalStorage = true;
      return LocalStorageApiService.getAllUsers();
    }
  }

  /**
   * Create a new user (with fallback)
   */
  static async createUser(userData: UserFormData): Promise<User> {
    if (this.useLocalStorage) {
      return LocalStorageApiService.createUser(userData);
    }

    try {
      return await UserApiService.createUser(userData);
    } catch (error) {
      console.warn('API failed, falling back to localStorage:', error);
      this.useLocalStorage = true;
      return LocalStorageApiService.createUser(userData);
    }
  }

  /**
   * Update an existing user (with fallback)
   */
  static async updateUser(id: string, userData: UserFormData): Promise<User> {
    if (this.useLocalStorage) {
      return LocalStorageApiService.updateUser(id, userData);
    }

    try {
      return await UserApiService.updateUser(id, userData);
    } catch (error) {
      console.warn('API failed, falling back to localStorage:', error);
      this.useLocalStorage = true;
      return LocalStorageApiService.updateUser(id, userData);
    }
  }

  /**
   * Delete a user (with fallback)
   */
  static async deleteUser(id: string): Promise<void> {
    if (this.useLocalStorage) {
      return LocalStorageApiService.deleteUser(id);
    }

    try {
      return await UserApiService.deleteUser(id);
    } catch (error) {
      console.warn('API failed, falling back to localStorage:', error);
      this.useLocalStorage = true;
      return LocalStorageApiService.deleteUser(id);
    }
  }

  /**
   * Get a single user by ID (with fallback)
   */
  static async getUserById(id: string): Promise<User | null> {
    if (this.useLocalStorage) {
      return LocalStorageApiService.getUserById(id);
    }

    try {
      const user = await UserApiService.getUserById(id);
      return user;
    } catch (error) {
      console.warn('API failed, falling back to localStorage:', error);
      this.useLocalStorage = true;
      return LocalStorageApiService.getUserById(id);
    }
  }

  /**
   * Force use of localStorage (useful for testing)
   */
  static forceLocalStorage(): void {
    this.useLocalStorage = true;
    this.hasCheckedApi = true;
    console.log('🔄 Forced localStorage mode');
  }

  /**
   * Reset API check (useful for retrying)
   */
  static resetApiCheck(): void {
    this.useLocalStorage = false;
    this.hasCheckedApi = false;
    console.log('🔄 Reset API check');
  }

  /**
   * Check current mode
   */
  static isUsingLocalStorage(): boolean {
    return this.useLocalStorage;
  }
}
