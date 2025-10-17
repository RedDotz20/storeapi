/**
 * Services Index
 * Central export point for all services
 */

// Storage Services
export {
	LocalStorageService,
	SessionStorageService,
	InMemoryStorageService,
	storageService,
} from "./StorageService";
export type { IStorageService } from "./interfaces/IStorageService";

// HTTP Client
export { HttpClient } from "./HttpClient";
export type { IHttpClient, RequestConfig } from "./interfaces/IHttpClient";

// Auth Service
export { AuthService, authService } from "./AuthService";
export type { IAuthService } from "./interfaces/IAuthService";

// Theme Service
export { ThemeService, themeService } from "./ThemeService";
export type {
	IThemeService,
	Theme,
	ActualTheme,
} from "./interfaces/IThemeService";

// Cart Service
export { CartService, cartService } from "./CartService";
export type { ICartService } from "./interfaces/ICartService";

// Products Service
export { ProductsService, productsService } from "./ProductsService";
export type { IProductsService } from "./interfaces/IProductsService";
