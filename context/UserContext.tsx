import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  isBarber: boolean;
} | null;

type UserContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }}>
      {children}
    </UserContext.Provider>
  );
}