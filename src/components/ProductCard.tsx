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
		<Card className="group overflow-hidden transition-all hover:shadow-lg">
			<Link
				to={`/dashboard/products/$productId`}
				params={{ productId: id.toString() }}
			>
				<div className="relative aspect-square overflow-hidden bg-secondary">
					<img
						src={image || "/placeholder.svg"}
						alt={title}
						// fill
						className="object-contain p-6 transition-transform group-hover:scale-105"
					/>
					<Badge className="absolute top-3 left-3 bg-card text-card-foreground border">
						{category}
					</Badge>
				</div>
				<CardContent className="p-4 space-y-3">
					<div className="flex items-start justify-between gap-2">
						<h3 className="font-semibold text-lg leading-tight line-clamp-2 text-balance">
							{title}
						</h3>
						<p className="font-bold text-xl whitespace-nowrap">
							${price.toFixed(2)}
						</p>
					</div>
					<p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
						{description}
					</p>
					<div className="flex items-center gap-2">
						<div className="flex items-center gap-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									className={`h-4 w-4 ${
										i < Math.floor(rating.rate)
											? "fill-yellow-400 text-yellow-400"
											: "fill-gray-200 text-gray-200"
									}`}
								/>
							))}
						</div>
						<span className="text-sm text-muted-foreground">
							{rating.rate.toFixed(1)} ({rating.count})
						</span>
					</div>
				</CardContent>
			</Link>
			<CardFooter className="p-4 pt-0">
				<Button className="w-full" size="lg" onClick={handleAddToCart}>
					<ShoppingCart className="mr-2 h-4 w-4" />
					Add to Cart
				</Button>
			</CardFooter>
		</Card>
	);
}
