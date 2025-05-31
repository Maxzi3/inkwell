import { createContext, useContext, useEffect, useState } from "react";
import api, { setAccessToken } from "../services/api";



interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await api.post("/auth/refresh-token"); // Cookie auto-sent
        const token = res.data.accessToken;
        setAccessToken(token); // Set to memory
        setIsAuthenticated(true);
      } catch {
        setAccessToken(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
