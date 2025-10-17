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
					<ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
					<h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
					<p className="text-muted-foreground mb-6">
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
		<div className="min-h-screen w-full container mx-auto py-4 px-2 sm:px-4 md:px-8">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
				<h1 className="text-2xl sm:text-3xl font-bold">Shopping Cart</h1>
				<Button variant="outline" onClick={clearCart}>
					Clear Cart
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
				{/* Cart Items */}
				<div className="md:col-span-2 space-y-3 md:space-y-4">
					{cart.items.map(item => (
						<Card key={item.id} className="p-2 sm:p-4">
							<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
								<img
									src={item.image}
									alt={item.title}
									className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-md bg-card"
								/>

								<div className="flex-1 min-w-0">
									<h3 className="font-semibold text-base sm:text-lg line-clamp-2">
										{item.title}
									</h3>
									<p className="text-base sm:text-lg font-bold text-destructive">
										${item.price.toFixed(2)}
									</p>
								</div>

								{/* Quantity Controls */}
								<div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-0">
									<Button
										variant="outline"
										size="sm"
										onClick={() => decrementQuantity(item.id, item.quantity)}
										disabled={item.quantity <= 1}
									>
										<Minus className="h-4 w-4" />
									</Button>
									<span className="w-10 sm:w-12 text-center font-medium">
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
								<div className="text-right mt-2 sm:mt-0">
									<p className="font-bold text-xs sm:text-base">
										${(item.price * item.quantity).toFixed(2)}
									</p>
								</div>
							</div>
						</Card>
					))}
				</div>

				{/* Cart Summary */}
				<div className="md:col-span-1">
					<Card className="p-4 sm:p-6 sticky top-4">
						<CardHeader>
							<CardTitle className="text-base sm:text-lg">
								Order Summary
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 sm:space-y-4">
							<div className="flex justify-between text-sm sm:text-base">
								<span>Items ({cart.totalItems})</span>
								<span>${cart.totalPrice.toFixed(2)}</span>
							</div>
							<div className="flex justify-between text-sm sm:text-base">
								<span>Shipping</span>
								<span>Free</span>
							</div>
							<hr />
							<div className="flex justify-between font-bold text-base sm:text-lg">
								<span>Total</span>
								<span>${cart.totalPrice.toFixed(2)}</span>
							</div>
						</CardContent>
						<CardFooter className="flex flex-col gap-2 sm:gap-3">
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
