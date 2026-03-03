import { useMutation } from "@tanstack/react-query";
import { registerApi } from "@/lib/register.api";
import { RegisterPayload } from "@/types/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await registerApi(payload);
      return res;
    },
  });
};
