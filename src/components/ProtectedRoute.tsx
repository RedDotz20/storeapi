import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
	children: React.ReactNode;
	redirectTo?: string;
}

export const ProtectedRoute = ({
	children,
	redirectTo = "/auth/login",
}: ProtectedRouteProps) => {
	const { isAuthenticated, isLoading } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			navigate({ to: redirectTo });
		}
	}, [isAuthenticated, isLoading, navigate, redirectTo]);

	// Show loading while checking authentication
	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-2 text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	// Don't render children if not authenticated
	if (!isAuthenticated) {
		return null;
	}

	return <>{children}</>;
};

// Higher-order component for protecting routes
export const withAuth = <P extends object>(
	Component: React.ComponentType<P>
) => {
	return (props: P) => (
		<ProtectedRoute>
			<Component {...props} />
		</ProtectedRoute>
	);
};
