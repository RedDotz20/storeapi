import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/productsApi";
import { ProductCard } from "./ProductCard";

export default function Products() {
	const { isLoading, error, data } = useQuery({
		queryKey: ["products"],
		queryFn: () => getProducts(),
	});

	if (isLoading) {
		return <h1>Loading</h1>;
	}

	if (error) {
		return <h1>Something Went Wrong</h1>;
	}

	return (
		<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<h1>List of Products</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{data?.map(product => {
					return (
						<div key={product.id}>
							<ProductCard
								id={product.id}
								title={product.title}
								price={product.price}
								description={product.description}
								category={product.category}
								image={product.image}
								rating={product.rating}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
