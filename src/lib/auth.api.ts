import api from "@/lib/api";
import { LoginPayload, LoginResponse } from "@/types/auth";
import type { User } from "@/types/user";

export const loginApi = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
};

export const getMeApi = async (): Promise<User> => {
  const res = await api.get("/users/me");
  return res.data;
};
