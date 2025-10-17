/**
 * Products API - Refactored to use ProductsService
 *
 * This file now delegates to ProductsService following SOLID principles.
 * Acts as a facade for backward compatibility.
 *
 * New code should import ProductsService directly.
 */

import type { ProductListsType, ProductType } from "@/types/products.types";
import { productsService } from "@/services/ProductsService";

// Get all products - delegates to ProductsService
export const getProducts = async (
	limit?: number
): Promise<ProductListsType> => {
	return productsService.getProducts(limit);
};

// Get single product by ID - delegates to ProductsService
export const getProductById = async (
	id: string | number
): Promise<ProductType> => {
	return productsService.getProductById(id);
};

// Get all categories - delegates to ProductsService
export const getCategories = async (): Promise<string[]> => {
	return productsService.getCategories();
};

// Get products by category - delegates to ProductsService
export const getProductsByCategory = async (
	category: string
): Promise<ProductListsType> => {
	return productsService.getProductsByCategory(category);
};
