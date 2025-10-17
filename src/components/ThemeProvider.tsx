import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	actualTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>(() => {
		// Get theme from localStorage or default to "system"
		const savedTheme = localStorage.getItem("theme") as Theme | null;
		return savedTheme || "system";
	});

	const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		// Save theme to localStorage
		localStorage.setItem("theme", theme);

		const root = window.document.documentElement;

		// Remove existing theme classes
		root.classList.remove("light", "dark");

		if (theme === "system") {
			// Use system preference
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";
			root.classList.add(systemTheme);
			setActualTheme(systemTheme);

			// Listen for system theme changes
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const handleChange = (e: MediaQueryListEvent) => {
				const newTheme = e.matches ? "dark" : "light";
				root.classList.remove("light", "dark");
				root.classList.add(newTheme);
				setActualTheme(newTheme);
			};

			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		} else {
			// Use explicit theme
			root.classList.add(theme);
			setActualTheme(theme);
		}
	}, [theme]);

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
