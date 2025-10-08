import { Link } from "@tanstack/react-router";
import { useAuth } from "./AuthProvider";
import { useCart } from "./CartProvider";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import Navbar from "./navbar";
export default function Header() {
	const { isAuthenticated, user, logout } = useAuth();
	const { cart } = useCart();

	const handleLogout = () => {
		logout();
	};

	return (
		<>
			<header className="p-2 flex gap-2 bg-white text-black justify-between border-b">
				<nav className="flex flex-row">
					<div className="px-2 font-bold">
						<Link to="/">Home</Link>
					</div>

					{isAuthenticated && (
						<div className="px-2 font-bold">
							<Link to="/dashboard">Dashboard</Link>
						</div>
					)}

					{isAuthenticated && (
						<div className="px-2">
							<Link
								to="/dashboard/cart"
								className="relative inline-flex items-center"
							>
								<ShoppingCart className="h-5 w-5" />
								{cart.totalItems > 0 && (
									<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
										{cart.totalItems}
									</span>
								)}
							</Link>
						</div>
					)}
				</nav>

				<div className="flex items-center gap-2">
					{isAuthenticated ? (
						<div className="flex items-center gap-3">
							<span className="text-sm text-gray-600">
								Welcome, {user?.username}
							</span>
							<Button onClick={handleLogout} variant="outline" size="sm">
								Sign Out
							</Button>
						</div>
					) : (
						<div className="flex gap-2">
							<Link to="/auth/login">
								<Button variant="outline" size="sm">
									Sign In
								</Button>
							</Link>
							<Link to="/auth/signup">
								<Button size="sm">Sign Up</Button>
							</Link>
						</div>
					)}
				</div>
			</header>
			<Navbar />
		</>
	);
}
