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
	username: string; // Changed from email to username for FakeStore API
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

// FakeStore API response types
export interface FakeStoreLoginResponse {
	token: string;
}

export interface FakeStoreUser {
	id: number;
	username: string;
	email: string;
	name: {
		firstname: string;
		lastname: string;
	};
	address: {
		city: string;
		street: string;
		number: number;
		zipcode: string;
		geolocation: {
			lat: string;
			long: string;
		};
	};
	phone: string;
}
