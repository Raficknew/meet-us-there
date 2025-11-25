import type { UserResponse } from "@repo/shared/responses";
import { create } from "zustand";
import { axiosInstance } from "../lib/api/axios";
import { UsersService } from "../lib/api/Users.service";

export interface AuthState {
  user: UserResponse | null;
  isLoading: boolean;

  handleAccessToken: (token: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  handleAccessToken: async (token: string) => {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const user = await UsersService.getMyUser();
      console.log("Fetched user:", user);
      set({ user, isLoading: false });
    } catch (error) {
      console.error(error);

      set({ user: null, isLoading: false });
    }
  },

  logout: () => {
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=None; Secure";
    axiosInstance.defaults.headers.common["Authorization"] = "";
    set({ user: null });
  },
}));
