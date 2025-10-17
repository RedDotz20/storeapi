import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { withAuth } from "@/components/ProtectedRoute";
import Products from "@/components/Products";

// Define search params schema for type-safe URL state
const dashboardSearchSchema = z.object({
	search: z.string().optional().catch(undefined),
	sortBy: z
		.enum([
			"name-asc",
			"name-desc",
			"price-asc",
			"price-desc",
			"rating-asc",
			"rating-desc",
		])
		.optional()
		.catch("rating-desc"),
	category: z.string().optional().catch(undefined),
	categories: z.array(z.string()).optional().catch([]),
	minPrice: z.number().optional().catch(0),
	maxPrice: z.number().optional().catch(1000),
	minRating: z.number().min(0).max(5).optional().catch(0),
});

export const Route = createFileRoute("/dashboard/")({
	component: withAuth(Dashboard),
	validateSearch: dashboardSearchSchema,
});

function Dashboard() {
	return (
		<div className="min-h-screen bg-background">
			<Products />
		</div>
	);
}
