export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export type UserFormData = Omit<User, 'id'>;

export interface UserContextType {
  users: User[];
  addUser: (user: UserFormData) => Promise<void>;
  updateUser: (id: string, user: UserFormData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
