import { Rol } from "@/api/auth.service";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  nombre: string;
  rol: Rol;
  correo: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const saveToken = async (token: string) => {
  console.log("Token guardado:", token);
};

const removeToken = async () => {
  console.log("Token eliminado");
};

const loadToken = async (): Promise<string | null> => {
  return null;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (newToken: string, userData: User) => {
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
