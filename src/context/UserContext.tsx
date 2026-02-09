import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { UserContextType } from '../types/user.types';
import { useUsers } from '../hooks/useUsers';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const userManagement = useUsers();

  return (
    <UserContext.Provider value={userManagement}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within UserProvider');
  }
  return context;
};
