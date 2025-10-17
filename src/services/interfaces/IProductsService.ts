/**
 * Products Service Interface
 * Follows Interface Segregation Principle (ISP)
 */

import type { ProductListsType, ProductType } from "@/types/products.types";

export interface IProductsService {
	/**
	 * Get all products
	 */
	getProducts(limit?: number): Promise<ProductListsType>;

	/**
	 * Get product by ID
	 */
	getProductById(id: string | number): Promise<ProductType>;

	/**
	 * Get all categories
	 */
	getCategories(): Promise<string[]>;

	/**
	 * Get products by category
	 */
	getProductsByCategory(category: string): Promise<ProductListsType>;
}
