"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import { useAuthStore } from "./store";
import type { AuthUserResponse, PublicUser } from "./types";

export const authKeys = {
  me: ["auth", "me"] as const,
};

const fetchCurrentUser = async (): Promise<PublicUser> => {
  const { data } = await api.get<AuthUserResponse>("/auth/me");
  return data.user;
};

export const useCurrentUser = () =>
  useQuery({
    queryKey: authKeys.me,
    queryFn: fetchCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await api.post<AuthUserResponse>(
        "/auth/login",
        credentials,
      );
      return data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.me, user);
      setUser(user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (input: {
      email: string;
      password: string;
      passwordConfirmation: string;
    }) => {
      const { data } = await api.post<AuthUserResponse>("/auth/register", input);
      return data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.me, user);
      setUser(user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const reset = useAuthStore((state) => state.reset);

  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.me });
      reset();
    },
  });
};
