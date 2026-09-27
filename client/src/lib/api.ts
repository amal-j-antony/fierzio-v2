import axios from "axios";
import { logger } from "./logger";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export type ApiErrorBody = {
  error?: {
    message?: string;
    code?: string;
  };
};

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorBody | undefined;
    return data?.error?.message ?? fallback;
  }
  return fallback;
};

const requestIdHeader = "X-Request-Id";

api.interceptors.request.use((config) => {
  config.headers.set(requestIdHeader, crypto.randomUUID());
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const route = (error.config?.url ?? "").split("?")[0];
      const requestId =
        (error.response?.headers?.["x-request-id"] as string | undefined) ??
        (error.config?.headers?.get?.(requestIdHeader) as string | undefined);

      const isSessionProbe = route === "/auth/me" && statusCode === 401;
      const level =
        statusCode && statusCode >= 500 ? "error" : isSessionProbe ? "debug" : "warn";

      logger[level](
        {
          requestId,
          method: error.config?.method?.toUpperCase(),
          route,
          statusCode,
        },
        "API request failed",
      );
    }

    return Promise.reject(error);
  },
);
