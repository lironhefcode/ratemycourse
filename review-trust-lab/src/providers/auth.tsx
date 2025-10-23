import { createContext, useContext, useEffect, useState } from "react";
import { AuthState, authService } from "@/services/auth.service";

type AuthContextValue = {
  auth: AuthState;
  setAuth: (state: AuthState) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [auth, setAuthState] = useState<AuthState>(() => authService.load());

  useEffect(() => {
    authService.save(auth);
  }, [auth]);

  const value: AuthContextValue = {
    auth,
    setAuth: setAuthState,
    logout: () => setAuthState({ token: null, user: null }),
    isLoggedIn: !!auth.token && !!auth.user,
    isAdmin: authService.isAdmin(auth.user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
