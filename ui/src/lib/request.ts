import type { RootState } from "@/store";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/", // backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to inject JWT automatically
export const attachTokenInterceptor = (getState: () => RootState) => {
  api.interceptors.request.use((config) => {
    const token = getState().auth.token; // get JWT from redux
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

export default api;
