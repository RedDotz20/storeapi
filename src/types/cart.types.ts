export interface CartItem {
	id: number;
	title: string;
	price: number;
	image: string;
	quantity: number;
}

export interface CartState {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
}

export interface CartContextType {
	cart: CartState;
	addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
	removeFromCart: (id: number) => void;
	updateQuantity: (id: number, quantity: number) => void;
	clearCart: () => void;
}
