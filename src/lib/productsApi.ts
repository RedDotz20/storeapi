import type { ProductListsType, ProductType } from "@/types/products.types";
import { config } from "@/components/config";

const API_BASE_URL = config.apiBaseUrl;

// Get all products
export const getProducts = async (
	limit?: number
): Promise<ProductListsType> => {
	const url = limit
		? `${API_BASE_URL}/products?limit=${limit}`
		: `${API_BASE_URL}/products`;

	const response = await fetch(url, {
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

// Get all categories
export const getCategories = async (): Promise<string[]> => {
	const response = await fetch(`${API_BASE_URL}/products/categories`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to Fetch Categories");
	}

	return response.json();
};

// Get products by category
export const getProductsByCategory = async (
	category: string
): Promise<ProductListsType> => {
	const response = await fetch(
		`${API_BASE_URL}/products/category/${category}`,
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
