import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Store, Eye, EyeOff } from "lucide-react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/components/AuthProvider";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

export const Route = createFileRoute("/auth/login")({
	component: LoginPage,
});

const formSchema = z.object({
	username: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(20, "Username must be less than 20 characters"),
	password: z.string().min(1, "Password is required"),
});

function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { login, isLoading, error, clearError } = useAuth();

	const togglePassword = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		setShowPassword(prev => !prev);
	};

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: {
			username: "",
			password: "",
		},
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			clearError();
			await login({
				username: data.username,
				password: data.password,
			});
			navigate({ to: "/" });
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	return (
		<div className="screen-height flex items-center justify-center bg-muted relative">
			<div className="max-w-sm w-full flex flex-col items-center border rounded-lg px-6 py-8 shadow-sm/5 bg-card">
				<Store className="h-9 w-9" />
				<p className="my-4 text-xl font-semibold tracking-tight">
					Nexus Marketplace
				</p>

				{error && (
					<div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
						{error}
					</div>
				)}

				<Form {...form}>
					<form
						className="w-full space-y-4"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Enter Your Username"
											className="w-full"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type={showPassword ? "text" : "password"}
												placeholder="Enter Your Password"
												className="w-full"
												{...field}
											/>
											<Button
												variant="ghost"
												size="sm"
												className="absolute top-1/2 right-0.5 -translate-y-1/2"
												onClick={togglePassword}
											>
												{showPassword ? <Eye /> : <EyeOff />}
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="mt-4 w-full" disabled={isLoading}>
							{isLoading ? (
								<div className="flex gap-2 items-center">
									<Spinner /> Signing In...
								</div>
							) : (
								"Sign In with this Account"
							)}
						</Button>
					</form>
				</Form>
				<div className="mt-5 space-y-5">
					{/* <Link
						href="#"
						className="text-sm block underline text-muted-foreground text-center"
					>
						Forgot your password?
					</Link> */}
					<p className="text-sm text-center">
						Don&apos;t have an account?
						<Link
							to="/auth/signup"
							className="ml-1 underline text-muted-foreground"
						>
							Create account
						</Link>
					</p>
				</div>

				<div className="mt-4 p-4 bg-gray-50 rounded-md w-full">
					<p className="text-sm text-gray-600 mb-2">
						Sign In with Demo Account
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
}
