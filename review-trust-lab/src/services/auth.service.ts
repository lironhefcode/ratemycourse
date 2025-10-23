import { googleLogout } from "@react-oauth/google";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
};

export type AuthState = {
  token: string | null;
  user: AuthUser | null;
};

const STORAGE_KEY = "auth_state";

export const authService = {
  save(state: AuthState) {
    delete state.user.isAdmin;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },
  load(): AuthState {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { token: null, user: null };
    try {
      const loadedState = JSON.parse(raw);
      loadedState.user.isAdmin = false;
      return loadedState as AuthState;
    } catch {
      return { token: null, user: null };
    }
  },
  logout() {
    googleLogout();
    sessionStorage.removeItem(STORAGE_KEY);
  },
  isAdmin(user: AuthUser | null): boolean {
    return user?.isAdmin || false;
  },
};
