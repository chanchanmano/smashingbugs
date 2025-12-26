import type { RootState } from "@/store";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: "http://localhost:8000/",
  headers: { "Content-Type": "application/json" },
});


export const attachTokenInterceptor = (getState: () => RootState) => {
  api.interceptors.request.use((config) => {
    const token = getState().auth.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export interface RequestOptions<T = any> extends AxiosRequestConfig {
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (response: AxiosResponse<T>) => void;
  onError?: (error: any) => void;
  shouldThrow?: boolean;
}

export async function request<T = any>(
  options: RequestOptions<T>
): Promise<AxiosResponse<T>> {
  const {
    successMessage,
    errorMessage,
    onSuccess,
    onError,
    shouldThrow = true,
    ...axiosOptions
  } = options;

  try {
    const response = await api.request<T>(axiosOptions);
    if (onSuccess) {
      onSuccess(response);
    } else {
      successMessage && toast.success(successMessage);
    }
    return response;
  } catch (error: any) {
    console.error("API Error:", error.response || error.message);
    if (onError) {
      onError(error);
    } else {
      toast.error(
        errorMessage || error.response?.data?.detail || "Something went wrong."
      );
    }
    if (shouldThrow) throw error;
    throw error;
  }
}


export const requestHelper = {
  GET: <T>(options: RequestOptions<T>) =>
    request<T>({ ...options, method: "GET" }),
  POST: <T>(options: RequestOptions<T>) =>
    request<T>({ ...options, method: "POST" }),
  PUT: <T>(options: RequestOptions<T>) =>
    request<T>({ ...options, method: "PUT" }),
  PATCH: <T>(options: RequestOptions<T>) =>
    request<T>({ ...options, method: "PATCH" }),
  DELETE: <T>(options: RequestOptions<T>) =>
    request<T>({ ...options, method: "DELETE" }),
};

export default requestHelper;
