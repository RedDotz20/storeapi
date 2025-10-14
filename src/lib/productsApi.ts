import type { ProductListsType, ProductType } from "@/types/products.types";
import { config } from "@/components/config";

const API_BASE_URL = config.apiBaseUrl;

// Get all products
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

// Get single product by ID
export const getProductById = async (
	id: string | number
): Promise<ProductType> => {
	const response = await fetch(`${API_BASE_URL}/products/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to Fetch Product ${id}`);
	}

	return response.json();
};

// Get products by category
export const getProductsByCategory = async (
	categoryId: number
): Promise<ProductListsType> => {
	const response = await fetch(
		`${API_BASE_URL}/products/?categoryId=${categoryId}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	if (!response.ok) {
		throw new Error("Failed to Fetch Products by Category");
	}

	return response.json();
};
