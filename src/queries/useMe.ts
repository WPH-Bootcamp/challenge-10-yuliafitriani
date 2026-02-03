import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "@/lib/auth.api";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
  });
};
