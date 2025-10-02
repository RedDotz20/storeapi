import { useMutation, useQuery } from "@tanstack/react-query";
import type {
	LoginCredentials,
	FakeStoreLoginResponse,
	FakeStoreUser,
	User,
} from "../types/auth";

// API base URL
const API_BASE_URL = "https://fakestoreapi.com";

// API functions
export const loginUser = async (
	credentials: LoginCredentials
): Promise<FakeStoreLoginResponse> => {
	const response = await fetch(`${API_BASE_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: credentials.username,
			password: credentials.password,
		}),
	});

	if (!response.ok) {
		throw new Error("Invalid credentials");
	}

	return response.json();
};

export const getUserById = async (userId: number): Promise<FakeStoreUser> => {
	const response = await fetch(`${API_BASE_URL}/users/${userId}`);

	if (!response.ok) {
		throw new Error("Failed to fetch user data");
	}

	return response.json();
};

// Helper function to convert FakeStoreUser to our User type
export const mapFakeStoreUserToUser = (fakeStoreUser: FakeStoreUser): User => {
	return {
		id: fakeStoreUser.id,
		username: fakeStoreUser.username,
		email: fakeStoreUser.email,
		role: "user", // FakeStore API doesn't have roles, so default to 'user'
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
		queryFn: () => getUserById(userId!),
		enabled: !!userId,
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
