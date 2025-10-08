import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { CartState, CartContextType, CartItem } from "@/types/cart.types";

// Initial cart state
const initialCartState: CartState = {
	items: [],
	totalItems: 0,
	totalPrice: 0,
};

// Cart actions
type CartAction =
	| {
			type: "ADD_TO_CART";
			payload: { item: Omit<CartItem, "quantity">; quantity: number };
	  }
	| { type: "REMOVE_FROM_CART"; payload: { id: number } }
	| { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
	| { type: "CLEAR_CART" };

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case "ADD_TO_CART": {
			const { item, quantity } = action.payload;
			const existingItemIndex = state.items.findIndex(
				cartItem => cartItem.id === item.id
			);

			let newItems: CartItem[];

			if (existingItemIndex >= 0) {
				// Item already exists, update quantity
				newItems = state.items.map((cartItem, index) =>
					index === existingItemIndex
						? { ...cartItem, quantity: cartItem.quantity + quantity }
						: cartItem
				);
			} else {
				// New item, add to cart
				newItems = [...state.items, { ...item, quantity }];
			}

			const totalItems = newItems.reduce(
				(sum, cartItem) => sum + cartItem.quantity,
				0
			);
			const totalPrice = newItems.reduce(
				(sum, cartItem) => sum + cartItem.price * cartItem.quantity,
				0
			);

			return {
				items: newItems,
				totalItems,
				totalPrice,
			};
		}

		case "REMOVE_FROM_CART": {
			const newItems = state.items.filter(
				item => item.id !== action.payload.id
			);
			const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
			const totalPrice = newItems.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			);

			return {
				items: newItems,
				totalItems,
				totalPrice,
			};
		}

		case "UPDATE_QUANTITY": {
			const { id, quantity } = action.payload;

			if (quantity <= 0) {
				// Remove item if quantity is 0 or less
				return cartReducer(state, {
					type: "REMOVE_FROM_CART",
					payload: { id },
				});
			}

			const newItems = state.items.map(item =>
				item.id === id ? { ...item, quantity } : item
			);

			const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
			const totalPrice = newItems.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			);

			return {
				items: newItems,
				totalItems,
				totalPrice,
			};
		}

		case "CLEAR_CART":
			return initialCartState;

		default:
			return state;
	}
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export function CartProvider({ children }: { children: ReactNode }) {
	const [cart, dispatch] = useReducer(cartReducer, initialCartState);

	const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
		dispatch({ type: "ADD_TO_CART", payload: { item, quantity } });
	};

	const removeFromCart = (id: number) => {
		dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
	};

	const updateQuantity = (id: number, quantity: number) => {
		dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
	};

	const clearCart = () => {
		dispatch({ type: "CLEAR_CART" });
	};

	const contextValue: CartContextType = {
		cart,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
	};

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	);
}

// Custom hook to use cart context
export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
