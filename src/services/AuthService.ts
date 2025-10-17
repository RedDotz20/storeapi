/**
 * Authentication Service Implementation
 * Follows Single Responsibility Principle (SRP) - handles only authentication logic
 * Follows Dependency Inversion Principle (DIP) - depends on abstractions (IStorageService, IHttpClient)
 *
 * This service encapsulates all authentication business logic, API calls, and storage management.
 */

import type {
	User,
	LoginCredentials,
	SignupCredentials,
	FakeStoreLoginResponse,
	FakeStoreUser,
} from "@/types/auth";
import type { IAuthService } from "./interfaces/IAuthService";
import type { IStorageService } from "./interfaces/IStorageService";
import type { IHttpClient } from "./interfaces/IHttpClient";
import { config } from "@/components/config";

export class AuthService implements IAuthService {
	private readonly TOKEN_KEY = "auth_token";
	private readonly USER_KEY = "auth_user";

	constructor(
		private httpClient: IHttpClient,
		private storageService: IStorageService
	) {}

	/**
	 * Authenticate user and retrieve user profile
	 */
	async login(credentials: LoginCredentials): Promise<User> {
		try {
			// Authenticate and get token
			const loginResponse = await this.httpClient.post<FakeStoreLoginResponse>(
				"/auth/login",
				{
					username: credentials.username,
					password: credentials.password,
				}
			);

			// Store token
			this.setStoredToken(loginResponse.token);

			// Fetch user profile
			// FakeStoreAPI doesn't provide user info from token, using default user ID
			const userId = 1;
			const fakeStoreUser = await this.httpClient.get<FakeStoreUser>(
				`/users/${userId}`
			);

			// Map to our User type
			const user = this.mapFakeStoreUserToUser(fakeStoreUser);

			// Store user data
			this.setStoredUser(user);

			return user;
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : "Login failed");
		}
	}

	/**
	 * Register new user (simulated for FakeStoreAPI)
	 */
	async signup(credentials: SignupCredentials): Promise<User> {
		try {
			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 1500));

			// Create mock user (FakeStoreAPI doesn't have signup endpoint)
			const user: User = {
				id: Math.floor(Math.random() * 1000) + 100,
				username: credentials.username,
				email: credentials.email,
				role: "user",
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			// Generate mock token
			const mockToken = `mock_token_${user.id}_${Date.now()}`;

			// Store authentication data
			this.setStoredToken(mockToken);
			this.setStoredUser(user);

			return user;
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : "Signup failed");
		}
	}

	/**
	 * Map FakeStoreUser to our User type
	 */
	private mapFakeStoreUserToUser(fakeStoreUser: FakeStoreUser): User {
		return {
			id: fakeStoreUser.id,
			username: fakeStoreUser.username,
			email: fakeStoreUser.email,
			role: "user",
			createdAt: new Date(),
			updatedAt: new Date(),
		};
	}

	/**
	 * Storage operations
	 */
	getStoredToken(): string | null {
		return this.storageService.getItem<string>(this.TOKEN_KEY);
	}

	setStoredToken(token: string): void {
		this.storageService.setItem(this.TOKEN_KEY, token);
	}

	clearStoredToken(): void {
		this.storageService.removeItem(this.TOKEN_KEY);
	}

	getStoredUser(): User | null {
		return this.storageService.getItem<User>(this.USER_KEY);
	}

	setStoredUser(user: User): void {
		this.storageService.setItem(this.USER_KEY, user);
	}

	clearStoredUser(): void {
		this.storageService.removeItem(this.USER_KEY);
	}

	clearAuth(): void {
		this.clearStoredToken();
		this.clearStoredUser();
	}
}

// Create singleton instance with dependencies
import { HttpClient } from "./HttpClient";
import { storageService } from "./StorageService";

const httpClient = new HttpClient(config.apiBaseUrl);
export const authService = new AuthService(httpClient, storageService);
