import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface ErrorStateProps {
	className?: string;
	title?: string;
	message?: string;
	showRetry?: boolean;
	showHomeButton?: boolean;
	onRetry?: () => void;
}

export function ErrorState({
	className,
	title = "Something Went Wrong",
	message = "We encountered an error while loading the content. Please try again.",
	showRetry = true,
	showHomeButton = false,
	onRetry,
}: ErrorStateProps) {
	return (
		<div
			className={cn(
				"flex min-h-[400px] flex-col items-center justify-center gap-6 p-8 text-center",
				className
			)}
		>
			<div className="flex flex-col items-center gap-4">
				<div className="rounded-full bg-destructive/10 p-4">
					<AlertCircle className="size-12 text-destructive" strokeWidth={1.5} />
				</div>
				<div className="space-y-2">
					<h2 className="text-2xl font-bold tracking-tight">{title}</h2>
					<p className="text-muted-foreground max-w-md">{message}</p>
				</div>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-3">
				{showRetry && onRetry && (
					<Button onClick={onRetry} className="gap-2">
						<RefreshCw className="size-4" />
						Try Again
					</Button>
				)}
				{showHomeButton && (
					<Link to="/">
						<Button variant="outline" className="gap-2">
							<Home className="size-4" />
							Go Home
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
}

export function ProductsErrorState({ onRetry }: { onRetry?: () => void }) {
	return (
		<ErrorState
			title="Failed to Load Products"
			message="We couldn't load the products. This might be due to a network issue or server problem. Please try again."
			showRetry={true}
			onRetry={onRetry}
		/>
	);
}

export function ProductDetailErrorState({ onRetry }: { onRetry?: () => void }) {
	return (
		<ErrorState
			title="Failed to Load Product"
			message="We couldn't load this product. Please check your connection and try again."
			showRetry={true}
			showHomeButton={true}
			onRetry={onRetry}
		/>
	);
}
