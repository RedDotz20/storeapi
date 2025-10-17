/**
 * Products Service Implementation
 * Follows Single Responsibility Principle (SRP) - handles only product operations
 * Follows Dependency Inversion Principle (DIP) - depends on IHttpClient abstraction
 *
 * This service encapsulates all product-related API operations.
 */

import type { ProductListsType, ProductType } from "@/types/products.types";
import type { IProductsService } from "./interfaces/IProductsService";
import type { IHttpClient } from "./interfaces/IHttpClient";
import { config } from "@/components/config";

export class ProductsService implements IProductsService {
	constructor(private httpClient: IHttpClient) {}

	/**
	 * Get all products with optional limit
	 */
	async getProducts(limit?: number): Promise<ProductListsType> {
		try {
			const params = limit ? { limit } : undefined;
			return await this.httpClient.get<ProductListsType>("/products", {
				params,
			});
		} catch (error) {
			throw new Error(
				error instanceof Error ? error.message : "Failed to fetch products"
			);
		}
	}

	/**
	 * Get single product by ID
	 */
	async getProductById(id: string | number): Promise<ProductType> {
		try {
			return await this.httpClient.get<ProductType>(`/products/${id}`);
		} catch (error) {
			throw new Error(
				error instanceof Error ? error.message : `Failed to fetch product ${id}`
			);
		}
	}

	/**
	 * Get all product categories
	 */
	async getCategories(): Promise<string[]> {
		try {
			return await this.httpClient.get<string[]>("/products/categories");
		} catch (error) {
			throw new Error(
				error instanceof Error ? error.message : "Failed to fetch categories"
			);
		}
	}

	/**
	 * Get products by category
	 */
	async getProductsByCategory(category: string): Promise<ProductListsType> {
		try {
			return await this.httpClient.get<ProductListsType>(
				`/products/category/${category}`
			);
		} catch (error) {
			throw new Error(
				error instanceof Error
					? error.message
					: "Failed to fetch products by category"
			);
		}
	}
}

// Create singleton instance with dependency
import { HttpClient } from "./HttpClient";

const httpClient = new HttpClient(config.apiBaseUrl);
export const productsService = new ProductsService(httpClient);
