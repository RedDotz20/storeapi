import { Link } from "@tanstack/react-router";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface NotFoundProps {
	className?: string;
	title?: string;
	message?: string;
	showBackButton?: boolean;
	showHomeButton?: boolean;
}

export function NotFound({
	className,
	title = "404 - Page Not Found",
	message = "Sorry, the page you are looking for doesn't exist or has been moved.",
	showBackButton = true,
	showHomeButton = true,
}: NotFoundProps) {
	return (
		<div
			className={cn(
				"flex min-h-[400px] flex-col items-center justify-center gap-6 p-8 text-center",
				className
			)}
		>
			<div className="flex flex-col items-center gap-4">
				<FileQuestion
					className="size-20 text-muted-foreground"
					strokeWidth={1.5}
				/>
				<div className="space-y-2">
					<h1 className="text-4xl font-bold tracking-tight">{title}</h1>
					<p className="text-muted-foreground max-w-md">{message}</p>
				</div>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-3">
				{showBackButton && (
					<Button
						variant="outline"
						onClick={() => window.history.back()}
						className="gap-2"
					>
						<ArrowLeft className="size-4" />
						Go Back
					</Button>
				)}
				{showHomeButton && (
					<Link to="/">
						<Button className="gap-2">
							<Home className="size-4" />
							Go Home
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
}

export function NotFoundProduct({ productId }: { productId?: string }) {
	return (
		<NotFound
			title="Product Not Found"
			message={
				productId
					? `Sorry, we couldn't find a product with ID: ${productId}`
					: "Sorry, we couldn't find the product you're looking for."
			}
		/>
	);
}
