import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";

interface LoadingProps {
	className?: string;
	message?: string;
	fullScreen?: boolean;
}

export function Loading({
	className,
	message = "Loading...",
	fullScreen = false,
}: LoadingProps) {
	const containerClasses = fullScreen
		? "fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
		: "flex items-center justify-center p-8";

	return (
		<div className={cn(containerClasses, className)}>
			<div className="flex flex-col items-center gap-4">
				<Spinner className="size-8" />
				<p className="text-sm text-muted-foreground">{message}</p>
			</div>
		</div>
	);
}

export function LoadingCard({ className }: { className?: string }) {
	return (
		<div className={cn("rounded-lg border bg-card p-6", className)}>
			<div className="flex flex-col items-center gap-4">
				<Spinner className="size-6" />
				<p className="text-sm text-muted-foreground">Loading content...</p>
			</div>
		</div>
	);
}
