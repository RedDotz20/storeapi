import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/productsApi";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Star } from "lucide-react";

export interface FilterState {
	categories: string[];
	priceRange: [number, number];
	minRating: number;
}

interface ProductFiltersProps {
	filters: FilterState;
	onFilterChange: (filters: FilterState) => void;
	maxPrice: number;
}

export default function ProductFilters({
	filters,
	onFilterChange,
	maxPrice,
}: ProductFiltersProps) {
	const { data: categories, isLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
	});

	const handleCategoryToggle = (category: string) => {
		const newCategories = filters.categories.includes(category)
			? filters.categories.filter(c => c !== category)
			: [...filters.categories, category];
		onFilterChange({ ...filters, categories: newCategories });
	};

	const handlePriceChange = (value: number[]) => {
		if (value.length === 2) {
			const newFilters = {
				...filters,
				priceRange: [value[0], value[1]] as [number, number],
			};
			onFilterChange(newFilters);
		}
	};

	const handleRatingClick = (rating: number) => {
		onFilterChange({
			...filters,
			minRating: filters.minRating === rating ? 0 : rating,
		});
	};

	const handleResetFilters = () => {
		onFilterChange({
			categories: [],
			priceRange: [0, maxPrice],
			minRating: 0,
		});
	};

	const hasActiveFilters =
		filters.categories.length > 0 ||
		filters.priceRange[0] > 0 ||
		filters.priceRange[1] < maxPrice ||
		filters.minRating > 0;

	if (isLoading) {
		return (
			<div className="w-full lg:w-64 bg-card rounded-lg shadow-sm p-6">
				<div className="animate-pulse space-y-4">
					<div className="h-4 bg-muted rounded w-3/4"></div>
					<div className="h-4 bg-muted rounded w-1/2"></div>
					<div className="h-4 bg-muted rounded w-5/6"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full lg:w-64 bg-card rounded-lg shadow-sm p-6 space-y-6 h-fit sticky top-4">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold">Filters</h2>
				{hasActiveFilters && (
					<Button
						variant="ghost"
						size="sm"
						onClick={handleResetFilters}
						className="text-sm"
					>
						<X className="w-4 h-4 mr-1" />
						Clear
					</Button>
				)}
			</div>

			{/* Categories Filter */}
			<div className="space-y-3">
				<Label className="text-base font-semibold">Categories</Label>
				<div className="space-y-2">
					{categories?.map(category => (
						<label
							key={category}
							className="flex items-center space-x-2 cursor-pointer group"
						>
							<input
								type="checkbox"
								checked={filters.categories.includes(category)}
								onChange={() => handleCategoryToggle(category)}
								className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
							/>
							<span className="text-sm capitalize group-hover:text-blue-600 transition-colors">
								{category}
							</span>
						</label>
					))}
				</div>
			</div>

			{/* Price Range Filter */}
			<div className="space-y-3">
				<Label className="text-base font-semibold">Price Range</Label>
				<div className="space-y-4">
					<Slider
						min={0}
						max={maxPrice}
						step={1}
						defaultValue={[0, maxPrice]}
						value={[filters.priceRange[0], filters.priceRange[1]]}
						onValueChange={handlePriceChange}
						className="w-full"
					/>
					<div className="flex items-center justify-between text-sm text-muted-foreground">
						<span>${filters.priceRange[0].toFixed(2)}</span>
						<span className="text-xs">to</span>
						<span>${filters.priceRange[1].toFixed(2)}</span>
					</div>
				</div>
			</div>

			{/* Rating Filter */}
			<div className="space-y-3">
				<Label className="text-base font-semibold">Minimum Rating</Label>
				<div className="space-y-2">
					{[5, 4, 3, 2, 1].map(rating => (
						<button
							key={rating}
							onClick={() => handleRatingClick(rating)}
							className={`flex items-center space-x-2 w-full p-2 rounded-md transition-colors ${
								filters.minRating === rating
									? "bg-accent border border-primary"
									: "hover:bg-accent/50"
							}`}
						>
							<div className="flex items-center">
								{[...Array(5)].map((_, index) => (
									<Star
										key={index}
										className={`w-4 h-4 ${
											index < rating
												? "fill-yellow-400 text-yellow-400"
												: "text-muted"
										}`}
									/>
								))}
							</div>
							<span className="text-sm text-muted-foreground">& Up</span>
						</button>
					))}
				</div>
			</div>

			{/* Active Filters Summary */}
			{hasActiveFilters && (
				<div className="pt-4 border-t border-border">
					<div className="text-sm text-muted-foreground space-y-2">
						{filters.categories.length > 0 && (
							<div>
								<span className="font-medium">Categories: </span>
								<span className="text-muted-foreground/70">
									{filters.categories.length} selected
								</span>
							</div>
						)}
						{(filters.priceRange[0] > 0 ||
							filters.priceRange[1] < maxPrice) && (
							<div>
								<span className="font-medium">Price: </span>
								<span className="text-muted-foreground/70">
									${filters.priceRange[0]} - ${filters.priceRange[1]}
								</span>
							</div>
						)}
						{filters.minRating > 0 && (
							<div>
								<span className="font-medium">Rating: </span>
								<span className="text-muted-foreground/70">
									{filters.minRating}+ stars
								</span>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
