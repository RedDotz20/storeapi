import { createFileRoute, Link } from "@tanstack/react-router";
import { useCartWithToast } from "@/hooks/useCartWithToast";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/dashboard/cart")({
	component: CartPage,
});

function CartPage() {
	const { cart, updateQuantity, removeFromCart, clearCart } =
		useCartWithToast();

	const incrementQuantity = (id: number, currentQuantity: number) => {
		updateQuantity(id, currentQuantity + 1);
	};

	const decrementQuantity = (id: number, currentQuantity: number) => {
		if (currentQuantity > 1) {
			updateQuantity(id, currentQuantity - 1);
		}
	};

	if (cart.items.length === 0) {
		return (
			<div className="min-h-screen w-full container mx-auto py-8">
				<div className="text-center py-16">
					<ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Your cart is empty
					</h2>
					<p className="text-gray-600 mb-6">
						Add some products to get started!
					</p>
					<Button asChild>
						<Link to="/dashboard">Continue Shopping</Link>
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen w-full container mx-auto py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Shopping Cart</h1>
				<Button variant="outline" onClick={clearCart}>
					Clear Cart
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Cart Items */}
				<div className="lg:col-span-2 space-y-4">
					{cart.items.map(item => (
						<Card key={item.id} className="p-4">
							<div className="flex items-center gap-4">
								<img
									src={item.image}
									alt={item.title}
									className="w-20 h-20 object-contain rounded-md bg-gray-50"
								/>

								<div className="flex-1 min-w-0">
									<h3 className="font-semibold text-lg line-clamp-2">
										{item.title}
									</h3>
									<p className="text-lg font-bold text-destructive">
										${item.price.toFixed(2)}
									</p>
								</div>

								{/* Quantity Controls */}
								<div className="flex items-center gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => decrementQuantity(item.id, item.quantity)}
										disabled={item.quantity <= 1}
									>
										<Minus className="h-4 w-4" />
									</Button>
									<span className="w-12 text-center font-medium">
										{item.quantity}
									</span>
									<Button
										variant="outline"
										size="sm"
										onClick={() => incrementQuantity(item.id, item.quantity)}
									>
										<Plus className="h-4 w-4" />
									</Button>
								</div>

								{/* Remove Button */}
								<Button
									variant="outline"
									size="sm"
									onClick={() => removeFromCart(item.id)}
									className="text-destructive hover:text-destructive"
								>
									<Trash2 className="h-4 w-4" />
								</Button>

								{/* Item Total */}
								<div className="text-right">
									<p className="font-bold">
										${(item.price * item.quantity).toFixed(2)}
									</p>
								</div>
							</div>
						</Card>
					))}
				</div>

				{/* Cart Summary */}
				<div className="lg:col-span-1">
					<Card className="p-6 sticky top-4">
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex justify-between">
								<span>Items ({cart.totalItems})</span>
								<span>${cart.totalPrice.toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span>Shipping</span>
								<span>Free</span>
							</div>
							<hr />
							<div className="flex justify-between font-bold text-lg">
								<span>Total</span>
								<span>${cart.totalPrice.toFixed(2)}</span>
							</div>
						</CardContent>
						<CardFooter className="flex flex-col gap-3">
							<Button className="w-full" size="lg">
								Proceed to Checkout
							</Button>
							<Button variant="outline" className="w-full" asChild>
								<Link to="/dashboard">Continue Shopping</Link>
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
