import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../components/AuthProvider";
import { validateSignupForm } from "../lib/auth";
import type { SignupCredentials, ValidationError } from "../types/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const SignupForm = () => {
	const navigate = useNavigate();
	const { signup, isLoading, error, clearError } = useAuth();

	const [credentials, setCredentials] = useState<SignupCredentials>({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
		[]
	);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange =
		(field: keyof SignupCredentials) =>
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
		const errors = validateSignupForm(credentials);
		if (errors.length > 0) {
			setValidationErrors(errors);
			return;
		}

		setIsSubmitting(true);
		setValidationErrors([]);

		try {
			await signup(credentials);
			// Redirect to dashboard or home page after successful signup
			navigate({ to: "/" });
		} catch (error) {
			// Error is handled by auth context
			console.error("Signup failed:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="bg-white shadow-md rounded-lg p-6">
				<h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

				{error && (
					<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
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

					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							value={credentials.email}
							onChange={handleInputChange("email")}
							placeholder="Enter your email"
							className={getFieldError("email") ? "border-red-500" : ""}
						/>
						{getFieldError("email") && (
							<p className="text-red-500 text-sm mt-1">
								{getFieldError("email")}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							value={credentials.password}
							onChange={handleInputChange("password")}
							placeholder="Create a password"
							className={getFieldError("password") ? "border-red-500" : ""}
						/>
						{getFieldError("password") && (
							<p className="text-red-500 text-sm mt-1">
								{getFieldError("password")}
							</p>
						)}
						<p className="text-xs text-gray-500 mt-1">
							Must be at least 8 characters with uppercase, lowercase, and
							number
						</p>
					</div>

					<div>
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							id="confirmPassword"
							type="password"
							value={credentials.confirmPassword}
							onChange={handleInputChange("confirmPassword")}
							placeholder="Confirm your password"
							className={
								getFieldError("confirmPassword") ? "border-red-500" : ""
							}
						/>
						{getFieldError("confirmPassword") && (
							<p className="text-red-500 text-sm mt-1">
								{getFieldError("confirmPassword")}
							</p>
						)}
					</div>

					<Button
						type="submit"
						className="w-full"
						disabled={isSubmitting || isLoading}
					>
						{isSubmitting || isLoading
							? "Creating account..."
							: "Create Account"}
					</Button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm text-gray-600">
						Already have an account?{" "}
						<Link
							to="/auth/login"
							className="text-blue-600 hover:text-blue-500 font-medium"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
