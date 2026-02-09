import type { User, UserFormData } from '../types/user.types';

const STORAGE_KEY = 'users_data';
const INITIAL_USERS: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '9876543210'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@example.com',
    phoneNumber: '5551234567'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    phoneNumber: '5559876543'
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@example.com',
    phoneNumber: '5555551234'
  }
];

/**
 * LocalStorage-based API fallback for production deployment
 * Used when JSON-server is not available
 */
export class LocalStorageApiService {
  private static getUsers(): User[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Initialize with sample data if empty
      this.saveUsers(INITIAL_USERS);
      return INITIAL_USERS;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return INITIAL_USERS;
    }
  }

  private static saveUsers(users: User[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private static delay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Fetch all users from localStorage
   */
  static async getAllUsers(): Promise<User[]> {
    await this.delay();
    return this.getUsers();
  }

  /**
   * Create a new user in localStorage
   */
  static async createUser(userData: UserFormData): Promise<User> {
    await this.delay();
    const users = this.getUsers();
    const newUser: User = {
      id: this.generateId(),
      ...userData
    };
    const updatedUsers = [...users, newUser];
    this.saveUsers(updatedUsers);
    return newUser;
  }

  /**
   * Update an existing user in localStorage
   */
  static async updateUser(id: string, userData: UserFormData): Promise<User> {
    await this.delay();
    const users = this.getUsers();
    const updatedUser: User = { id, ...userData };
    const updatedUsers = users.map(user => 
      user.id === id ? updatedUser : user
    );
    this.saveUsers(updatedUsers);
    return updatedUser;
  }

  /**
   * Delete a user from localStorage
   */
  static async deleteUser(id: string): Promise<void> {
    await this.delay();
    const users = this.getUsers();
    const updatedUsers = users.filter(user => user.id !== id);
    this.saveUsers(updatedUsers);
  }

  /**
   * Get a single user by ID from localStorage
   */
  static async getUserById(id: string): Promise<User | null> {
    await this.delay();
    const users = this.getUsers();
    return users.find(user => user.id === id) || null;
  }
}
