import { UserAuth } from "@/api/auth.service";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: UserAuth | null;
  token: string | null;
  login: (token: string, userData: UserAuth) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const saveToken = async (token: string) => {};

const removeToken = async () => {};

const loadToken = async (): Promise<string | null> => {
  return null;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserAuth | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (newToken: string, userData: UserAuth) => {
    await saveToken(newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = async () => {
    await removeToken();
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = await loadToken();
      if (storedToken) {
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const value = {
    user,
    token,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }

  return context;
};
