/**
 * Storage Service Interface
 * Follows Interface Segregation Principle (ISP) and Dependency Inversion Principle (DIP)
 *
 * This interface defines a contract for storage operations, allowing different implementations
 * (localStorage, sessionStorage, memory storage, etc.) without changing dependent code.
 */

export interface IStorageService {
	/**
	 * Get an item from storage
	 * @param key - The key to retrieve
	 * @returns The stored value or null if not found
	 */
	getItem<T>(key: string): T | null;

	/**
	 * Set an item in storage
	 * @param key - The key to store the value under
	 * @param value - The value to store
	 */
	setItem<T>(key: string, value: T): void;

	/**
	 * Remove an item from storage
	 * @param key - The key to remove
	 */
	removeItem(key: string): void;

	/**
	 * Clear all items from storage
	 */
	clear(): void;

	/**
	 * Check if a key exists in storage
	 * @param key - The key to check
	 */
	hasItem(key: string): boolean;
}
