import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import type { ProductType } from "@/types/products.types";
import { Link } from "@tanstack/react-router";
import { useCartWithToast } from "@/hooks/useCartWithToast";

type ProductProps = Pick<
	ProductType,
	"id" | "title" | "price" | "description" | "category" | "image" | "rating"
>;

export function ProductCard({
	id,
	title,
	price,
	description,
	category,
	image,
	rating,
}: ProductProps) {
	const { addToCart } = useCartWithToast();

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent navigation when clicking add to cart
		e.stopPropagation();

		addToCart({
			id,
			title,
			price,
			image: image || "/placeholder.svg",
		});
	};
	return (
		<Card className="group overflow-hidden transition-all hover:shadow-sm hover:shadow-primary flex flex-col h-full">
			<Link
				to={`/dashboard/products/$productId`}
				params={{ productId: id.toString() }}
				className="flex flex-col flex-1 relative"
			>
				<div className="relative aspect-square overflow-hidden bg-secondary">
					<img
						src={image || "/placeholder.svg"}
						alt={title}
						className="w-full h-full object-contain p-4 sm:p-6 transition-transform group-hover:scale-105 bg-card"
					/>
				</div>
				<Badge
					variant="secondary"
					className="absolute top-2 left-2 sm:left-4 bg-primary text-card border text-xs sm:text-sm"
				>
					{category}
				</Badge>
				<CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3 flex-1 flex flex-col">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2">
						<h3 className="font-semibold text-base sm:text-lg leading-tight line-clamp-2 text-balance">
							{title}
						</h3>
						<p className="font-bold text-lg sm:text-xl whitespace-nowrap">
							${price.toFixed(2)}
						</p>
					</div>
					<p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed min-h-[2.5rem]">
						{description}
					</p>
					<div className="flex items-center gap-1 sm:gap-2 mt-auto">
						<div className="flex items-center gap-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									className={`h-3 w-3 sm:h-4 sm:w-4 ${
										i < Math.floor(rating.rate)
											? "fill-yellow-400 text-yellow-400"
											: "fill-muted text-muted"
									}`}
								/>
							))}
						</div>
						<span className="text-xs sm:text-sm text-muted-foreground">
							{rating.rate.toFixed(1)} ({rating.count})
						</span>
					</div>
				</CardContent>
			</Link>
			<CardFooter className="p-3 sm:p-4 pt-0">
				<Button className="w-full" size="lg" onClick={handleAddToCart}>
					<ShoppingCart className="mr-2 h-4 w-4" />
					<span className="text-xs sm:text-base">Add to Cart</span>
				</Button>
			</CardFooter>
		</Card>
	);
}
