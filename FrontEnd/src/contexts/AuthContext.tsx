import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<Array<any>>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const register = async (username: string, password: string) => {
    if (username && password) {
      const result = await axios.post("http://localhost:4000/regi/register", {
        username,
        password,
      });

      if (result.status == 201) return true;
      return false;
    }
  };

  const login = async (username: string, password: string) => {
    if (username && password) {
      const result = await axios.post("http://localhost:4000/regi/login", {
        username,
        password,
      });

      console.log(result.status);
      console.log(result.data.message);

      if (result.status == 200) {
        localStorage.setItem("token", result.data.token);
        setUser({ username });
        return [true, result.data.message];
      }
      return [false, result.data.message];
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
