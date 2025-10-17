/**
 * Legacy API file - Refactored to use services
 *
 * This file now acts as a facade/adapter layer for backward compatibility.
 * All business logic has been moved to respective services following SOLID principles.
 *
 * New code should import services directly instead of using this file.
 */

import { useMutation, useQuery } from "@tanstack/react-query";
import type {
	LoginCredentials,
	FakeStoreLoginResponse,
	FakeStoreUser,
	User,
} from "../types/auth";
import { authService } from "@/services/AuthService";
import { HttpClient } from "@/services/HttpClient";
import { config } from "@/components/config";

// Create HTTP client for backward compatibility
const httpClient = new HttpClient(config.apiBaseUrl);

// API functions - now delegate to services
export const loginUser = async (
	credentials: LoginCredentials
): Promise<FakeStoreLoginResponse> => {
	return httpClient.post<FakeStoreLoginResponse>("/auth/login", {
		username: credentials.username,
		password: credentials.password,
	});
};

export const getUserProfile = async (
	userId: number
): Promise<FakeStoreUser> => {
	return httpClient.get<FakeStoreUser>(`/users/${userId}`);
};

// Helper function to convert FakeStoreUser to our User type
export const mapFakeStoreUserToUser = (fakeStoreUser: FakeStoreUser): User => {
	return {
		id: fakeStoreUser.id,
		username: fakeStoreUser.username,
		email: fakeStoreUser.email,
		role: "user",
		createdAt: new Date(),
		updatedAt: new Date(),
	};
};

// TanStack Query hooks
export const useLoginMutation = () => {
	return useMutation({
		mutationFn: loginUser,
		onError: error => {
			console.error("Login failed:", error);
		},
	});
};

export const useUserQuery = (userId: number | null) => {
	return useQuery({
		queryKey: ["user", userId],
		queryFn: () => getUserProfile(userId!),
		enabled: !!userId,
		staleTime: 5 * 60 * 1000,
	});
};

// Storage utilities - delegate to AuthService
export const getStoredToken = (): string | null => {
	return authService.getStoredToken();
};

export const setStoredToken = (token: string): void => {
	authService.setStoredToken(token);
};

export const clearStoredToken = (): void => {
	authService.clearStoredToken();
};

export const getStoredUser = (): User | null => {
	return authService.getStoredUser();
};

export const setStoredUser = (user: User): void => {
	authService.setStoredUser(user);
};

export const clearStoredUser = (): void => {
	authService.clearStoredUser();
};
