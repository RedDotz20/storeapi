import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { themeService } from "@/services/ThemeService";
import type { Theme, ActualTheme } from "@/services/interfaces/IThemeService";

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	actualTheme: ActualTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(() => themeService.getTheme());
	const [actualTheme, setActualTheme] = useState<ActualTheme>(() =>
		themeService.getActualTheme()
	);

	useEffect(() => {
		// Apply theme on mount
		const resolvedTheme = themeService.applyTheme(theme);
		setActualTheme(resolvedTheme);

		// Listen for system theme changes if theme is "system"
		if (theme === "system") {
			const cleanup = themeService.onSystemThemeChange(newTheme => {
				themeService.applyTheme("system");
				setActualTheme(newTheme);
			});

			return cleanup;
		}
	}, [theme]);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
		themeService.setTheme(newTheme);
		const resolvedTheme = themeService.applyTheme(newTheme);
		setActualTheme(resolvedTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
