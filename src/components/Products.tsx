import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/productsApi";
import { ProductCard } from "./ProductCard";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export default function Products() {
	const { isLoading, error, data } = useQuery({
		queryKey: ["products"],
		queryFn: () => getProducts(),
	});

	const [searchQuery, setSearchQuery] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const debounceQuery = useDebounce(searchQuery, 300);
	const inputRef = useRef<HTMLInputElement>(null);
	const suggestionsRef = useRef<HTMLDivElement>(null);

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

	// Filter products based on search query
	const filteredProducts = data?.filter(product => {
		if (!debounceQuery) return true;

		const searchLower = debounceQuery.toLowerCase();
		return (
			product.title.toLowerCase().includes(searchLower) ||
			product.description.toLowerCase().includes(searchLower) ||
			product.category.toLowerCase().includes(searchLower)
		);
	});

	if (isLoading) {
		return <h1>Loading</h1>;
	}

	if (error) {
		return <h1>Something Went Wrong</h1>;
	}

	return (
		<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<div className="relative mb-4">
				<InputGroup>
					<InputGroupInput
						ref={inputRef}
						placeholder="Search products..."
						value={searchQuery}
						onChange={handleSearchQuery}
						onKeyDown={handleKeyDown}
						onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
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
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{filteredProducts?.map(product => {
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
		</div>
	);
}
