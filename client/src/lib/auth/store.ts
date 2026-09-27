import { create } from "zustand";
import type { PublicUser } from "./types";

type AuthState = {
  user: PublicUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setUser: (user: PublicUser | null) => void;
  setInitializing: (isInitializing: boolean) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitializing: true,
  setUser: (user) => set({ user, isAuthenticated: user !== null }),
  setInitializing: (isInitializing) => set({ isInitializing }),
  reset: () => set({ user: null, isAuthenticated: false, isInitializing: false }),
}));
