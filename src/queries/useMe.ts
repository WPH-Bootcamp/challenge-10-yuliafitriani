import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "@/lib/auth.api";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
    staleTime: 1000 * 60 * 5, // 5 minutes only
  });
};
