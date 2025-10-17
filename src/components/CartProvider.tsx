import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { CartState, CartContextType, CartItem } from "@/types/cart.types";
import { cartService } from "@/services/CartService";

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

// Cart reducer - delegates business logic to CartService
function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case "ADD_TO_CART": {
			const { item, quantity } = action.payload;
			return cartService.addItem(state, item, quantity);
		}

		case "REMOVE_FROM_CART": {
			return cartService.removeItem(state, action.payload.id);
		}

		case "UPDATE_QUANTITY": {
			const { id, quantity } = action.payload;
			return cartService.updateQuantity(state, id, quantity);
		}

		case "CLEAR_CART":
			return cartService.clearCart();

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
