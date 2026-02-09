import { useState, useCallback, useEffect } from 'react';
import type { User, UserFormData } from '../types/user.types';
import { UserApiService } from '../services/userApi';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users on mount
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await UserApiService.getUsers();
      setUsers(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users';
      setError(errorMessage);
      console.error('Error fetching users:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = useCallback(async (userData: UserFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newUser = await UserApiService.createUser(userData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      console.error('Error creating user:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (id: string, userData: UserFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedUser = await UserApiService.updateUser(id, userData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? updatedUser : user))
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      console.error('Error updating user:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await UserApiService.deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      setError(errorMessage);
      console.error('Error deleting user:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    users,
    addUser,
    updateUser,
    deleteUser,
    isLoading,
    error,
    refetch: fetchUsers,
  };
};
