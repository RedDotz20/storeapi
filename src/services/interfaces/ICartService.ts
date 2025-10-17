/**
 * Cart Service Interface
 * Follows Interface Segregation Principle (ISP)
 */

import type { CartState, CartItem } from "@/types/cart.types";

export interface ICartService {
	/**
	 * Add item to cart
	 */
	addItem(
		state: CartState,
		item: Omit<CartItem, "quantity">,
		quantity: number
	): CartState;

	/**
	 * Remove item from cart
	 */
	removeItem(state: CartState, id: number): CartState;

	/**
	 * Update item quantity
	 */
	updateQuantity(state: CartState, id: number, quantity: number): CartState;

	/**
	 * Clear cart
	 */
	clearCart(): CartState;

	/**
	 * Calculate total items in cart
	 */
	calculateTotalItems(items: CartItem[]): number;

	/**
	 * Calculate total price of cart
	 */
	calculateTotalPrice(items: CartItem[]): number;

	/**
	 * Get item by ID from cart
	 */
	getItemById(items: CartItem[], id: number): CartItem | undefined;
}
