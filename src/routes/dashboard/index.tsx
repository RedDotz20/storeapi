import { createFileRoute } from "@tanstack/react-router";

import { withAuth } from "@/components/ProtectedRoute";
import Products from "@/components/Products";

export const Route = createFileRoute("/dashboard/")({
	component: withAuth(Dashboard),
});

function Dashboard() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Products />
		</div>
	);
}
