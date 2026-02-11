import type { ItemResponse } from "@/types/api/paginated-response";
import apiClient from "./client";
import { clearTokens } from "../auth-tokens";

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthInputs {
    email: string;
    password: string;
}

export function auth(data: AuthInputs): Promise<ItemResponse<AuthTokens>> {
    return apiClient.post(`/users/auth`, data);
}

export function authByRefreshToken(refreshToken: string): Promise<ItemResponse<AuthTokens>> {
    return apiClient.post(`/users/refresh-auth`, { refreshToken });
}

export function aboutMe(): Promise<ItemResponse<{ email: string }>> {
    return apiClient.get(`/users/me`);
}

export function logout(): void {
    clearTokens();
}