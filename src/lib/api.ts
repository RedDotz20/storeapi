import { useMutation, useQuery } from "@tanstack/react-query";
import type {
	LoginCredentials,
	PlatziLoginResponse,
	PlatziUser,
	User,
} from "../types/auth";
import { config } from "@/components/config";

// API base URL
const API_BASE_URL = config.apiBaseUrl;

// API functions
export const loginUser = async (
	credentials: LoginCredentials
): Promise<PlatziLoginResponse> => {
	const response = await fetch(`${API_BASE_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: credentials.email,
			password: credentials.password,
		}),
	});

	if (!response.ok) {
		throw new Error("Invalid credentials");
	}

	return response.json();
};

export const getUserProfile = async (token: string): Promise<PlatziUser> => {
	const response = await fetch(`${API_BASE_URL}/auth/profile`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch user data");
	}

	return response.json();
};

// Helper function to convert PlatziUser to our User type
export const mapPlatziUserToUser = (platziUser: PlatziUser): User => {
	return {
		id: platziUser.id,
		username: platziUser.name,
		email: platziUser.email,
		role: platziUser.role === "admin" ? "admin" : "user",
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

export const useUserQuery = (token: string | null) => {
	return useQuery({
		queryKey: ["user", token],
		queryFn: () => getUserProfile(token!),
		enabled: !!token,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

// Storage utilities for token management
export const getStoredToken = (): string | null => {
	try {
		return localStorage.getItem("auth_token");
	} catch {
		return null;
	}
};

export const setStoredToken = (token: string): void => {
	try {
		localStorage.setItem("auth_token", token);
	} catch {
		// Ignore storage errors
	}
};

export const clearStoredToken = (): void => {
	try {
		localStorage.removeItem("auth_token");
	} catch {
		// Ignore storage errors
	}
};

// Storage utilities for user data
export const getStoredUser = (): User | null => {
	try {
		const storedUser = localStorage.getItem("auth_user");
		return storedUser ? JSON.parse(storedUser) : null;
	} catch {
		return null;
	}
};

export const setStoredUser = (user: User): void => {
	try {
		localStorage.setItem("auth_user", JSON.stringify(user));
	} catch {
		// Ignore storage errors
	}
};

export const clearStoredUser = (): void => {
	try {
		localStorage.removeItem("auth_user");
	} catch {
		// Ignore storage errors
	}
};
