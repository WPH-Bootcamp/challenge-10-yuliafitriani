import axios from "axios";
import { ApiError } from "@/types/error";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = error.response?.data as ApiError | undefined;

    const message =
      apiError?.details?.errors?.[0] ??
      apiError?.message ??
      "Something went wrong";

    return Promise.reject(new Error(message));
  },
);

export default api;
