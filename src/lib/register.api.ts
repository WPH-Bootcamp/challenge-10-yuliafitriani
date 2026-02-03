import api from "@/lib/api";
import { RegisterPayload, RegisterResponse } from "@/types/auth";

export const registerApi = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  const { data } = await api.post<RegisterResponse>("/auth/register", payload);

  return data;
};
