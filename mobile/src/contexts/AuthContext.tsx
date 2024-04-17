import React, { ReactNode, createContext, useState } from "react";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  const isAuthenticated = Boolean(user.name);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
