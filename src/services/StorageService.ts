/**
 * Local Storage Service Implementation
 * Follows Single Responsibility Principle (SRP) - handles only storage operations
 * Follows Open/Closed Principle (OCP) - can be extended with new storage methods
 *
 * This service encapsulates all localStorage interactions, providing type-safe
 * storage operations with error handling.
 */

import type { IStorageService } from "./interfaces/IStorageService";

export class LocalStorageService implements IStorageService {
	/**
	 * Get an item from localStorage with type safety
	 */
	getItem<T>(key: string): T | null {
		try {
			const item = localStorage.getItem(key);
			if (item === null) return null;

			// Try to parse JSON, return raw string if parsing fails
			try {
				return JSON.parse(item) as T;
			} catch {
				return item as T;
			}
		} catch (error) {
			console.error(`Error getting item "${key}" from localStorage:`, error);
			return null;
		}
	}

	/**
	 * Set an item in localStorage with type safety
	 */
	setItem<T>(key: string, value: T): void {
		try {
			const serializedValue =
				typeof value === "string" ? value : JSON.stringify(value);
			localStorage.setItem(key, serializedValue);
		} catch (error) {
			console.error(`Error setting item "${key}" in localStorage:`, error);
		}
	}

	/**
	 * Remove an item from localStorage
	 */
	removeItem(key: string): void {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.error(`Error removing item "${key}" from localStorage:`, error);
		}
	}

	/**
	 * Clear all items from localStorage
	 */
	clear(): void {
		try {
			localStorage.clear();
		} catch (error) {
			console.error("Error clearing localStorage:", error);
		}
	}

	/**
	 * Check if a key exists in localStorage
	 */
	hasItem(key: string): boolean {
		try {
			return localStorage.getItem(key) !== null;
		} catch (error) {
			console.error(`Error checking item "${key}" in localStorage:`, error);
			return false;
		}
	}
}

/**
 * Session Storage Service Implementation
 * Alternative implementation for session-based storage
 */
export class SessionStorageService implements IStorageService {
	getItem<T>(key: string): T | null {
		try {
			const item = sessionStorage.getItem(key);
			if (item === null) return null;

			try {
				return JSON.parse(item) as T;
			} catch {
				return item as T;
			}
		} catch (error) {
			console.error(`Error getting item "${key}" from sessionStorage:`, error);
			return null;
		}
	}

	setItem<T>(key: string, value: T): void {
		try {
			const serializedValue =
				typeof value === "string" ? value : JSON.stringify(value);
			sessionStorage.setItem(key, serializedValue);
		} catch (error) {
			console.error(`Error setting item "${key}" in sessionStorage:`, error);
		}
	}

	removeItem(key: string): void {
		try {
			sessionStorage.removeItem(key);
		} catch (error) {
			console.error(`Error removing item "${key}" from sessionStorage:`, error);
		}
	}

	clear(): void {
		try {
			sessionStorage.clear();
		} catch (error) {
			console.error("Error clearing sessionStorage:", error);
		}
	}

	hasItem(key: string): boolean {
		try {
			return sessionStorage.getItem(key) !== null;
		} catch (error) {
			console.error(`Error checking item "${key}" in sessionStorage:`, error);
			return false;
		}
	}
}

/**
 * In-Memory Storage Service Implementation
 * Useful for testing or environments without localStorage
 */
export class InMemoryStorageService implements IStorageService {
	private storage = new Map<string, string>();

	getItem<T>(key: string): T | null {
		const item = this.storage.get(key);
		if (item === undefined) return null;

		try {
			return JSON.parse(item) as T;
		} catch {
			return item as T;
		}
	}

	setItem<T>(key: string, value: T): void {
		const serializedValue =
			typeof value === "string" ? value : JSON.stringify(value);
		this.storage.set(key, serializedValue);
	}

	removeItem(key: string): void {
		this.storage.delete(key);
	}

	clear(): void {
		this.storage.clear();
	}

	hasItem(key: string): boolean {
		return this.storage.has(key);
	}
}

// Export singleton instance for default usage
export const storageService = new LocalStorageService();
