import { Link, useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { validateLoginForm } from "../lib/auth";
import type { LoginCredentials, ValidationError } from "../types/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const LoginForm = () => {
	const navigate = useNavigate();
	const { login, isLoading, error, clearError } = useAuth();
	const usernameId = useId();
	const passwordId = useId();

	const [credentials, setCredentials] = useState<LoginCredentials>({
		username: "",
		password: "",
	});

	const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
		[]
	);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange =
		(field: keyof LoginCredentials) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setCredentials(prev => ({
				...prev,
				[field]: e.target.value,
			}));

			// Clear validation errors for this field
			setValidationErrors(prev => prev.filter(error => error.field !== field));

			// Clear auth error
			if (error) {
				clearError();
			}
		};

	const getFieldError = (field: string) => {
		return validationErrors.find(error => error.field === field)?.message;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate form
		const errors = validateLoginForm(credentials);
		if (errors.length > 0) {
			setValidationErrors(errors);
			return;
		}

		setIsSubmitting(true);
		setValidationErrors([]);

		try {
			await login(credentials);
			// Redirect to dashboard or home page after successful login
			navigate({ to: "/" });
		} catch (error) {
			// Error is handled by auth context
			console.error("Login failed:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="bg-white shadow-md rounded-lg p-6">
				<h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

				{error && (
					<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<Label htmlFor={usernameId}>Username</Label>
						<Input
							id={usernameId}
							type="text"
							value={credentials.username}
							onChange={handleInputChange("username")}
							placeholder="Enter your username"
							className={getFieldError("username") ? "border-red-500" : ""}
						/>

						{getFieldError("username") && (
							<p className="text-red-500 text-sm mt-1">
								{getFieldError("username")}
							</p>
						)}
					</div>
					<div className="mb-6">
						<Label htmlFor={passwordId}>Password</Label>
						<Input
							id={passwordId}
							type="password"
							value={credentials.password}
							onChange={handleInputChange("password")}
							placeholder="Enter your password"
							className={getFieldError("password") ? "border-red-500" : ""}
						/>

						{getFieldError("password") && (
							<p className="text-red-500 text-sm mt-1">
								{getFieldError("password")}
							</p>
						)}
					</div>
					<Button
						type="submit"
						className="w-full"
						disabled={isSubmitting || isLoading}
					>
						{isSubmitting || isLoading ? "Signing in..." : "Sign In"}
					</Button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm text-gray-600">
						Don't have an account?{" "}
						<Link
							to="/auth/signup"
							className="text-blue-600 hover:text-blue-500 font-medium"
						>
							Sign up
						</Link>
					</p>
				</div>

				<div className="mt-4 p-4 bg-gray-50 rounded-md">
					<p className="text-sm text-gray-600 mb-2">
						Demo account for FakeStoreAPI:
					</p>
					<p className="text-xs text-gray-500">
						Username: mor_2314
						<br />
						Password: 83r5^_
					</p>
				</div>
			</div>
		</div>
	);
};
