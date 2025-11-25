import type { UserResponse } from "@repo/shared/responses";
import { axiosInstance } from "./axios";

const getMyUser = async (): Promise<UserResponse> => {
  return await axiosInstance
    .get<UserResponse>("/api/rest/v1/users/@me")
    .then((res) => res.data);
};

export const UsersService = {
  getMyUser,
};
