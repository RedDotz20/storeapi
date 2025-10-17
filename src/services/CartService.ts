/**
 * Cart Service Implementation
 * Follows Single Responsibility Principle (SRP) - handles only cart logic
 * Follows Open/Closed Principle (OCP) - can be extended with new cart operations
 *
 * This service encapsulates all cart business logic and calculations,
 * making it easily testable and reusable.
 */

import type { CartState, CartItem } from "@/types/cart.types";
import type { ICartService } from "./interfaces/ICartService";

export class CartService implements ICartService {
	/**
	 * Create initial empty cart state
	 */
	private createEmptyCart(): CartState {
		return {
			items: [],
			totalItems: 0,
			totalPrice: 0,
		};
	}

	/**
	 * Add item to cart
	 */
	addItem(
		state: CartState,
		item: Omit<CartItem, "quantity">,
		quantity: number
	): CartState {
		const existingItemIndex = state.items.findIndex(
			cartItem => cartItem.id === item.id
		);

		let newItems: CartItem[];

		if (existingItemIndex >= 0) {
			// Item exists, update quantity
			newItems = state.items.map((cartItem, index) =>
				index === existingItemIndex
					? { ...cartItem, quantity: cartItem.quantity + quantity }
					: cartItem
			);
		} else {
			// New item, add to cart
			newItems = [...state.items, { ...item, quantity }];
		}

		return {
			items: newItems,
			totalItems: this.calculateTotalItems(newItems),
			totalPrice: this.calculateTotalPrice(newItems),
		};
	}

	/**
	 * Remove item from cart
	 */
	removeItem(state: CartState, id: number): CartState {
		const newItems = state.items.filter(item => item.id !== id);

		return {
			items: newItems,
			totalItems: this.calculateTotalItems(newItems),
			totalPrice: this.calculateTotalPrice(newItems),
		};
	}

	/**
	 * Update item quantity
	 */
	updateQuantity(state: CartState, id: number, quantity: number): CartState {
		// If quantity is 0 or less, remove the item
		if (quantity <= 0) {
			return this.removeItem(state, id);
		}

		const newItems = state.items.map(item =>
			item.id === id ? { ...item, quantity } : item
		);

		return {
			items: newItems,
			totalItems: this.calculateTotalItems(newItems),
			totalPrice: this.calculateTotalPrice(newItems),
		};
	}

	/**
	 * Clear cart
	 */
	clearCart(): CartState {
		return this.createEmptyCart();
	}

	/**
	 * Calculate total items in cart
	 */
	calculateTotalItems(items: CartItem[]): number {
		return items.reduce((sum, item) => sum + item.quantity, 0);
	}

	/**
	 * Calculate total price of cart
	 */
	calculateTotalPrice(items: CartItem[]): number {
		return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
	}

	/**
	 * Get item by ID from cart
	 */
	getItemById(items: CartItem[], id: number): CartItem | undefined {
		return items.find(item => item.id === id);
	}

	/**
	 * Check if item exists in cart
	 */
	hasItem(items: CartItem[], id: number): boolean {
		return items.some(item => item.id === id);
	}

	/**
	 * Get item quantity from cart
	 */
	getItemQuantity(items: CartItem[], id: number): number {
		const item = this.getItemById(items, id);
		return item ? item.quantity : 0;
	}
}

// Export singleton instance
export const cartService = new CartService();
