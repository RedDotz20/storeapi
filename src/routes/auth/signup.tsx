import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "../../components/SignupForm";

export const Route = createFileRoute("/auth/signup")({
	component: SignupPage,
});

function SignupPage() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<SignupForm />
		</div>
	);
}
