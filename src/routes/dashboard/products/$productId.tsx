import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import type { ProductType } from "@/types/products.types";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ProductDetailSkeleton } from "@/components/ui/skeleton";
import { NotFoundProduct } from "@/components/ui/not-found";
import { ProductDetailErrorState } from "@/components/ui/error-state";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useCartWithToast } from "@/hooks/useCartWithToast";

function ProductErrorComponent({ error }: { error: Error }) {
	const router = useRouter();

	const handleRetry = () => {
		router.invalidate();
	};

	// Check if it's a 404 error
	if (error.message?.includes("404") || error.message?.includes("not found")) {
		return (
			<div className="min-h-screen w-full container mx-auto py-4">
				<NotFoundProduct />
			</div>
		);
	}

	// For other errors, use custom error component with retry
	return (
		<div className="min-h-screen w-full container mx-auto py-4">
			<ProductDetailErrorState onRetry={handleRetry} />
		</div>
	);
}

export const Route = createFileRoute("/dashboard/products/$productId")({
	loader: async ({ params }) => {
		const { getProductById } = await import("@/lib/productsApi");
		const productId = params.productId;

		return getProductById(productId);
	},

	pendingComponent: () => <ProductDetailSkeleton />,

	errorComponent: ProductErrorComponent,

	component: RouteComponent,
});

function RouteComponent() {
	// const { productId } = Route.useParams();
	const product: ProductType = Route.useLoaderData();
	const [quantity, setQuantity] = useState(1);
	const { addToCart } = useCartWithToast();

	const incrementQuantity = () => {
		setQuantity(prev => prev + 1);
	};

	const decrementQuantity = () => {
		setQuantity(prev => (prev > 1 ? prev - 1 : 1));
	};

	const handleAddToCart = () => {
		addToCart(
			{
				id: product.id,
				title: product.title,
				price: product.price,
				image: product.image || "/placeholder.svg",
			},
			quantity
		);
	};

	return (
		<div className="min-h-screen w-full container mx-auto py-4">
			<Card className="flex flex-row-reverse justify-center ">
				<CardHeader className="flex-2 flex flex-col justify-evenly">
					<div className="flex flex-col justify-between">
						<CardTitle className="mb-1">{product.title}</CardTitle>
						<div className="space-y-2 space-x-1 flex gap-2">
							<div className="flex items-center gap-2">
								<div className="flex items-center gap-1"></div>
							</div>
						</div>

						<span className="text-2xl font-bold text-destructive mb-2">
							${product.price.toFixed(2)}
						</span>
						<CardDescription className="text-xs">
							{product.description}
						</CardDescription>
					</div>

					{/* Quantity Selector */}
					<div className="flex items-center gap-3 mt-4">
						<span className="text-sm font-medium">Quantity:</span>
						<div className="flex items-center border border-border rounded-md">
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 p-0 cursor-pointer"
								onClick={decrementQuantity}
								disabled={quantity <= 1}
							>
								<Minus className="h-4 w-4" />
							</Button>
							<span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
								{quantity}
							</span>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 p-0 cursor-pointer"
								onClick={incrementQuantity}
							>
								<Plus className="h-4 w-4" />
							</Button>
						</div>
					</div>

					<CardAction className="flex gap-2 mt-4 ">
						<Button
							className="cursor-pointer"
							variant="outline"
							onClick={handleAddToCart}
						>
							<ShoppingCart />
							Add To Cart
						</Button>
						<Button className="cursor-pointer w-32" variant="destructive">
							Buy Now
						</Button>
					</CardAction>
				</CardHeader>

				<CardContent className="flex-1">
					<img
						src={product.image || "/placeholder.svg"}
						alt={product.title}
						className="object-contain p-6 transition-transform group-hover:scale-105 w-2xs"
					/>
				</CardContent>
			</Card>
		</div>
	);
}
