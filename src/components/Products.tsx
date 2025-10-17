import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/productsApi";
import { ProductCard } from "./ProductCard";
import ProductFilters, { type FilterState } from "./ProductFilters";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useNavigate, useSearch } from "@tanstack/react-router";

type SortOption =
	| "name-asc"
	| "name-desc"
	| "price-asc"
	| "price-desc"
	| "rating-asc"
	| "rating-desc";

export default function Products() {
	const navigate = useNavigate({ from: "/dashboard" });
	const searchParams = useSearch({ from: "/dashboard/" });

	const { isLoading, error, data } = useQuery({
		queryKey: ["products"],
		queryFn: () => getProducts(),
	});

	const [showSuggestions, setShowSuggestions] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);
	const suggestionsRef = useRef<HTMLDivElement>(null);

	// Initialize state from URL search params
	const [searchQuery, setSearchQuery] = useState(searchParams.search || "");
	const [sortBy, setSortBy] = useState<SortOption>(
		searchParams.sortBy || "rating-desc"
	);
	const debounceQuery = useDebounce(searchQuery, 300);

	// Calculate max price from products
	const maxPrice = useMemo(() => {
		if (!data) return 1000;
		return Math.ceil(Math.max(...data.map(p => p.price)) / 10) * 10;
	}, [data]);

	// Initialize filter state from URL search params
	const [filters, setFilters] = useState<FilterState>(() => {
		// Handle category from landing page
		const initialCategories = searchParams.category
			? [searchParams.category]
			: searchParams.categories || [];

		return {
			categories: initialCategories,
			priceRange: [
				searchParams.minPrice || 0,
				searchParams.maxPrice || 1000,
			] as [number, number],
			minRating: searchParams.minRating || 0,
		};
	});

	// Update price range max when maxPrice is calculated (only if no URL params exist)
	useEffect(() => {
		// Only auto-update if user hasn't set custom price range in URL
		const hasCustomPriceInUrl =
			searchParams.minPrice !== undefined ||
			searchParams.maxPrice !== undefined;

		if (
			maxPrice > 0 &&
			filters.priceRange[1] === 1000 &&
			!hasCustomPriceInUrl
		) {
			setFilters(prev => ({
				...prev,
				priceRange: [0, maxPrice],
			}));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [maxPrice]);

	// Sync state to URL when filters change
	useEffect(() => {
		navigate({
			search: prev => ({
				...prev,
				search: searchQuery || undefined,
				sortBy: sortBy,
				categories:
					filters.categories.length > 0 ? filters.categories : undefined,
				category: undefined, // Clear single category when using filters
				minPrice: filters.priceRange[0] > 0 ? filters.priceRange[0] : undefined,
				maxPrice:
					filters.priceRange[1] < maxPrice ? filters.priceRange[1] : undefined,
				minRating: filters.minRating > 0 ? filters.minRating : undefined,
			}),
			replace: true, // Replace history to avoid cluttering browser history
		});
	}, [searchQuery, sortBy, filters, maxPrice, navigate]);

	// Get autocomplete suggestions based on search query
	const suggestions =
		data
			?.filter(product => {
				if (!searchQuery || searchQuery.length < 2) return false;
				const searchLower = searchQuery.toLowerCase();
				return product.title.toLowerCase().includes(searchLower);
			})
			.slice(0, 5) // Limit to 5 suggestions
			.map(product => product.title) || [];

	const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setShowSuggestions(true);
		setSelectedIndex(-1);
	};

	const handleSuggestionClick = (suggestion: string) => {
		setSearchQuery(suggestion);
		setShowSuggestions(false);
		setSelectedIndex(-1);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!showSuggestions || suggestions.length === 0) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setSelectedIndex(prev =>
					prev < suggestions.length - 1 ? prev + 1 : prev
				);
				break;
			case "ArrowUp":
				e.preventDefault();
				setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
				break;
			case "Enter":
				e.preventDefault();
				if (selectedIndex >= 0) {
					handleSuggestionClick(suggestions[selectedIndex]);
				}
				break;
			case "Escape":
				setShowSuggestions(false);
				setSelectedIndex(-1);
				break;
		}
	};

	// Close suggestions when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				suggestionsRef.current &&
				!suggestionsRef.current.contains(event.target as Node) &&
				inputRef.current &&
				!inputRef.current.contains(event.target as Node)
			) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Hide suggestions when there are no results
	useEffect(() => {
		if (suggestions.length === 0 && searchQuery.length >= 2) {
			setShowSuggestions(false);
		}
	}, [suggestions.length, searchQuery]);

	// Filter products based on search query and filters
	const filteredProducts = useMemo(() => {
		let results = data?.filter(product => {
			// Search filter
			if (debounceQuery) {
				const searchLower = debounceQuery.toLowerCase();
				const matchesSearch =
					product.title.toLowerCase().includes(searchLower) ||
					product.description.toLowerCase().includes(searchLower) ||
					product.category.toLowerCase().includes(searchLower);
				if (!matchesSearch) return false;
			}

			// Category filter
			if (
				filters.categories.length > 0 &&
				!filters.categories.includes(product.category)
			) {
				return false;
			}

			// Price filter
			if (
				product.price < filters.priceRange[0] ||
				product.price > filters.priceRange[1]
			) {
				return false;
			}

			// Rating filter
			if (product.rating.rate < filters.minRating) {
				return false;
			}

			return true;
		});

		// Apply sorting
		if (results) {
			results = [...results].sort((a, b) => {
				switch (sortBy) {
					case "name-asc":
						return a.title.localeCompare(b.title);
					case "name-desc":
						return b.title.localeCompare(a.title);
					case "price-asc":
						return a.price - b.price;
					case "price-desc":
						return b.price - a.price;
					case "rating-asc":
						return a.rating.rate - b.rating.rate;
					case "rating-desc":
						return b.rating.rate - a.rating.rate;
					default:
						return 0;
				}
			});
		}

		return results;
	}, [data, debounceQuery, filters, sortBy]);

	if (isLoading) {
		return <h1>Loading</h1>;
	}

	if (error) {
		return <h1>Something Went Wrong</h1>;
	}

	return (
		<div className="max-w-[1600px] mx-auto py-4 px-2 sm:px-4 md:px-6 lg:px-8">
			<div className="flex flex-col lg:flex-row gap-6">
				{/* Filters Sidebar */}
				<aside className="w-full lg:w-auto flex-shrink-0">
					<ProductFilters
						filters={filters}
						onFilterChange={setFilters}
						maxPrice={maxPrice}
					/>
				</aside>

				{/* Main Content */}
				<div className="flex-1 min-w-0">
					<div className="flex flex-col sm:flex-row gap-3 mb-4">
						{/* Search Bar */}
						<div className="relative flex-1">
							<InputGroup>
								<InputGroupInput
									ref={inputRef}
									placeholder="Search products..."
									value={searchQuery}
									onChange={handleSearchQuery}
									onKeyDown={handleKeyDown}
									onFocus={() =>
										searchQuery.length >= 2 && setShowSuggestions(true)
									}
									className="w-full text-base md:text-lg"
								/>
								<InputGroupAddon>
									<Search />
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									{filteredProducts?.length} results
								</InputGroupAddon>
							</InputGroup>

							{/* Autocomplete Suggestions Dropdown */}
							{showSuggestions && suggestions.length > 0 && (
								<div
									ref={suggestionsRef}
									className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
								>
									{suggestions.map((suggestion, index) => (
										<div
											key={index}
											className={`px-4 py-2 cursor-pointer transition-colors ${
												index === selectedIndex
													? "bg-blue-500 text-white"
													: "hover:bg-gray-100"
											}`}
											onClick={() => handleSuggestionClick(suggestion)}
											onMouseEnter={() => setSelectedIndex(index)}
										>
											{suggestion}
										</div>
									))}
								</div>
							)}
						</div>

						{/* Sort Dropdown */}
						<div className="w-full sm:w-64">
							<Select
								value={sortBy}
								onValueChange={value => setSortBy(value as SortOption)}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Sort by" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="rating-desc">
										Rating: High to Low
									</SelectItem>
									<SelectItem value="rating-asc">
										Rating: Low to High
									</SelectItem>
									<SelectItem value="price-asc">Price: Low to High</SelectItem>
									<SelectItem value="price-desc">Price: High to Low</SelectItem>
									<SelectItem value="name-asc">Name: A to Z</SelectItem>
									<SelectItem value="name-desc">Name: Z to A</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Products Grid */}
					{filteredProducts && filteredProducts.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
							{filteredProducts.map(product => {
								return (
									<ProductCard
										key={product.id}
										id={product.id}
										title={product.title}
										price={product.price}
										description={product.description}
										category={product.category}
										image={product.image}
										rating={product.rating}
									/>
								);
							})}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-12 text-center">
							<p className="text-lg text-gray-600 mb-2">No products found</p>
							<p className="text-sm text-gray-400">
								Try adjusting your filters or search query
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
