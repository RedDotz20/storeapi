import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../CartProvider";
import { useAuth } from "../AuthProvider";
import { Store } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "../ThemeToggle";

const Navbar = () => {
	const { isAuthenticated, user, logout } = useAuth();
	const { cart } = useCart();

	const handleLogout = () => logout();

	return (
		// <div className="min-h-screen bg-muted">
		<nav className="h-16 bg-background border-b">
			<div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-2">
					<Store />
					{/* Desktop Menu */}
					<NavMenu className="hidden md:block" />
				</div>
				<div className="flex gap-2">
					<Link to="/dashboard">Dashboard</Link>
					<Link to="/profile">Profile</Link>
				</div>
				<div className="flex items-center justify-center gap-2">
					{isAuthenticated && (
						<Link
							to="/dashboard/cart"
							className="relative inline-flex items-center justify-center p-2"
						>
							<ShoppingCart className="h-6 w-6" />
							{cart.totalItems > 0 && (
								<span className="absolute -top-0.5 -right-0.5 bg-destructive text-destructive-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
									{cart.totalItems}
								</span>
							)}
						</Link>
					)}

					{isAuthenticated ? (
						<div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Avatar>
										<AvatarImage
											src="https://github.com/shadcn.png"
											alt="@shadcn"
										/>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56" align="start">
									<DropdownMenuLabel className="flex flex-col">
										<span className="text-sm font-bold">{user?.username}</span>
										<span className="text-xs text-muted-foreground">
											{user?.email}
										</span>
									</DropdownMenuLabel>
									<DropdownMenuGroup>
										<DropdownMenuItem>Profile</DropdownMenuItem>
										<DropdownMenuItem>Settings</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />

									<DropdownMenuItem
										variant="destructive"
										onClick={handleLogout}
									>
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					) : (
						<div className="flex gap-2">
							<Link to="/auth/login">
								<Button variant="outline" size="sm">
									Sign In
								</Button>
							</Link>
						</div>
					)}

					<ThemeToggle />

					{/* Mobile Menu */}
					<div className="md:hidden">
						<NavigationSheet />
					</div>
				</div>
			</div>
		</nav>
		// </div>
	);
};

export default Navbar;
