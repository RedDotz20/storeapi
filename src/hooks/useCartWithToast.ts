import { useCart } from "@/components/CartProvider";
import { useToast } from "@/components/ui/toast";
import type { CartItem } from "@/types/cart.types";

export function useCartWithToast() {
	const cart = useCart();
	const { addToast } = useToast();

	const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
		cart.addToCart(item, quantity);
		addToast(`${item.title} added to cart!`, "success");
	};

	const removeFromCart = (id: number) => {
		const item = cart.cart.items.find(item => item.id === id);
		cart.removeFromCart(id);
		if (item) {
			addToast(`${item.title} removed from cart`, "info");
		}
	};

	const updateQuantity = (id: number, quantity: number) => {
		cart.updateQuantity(id, quantity);
	};

	const clearCart = () => {
		cart.clearCart();
		addToast("Cart Cleared", "info");
	};

	return {
		cart: cart.cart,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
	};
}
