import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/components/AuthProvider";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import Products from "@/components/Products";

export const Route = createFileRoute("/dashboard/")({
	component: DashboardPage,
});

function DashboardPage() {
	return (
		<ProtectedRoute>
			<Dashboard />
		</ProtectedRoute>
	);
}

function Dashboard() {
	const { user, logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					<div className="bg-white overflow-hidden shadow rounded-lg">
						<div className="px-4 py-5 sm:p-6">
							<h1 className="text-2xl font-bold text-gray-900 mb-4">
								Dashboard
							</h1>

							<div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
								<h2 className="text-lg font-semibold text-blue-900 mb-2">
									Welcome!
								</h2>
								<p className="text-blue-700">
									You are successfully authenticated and can access protected
									content.
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="bg-gray-50 rounded-lg p-4">
									<h3 className="text-lg font-medium text-gray-900 mb-3">
										User Information
									</h3>
									<dl className="space-y-2">
										<div>
											<dt className="text-sm font-medium text-gray-500">
												Email
											</dt>
											<dd className="text-sm text-gray-900">{user?.email}</dd>
										</div>
										<div>
											<dt className="text-sm font-medium text-gray-500">
												Username
											</dt>
											<dd className="text-sm text-gray-900">
												{user?.username}
											</dd>
										</div>
										<div>
											<dt className="text-sm font-medium text-gray-500">
												Role
											</dt>
											<dd className="text-sm text-gray-900">{user?.role}</dd>
										</div>
										<div>
											<dt className="text-sm font-medium text-gray-500">
												User ID
											</dt>
											<dd className="text-sm text-gray-900">{user?.id}</dd>
										</div>
									</dl>
								</div>

								<div className="bg-gray-50 rounded-lg p-4">
									<h3 className="text-lg font-medium text-gray-900 mb-3">
										Account Actions
									</h3>
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
			<Products />
		</div>
	);
}
