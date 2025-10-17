import {
	createContext,
	useContext,
	useReducer,
	useEffect,
	type ReactNode,
} from "react";
import type {
	AuthState,
	AuthContextType,
	LoginCredentials,
	SignupCredentials,
	User,
} from "../types/auth";
import { authService } from "@/services/AuthService";

// Auth action types
type AuthAction =
	| { type: "AUTH_START" }
	| { type: "AUTH_SUCCESS"; payload: User }
	| { type: "AUTH_ERROR"; payload: string }
	| { type: "AUTH_LOGOUT" }
	| { type: "CLEAR_ERROR" }
	| { type: "SET_LOADING"; payload: boolean };

// Initial auth state
const initialAuthState: AuthState = {
	user: null,
	isAuthenticated: false,
	isLoading: true, // Start with loading true to check stored auth
	error: null,
};

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case "AUTH_START":
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case "AUTH_SUCCESS":
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				isLoading: false,
				error: null,
			};
		case "AUTH_ERROR":
			return {
				...state,
				user: null,
				isAuthenticated: false,
				isLoading: false,
				error: action.payload,
			};
		case "AUTH_LOGOUT":
			return {
				...state,
				user: null,
				isAuthenticated: false,
				isLoading: false,
				error: null,
			};
		case "CLEAR_ERROR":
			return {
				...state,
				error: null,
			};
		case "SET_LOADING":
			return {
				...state,
				isLoading: action.payload,
			};
		default:
			return state;
	}
};

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [state, dispatch] = useReducer(authReducer, initialAuthState);

	// Check for stored authentication on mount
	useEffect(() => {
		const checkStoredAuth = () => {
			const storedUser = authService.getStoredUser();
			const storedToken = authService.getStoredToken();

			if (storedUser && storedToken) {
				dispatch({ type: "AUTH_SUCCESS", payload: storedUser });
			} else {
				dispatch({ type: "SET_LOADING", payload: false });
			}
		};

		checkStoredAuth();
	}, []);

	// Login function using AuthService
	const login = async (credentials: LoginCredentials): Promise<void> => {
		try {
			dispatch({ type: "AUTH_START" });

			// Delegate to auth service
			const user = await authService.login(credentials);

			dispatch({ type: "AUTH_SUCCESS", payload: user });
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Login failed";
			dispatch({ type: "AUTH_ERROR", payload: errorMessage });
			throw error;
		}
	};

	// Signup function using AuthService
	const signup = async (credentials: SignupCredentials): Promise<void> => {
		try {
			dispatch({ type: "AUTH_START" });

			// Delegate to auth service
			const user = await authService.signup(credentials);

			dispatch({ type: "AUTH_SUCCESS", payload: user });
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Signup failed";
			dispatch({ type: "AUTH_ERROR", payload: errorMessage });
			throw error;
		}
	};

	// Logout function
	const logout = (): void => {
		authService.clearAuth();
		dispatch({ type: "AUTH_LOGOUT" });
	};

	// Clear error function
	const clearError = (): void => {
		dispatch({ type: "CLEAR_ERROR" });
	};

	const contextValue: AuthContextType = {
		...state,
		login,
		signup,
		logout,
		clearError,
	};

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

// Hook to check if user is authenticated
export const useRequireAuth = () => {
	const { isAuthenticated, isLoading } = useAuth();
	return { isAuthenticated, isLoading };
};

// Hook to get current user
export const useCurrentUser = () => {
	const { user } = useAuth();
	return user;
};
