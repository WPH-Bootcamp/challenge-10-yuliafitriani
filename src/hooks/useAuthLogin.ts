import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi, getMeApi } from "@/lib/auth.api";
import { LoginPayload, LoginResponse } from "@/types/auth";
export const useAuthLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: loginApi,
    onSuccess: async (res) => {
      localStorage.setItem("token", res.token);

      const me = await queryClient.fetchQuery({
        queryKey: ["me"],
        queryFn: getMeApi,
      });

      localStorage.setItem("user", JSON.stringify(me));
    },
  });
};
