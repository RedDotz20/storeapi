import { useAuth } from "@/components/AuthProvider";
import { withAuth } from "@/components/ProtectedRoute";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile")({
	component: withAuth(RouteComponent),
});

function RouteComponent() {
	const { user, logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<div className="px-4 py-6 sm:px-0">
				<div className="bg-card overflow-hidden shadow rounded-lg">
					<div className="px-4 py-5 sm:p-6">
						<h1 className="text-2xl font-bold mb-4">Your Profile</h1>

						<div className="bg-primary/10 border border-primary/20 rounded-md p-4 mb-6">
							<h2 className="text-lg font-semibold mb-2">Welcome!</h2>
							<p className="text-muted-foreground">
								You are successfully authenticated and can access protected
								content.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="bg-muted rounded-lg p-4">
								<h3 className="text-lg font-medium mb-3">User Information</h3>
								<dl className="space-y-2">
									<div>
										<dt className="text-sm font-medium text-muted-foreground">
											Email
										</dt>
										<dd className="text-sm">{user?.email}</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-muted-foreground">
											Username
										</dt>
										<dd className="text-sm">{user?.username}</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-muted-foreground">
											Role
										</dt>
										<dd className="text-sm">{user?.role}</dd>
									</div>
									<div>
										<dt className="text-sm font-medium text-muted-foreground">
											User ID
										</dt>
										<dd className="text-sm">{user?.id}</dd>
									</div>
								</dl>
							</div>

							<div className="bg-muted rounded-lg p-4">
								<h3 className="text-lg font-medium mb-3">Account Actions</h3>
								<div className="space-y-3">
									<Button
										onClick={handleLogout}
										variant="destructive"
										className="w-full"
									>
										Sign Out
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
