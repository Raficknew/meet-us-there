import { create } from "zustand";

export interface AuthStore {
  user: null;
  isLoading: boolean;
}

export const useAuthStore = create<AuthStore>(() => ({
  user: null,
  isLoading: false,
}));
