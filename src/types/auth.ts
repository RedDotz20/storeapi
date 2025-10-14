// Auth-related TypeScript types
export interface User {
	id: number;
	username: string;
	email: string;
	password?: string; // Optional since we don't usually return password in responses
	role?: "user" | "admin";
	createdAt?: Date;
	updatedAt?: Date;
}

export interface LoginCredentials {
	email: string; // Platzi API uses email for login
	password: string;
}

export interface SignupCredentials {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

export interface AuthContextType extends AuthState {
	login: (credentials: LoginCredentials) => Promise<void>;
	signup: (credentials: SignupCredentials) => Promise<void>;
	logout: () => void;
	clearError: () => void;
}

// Form validation types
export interface ValidationError {
	field: string;
	message: string;
}

export interface FormState {
	isValid: boolean;
	errors: ValidationError[];
	isSubmitting: boolean;
}

// Platzi API response types
export interface PlatziLoginResponse {
	access_token: string;
	refresh_token: string;
}

export interface PlatziUser {
	id: number;
	email: string;
	password: string;
	name: string;
	role: "customer" | "admin";
	avatar: string;
	creationAt: string;
	updatedAt: string;
}
