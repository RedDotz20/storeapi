/**
 * Authentication Service Interface
 * Follows Interface Segregation Principle (ISP) and Dependency Inversion Principle (DIP)
 */

import type { User, LoginCredentials, SignupCredentials } from "@/types/auth";

export interface IAuthService {
	/**
	 * Authenticate user with credentials
	 */
	login(credentials: LoginCredentials): Promise<User>;

	/**
	 * Register a new user
	 */
	signup(credentials: SignupCredentials): Promise<User>;

	/**
	 * Get stored authentication token
	 */
	getStoredToken(): string | null;

	/**
	 * Get stored user data
	 */
	getStoredUser(): User | null;

	/**
	 * Store authentication token
	 */
	setStoredToken(token: string): void;

	/**
	 * Store user data
	 */
	setStoredUser(user: User): void;

	/**
	 * Clear stored authentication token
	 */
	clearStoredToken(): void;

	/**
	 * Clear stored user data
	 */
	clearStoredUser(): void;

	/**
	 * Clear all stored authentication data
	 */
	clearAuth(): void;
}
