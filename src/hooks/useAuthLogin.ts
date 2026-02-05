import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { loginApi, getMeApi } from "@/lib/auth.api";
import { LoginPayload, LoginResponse } from "@/types/auth";
import { loginSuccess } from "@/store/authSlice";

export const useAuthLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: loginApi,

    onSuccess: async (res) => {
      // 1️⃣ simpan token
      localStorage.setItem("token", res.token);

      // 2️⃣ fetch user
      const me = await queryClient.fetchQuery({
        queryKey: ["me"],
        queryFn: getMeApi,
      });

      // 3️⃣ simpan ke redux
      dispatch(loginSuccess(me));

      // 4️⃣ optional: cache user
      queryClient.setQueryData(["me"], me);
    },
  });
};
