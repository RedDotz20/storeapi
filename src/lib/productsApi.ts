import type { ProductListsType } from "@/types/products.types";
const API_BASE_URL = "https://fakestoreapi.com";

export const getProducts = async (): Promise<ProductListsType> => {
	const response = await fetch(`${API_BASE_URL}/products`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to Fetch Products");
	}

	return response.json();
};
