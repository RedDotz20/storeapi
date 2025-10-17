/**
 * Theme Service Implementation
 * Follows Single Responsibility Principle (SRP) - handles only theme logic
 * Follows Dependency Inversion Principle (DIP) - depends on IStorageService abstraction
 *
 * This service encapsulates all theme-related business logic including
 * storage, DOM manipulation, and system theme detection.
 */

import type {
	IThemeService,
	Theme,
	ActualTheme,
} from "./interfaces/IThemeService";
import type { IStorageService } from "./interfaces/IStorageService";

export class ThemeService implements IThemeService {
	private readonly THEME_KEY = "theme";
	private readonly THEME_QUERY = "(prefers-color-scheme: dark)";
	private currentTheme: Theme;
	private currentActualTheme: ActualTheme;

	constructor(private storageService: IStorageService) {
		this.currentTheme = this.loadTheme();
		this.currentActualTheme = this.resolveActualTheme(this.currentTheme);
	}

	/**
	 * Load theme from storage or use default
	 */
	private loadTheme(): Theme {
		const storedTheme = this.storageService.getItem<Theme>(this.THEME_KEY);
		return storedTheme || "system";
	}

	/**
	 * Resolve the actual theme (light or dark) from theme setting
	 */
	private resolveActualTheme(theme: Theme): ActualTheme {
		if (theme === "system") {
			return this.getSystemTheme();
		}
		return theme;
	}

	/**
	 * Get current theme setting
	 */
	getTheme(): Theme {
		return this.currentTheme;
	}

	/**
	 * Set theme and persist to storage
	 */
	setTheme(theme: Theme): void {
		this.currentTheme = theme;
		this.storageService.setItem(this.THEME_KEY, theme);
		this.currentActualTheme = this.applyTheme(theme);
	}

	/**
	 * Get the actual resolved theme
	 */
	getActualTheme(): ActualTheme {
		return this.currentActualTheme;
	}

	/**
	 * Apply theme to DOM
	 */
	applyTheme(theme: Theme): ActualTheme {
		const root = window.document.documentElement;

		// Remove existing theme classes
		root.classList.remove("light", "dark");

		// Determine actual theme
		const actualTheme = this.resolveActualTheme(theme);

		// Apply theme class
		root.classList.add(actualTheme);
		this.currentActualTheme = actualTheme;

		return actualTheme;
	}

	/**
	 * Get system preferred theme
	 */
	getSystemTheme(): ActualTheme {
		if (typeof window === "undefined") return "light";

		const mediaQuery = window.matchMedia(this.THEME_QUERY);
		return mediaQuery.matches ? "dark" : "light";
	}

	/**
	 * Listen to system theme changes
	 * Returns cleanup function
	 */
	onSystemThemeChange(callback: (theme: ActualTheme) => void): () => void {
		if (typeof window === "undefined") {
			return () => {};
		}

		const mediaQuery = window.matchMedia(this.THEME_QUERY);

		const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
			const newTheme = e.matches ? "dark" : "light";
			callback(newTheme);
		};

		// Call handler once immediately with current state
		handleChange(mediaQuery);

		// Add listener for changes
		mediaQuery.addEventListener("change", handleChange);

		// Return cleanup function
		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}
}

// Export singleton instance
import { storageService } from "./StorageService";
export const themeService = new ThemeService(storageService);
