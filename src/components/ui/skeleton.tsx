import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "./card";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn("bg-accent animate-pulse rounded-md", className)}
			{...props}
		/>
	);
}

function ProductCardSkeleton() {
	return (
		<Card className="group overflow-hidden">
			<CardContent className="p-0">
				<Skeleton className="aspect-square w-full" />
			</CardContent>
			<CardHeader className="space-y-3">
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-3 w-1/2" />
				<div className="flex items-center justify-between pt-2">
					<Skeleton className="h-6 w-20" />
					<Skeleton className="h-9 w-28" />
				</div>
			</CardHeader>
		</Card>
	);
}

function ProductsGridSkeleton({ count = 8 }: { count?: number }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{Array.from({ length: count }).map((_, index) => (
				<ProductCardSkeleton key={index} />
			))}
		</div>
	);
}

function ProductDetailSkeleton() {
	return (
		<div className="min-h-screen w-full container mx-auto py-4">
			<Card className="flex flex-row-reverse justify-center">
				<CardHeader className="flex-2 flex flex-col justify-evenly space-y-4">
					<div className="flex flex-col justify-between space-y-4">
						<Skeleton className="h-8 w-3/4" />
						<Skeleton className="h-6 w-24" />
						<Skeleton className="h-20 w-full" />
					</div>

					{/* Quantity Selector Skeleton */}
					<div className="flex items-center gap-3">
						<Skeleton className="h-5 w-20" />
						<Skeleton className="h-10 w-32" />
					</div>

					{/* Action Buttons Skeleton */}
					<div className="flex gap-2">
						<Skeleton className="h-10 w-40" />
						<Skeleton className="h-10 w-32" />
					</div>
				</CardHeader>

				<CardContent className="flex-1">
					<Skeleton className="aspect-square w-full" />
				</CardContent>
			</Card>
		</div>
	);
}

export {
	Skeleton,
	ProductCardSkeleton,
	ProductsGridSkeleton,
	ProductDetailSkeleton,
};
