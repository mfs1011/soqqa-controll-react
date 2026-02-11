import type { ItemResponse } from "@/types/api/paginated-response";
import apiClient from "./client";

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
