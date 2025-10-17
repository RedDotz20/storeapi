/**
 * Theme Service Interface
 * Follows Interface Segregation Principle (ISP)
 */

export type Theme = "light" | "dark" | "system";
export type ActualTheme = "light" | "dark";

export interface IThemeService {
	/**
	 * Get the current theme setting
	 */
	getTheme(): Theme;

	/**
	 * Set the theme
	 */
	setTheme(theme: Theme): void;

	/**
	 * Get the actual resolved theme (light or dark)
	 */
	getActualTheme(): ActualTheme;

	/**
	 * Apply theme to DOM
	 */
	applyTheme(theme: Theme): ActualTheme;

	/**
	 * Check if system prefers dark mode
	 */
	getSystemTheme(): ActualTheme;

	/**
	 * Listen to system theme changes
	 */
	onSystemThemeChange(callback: (theme: ActualTheme) => void): () => void;
}
