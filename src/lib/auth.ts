import type {
	LoginCredentials,
	SignupCredentials,
	ValidationError,
} from "../types/auth";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password strength validation
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

export const validateUsername = (username: string): ValidationError | null => {
	if (!username) {
		return { field: "username", message: "Username is required" };
	}
	if (username.length < 3) {
		return {
			field: "username",
			message: "Username must be at least 3 characters long",
		};
	}
	if (username.length > 20) {
		return {
			field: "username",
			message: "Username must be less than 20 characters",
		};
	}
	if (!/^[a-zA-Z0-9_]+$/.test(username)) {
		return {
			field: "username",
			message: "Username can only contain letters, numbers, and underscores",
		};
	}
	return null;
};

export const validateEmail = (email: string): ValidationError | null => {
	if (!email) {
		return { field: "email", message: "Email is required" };
	}
	if (!EMAIL_REGEX.test(email)) {
		return { field: "email", message: "Please enter a valid email address" };
	}
	return null;
};

export const validatePassword = (password: string): ValidationError | null => {
	if (!password) {
		return { field: "password", message: "Password is required" };
	}
	if (password.length < PASSWORD_MIN_LENGTH) {
		return {
			field: "password",
			message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
		};
	}
	if (!PASSWORD_REGEX.test(password)) {
		return {
			field: "password",
			message:
				"Password must contain at least one uppercase letter, one lowercase letter, and one number",
		};
	}
	return null;
};

export const validateLoginForm = (
	credentials: LoginCredentials
): ValidationError[] => {
	const errors: ValidationError[] = [];

	const emailError = validateEmail(credentials.email);
	if (emailError) errors.push(emailError);

	if (!credentials.password) {
		errors.push({ field: "password", message: "Password is required" });
	}

	return errors;
};

export const validateSignupForm = (
	credentials: SignupCredentials
): ValidationError[] => {
	const errors: ValidationError[] = [];

	const usernameError = validateUsername(credentials.username);
	if (usernameError) errors.push(usernameError);

	const emailError = validateEmail(credentials.email);
	if (emailError) errors.push(emailError);

	const passwordError = validatePassword(credentials.password);
	if (passwordError) errors.push(passwordError);

	if (!credentials.confirmPassword) {
		errors.push({
			field: "confirmPassword",
			message: "Please confirm your password",
		});
	} else if (credentials.password !== credentials.confirmPassword) {
		errors.push({
			field: "confirmPassword",
			message: "Passwords do not match",
		});
	}

	return errors;
};
