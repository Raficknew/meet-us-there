import { axiosInstance } from "@/lib/api/axios";

const createGroup = async (data: { name: string; description?: string }) => {
  return axiosInstance
    .post("/api/rest/v1/group/create", data)
    .then((res) => res.data);
};

export const GroupService = {
  createGroup,
};
