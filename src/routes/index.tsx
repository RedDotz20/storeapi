import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	ShoppingBag,
	Star,
	Truck,
	Shield,
	CreditCard,
	ArrowRight,
	Zap,
	Heart,
} from "lucide-react";

export const Route = createFileRoute("/")({
	component: LandingPage,
});

function LandingPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
			{/* Hero Section */}
			<section className="container mx-auto px-4 py-16 md:py-24">
				<div className="flex flex-col items-center text-center max-w-4xl mx-auto">
					<div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
						<Zap className="h-4 w-4" />
						<span>New Arrivals Every Week</span>
					</div>

					<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
						Discover Amazing Products at Unbeatable Prices
					</h1>

					<p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
						Shop the latest trends, exclusive collections, and premium quality
						products. Your one-stop destination for all your shopping needs.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 mb-12">
						<Link to="/dashboard">
							<Button size="lg" className="text-lg px-8 group">
								Shop Now
								<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
							</Button>
						</Link>
						<Link to="/auth/signup">
							<Button size="lg" variant="outline" className="text-lg px-8">
								Create Account
							</Button>
						</Link>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-3 gap-8 w-full max-w-2xl mt-8">
						<div className="flex flex-col items-center">
							<div className="text-3xl md:text-4xl font-bold text-primary mb-1">
								1000+
							</div>
							<div className="text-sm text-muted-foreground">Products</div>
						</div>
						<div className="flex flex-col items-center">
							<div className="text-3xl md:text-4xl font-bold text-primary mb-1">
								50K+
							</div>
							<div className="text-sm text-muted-foreground">
								Happy Customers
							</div>
						</div>
						<div className="flex flex-col items-center">
							<div className="flex items-center gap-1 text-3xl md:text-4xl font-bold text-primary mb-1">
								<Star className="h-6 w-6 md:h-8 md:w-8 fill-primary" />
								<span>4.9</span>
							</div>
							<div className="text-sm text-muted-foreground">Rating</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="container mx-auto px-4 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<Card className="border-2 transition-all hover:shadow-lg hover:border-primary/50">
						<CardContent className="pt-6 text-center">
							<div className="mb-4 inline-flex p-3 bg-primary/10 rounded-full">
								<Truck className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
							<p className="text-sm text-muted-foreground">
								On orders over $50. Fast and reliable delivery.
							</p>
						</CardContent>
					</Card>

					<Card className="border-2 transition-all hover:shadow-lg hover:border-primary/50">
						<CardContent className="pt-6 text-center">
							<div className="mb-4 inline-flex p-3 bg-primary/10 rounded-full">
								<Shield className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
							<p className="text-sm text-muted-foreground">
								100% secure transactions with encryption.
							</p>
						</CardContent>
					</Card>

					<Card className="border-2 transition-all hover:shadow-lg hover:border-primary/50">
						<CardContent className="pt-6 text-center">
							<div className="mb-4 inline-flex p-3 bg-primary/10 rounded-full">
								<CreditCard className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
							<p className="text-sm text-muted-foreground">
								30-day money-back guarantee, no questions asked.
							</p>
						</CardContent>
					</Card>

					<Card className="border-2 transition-all hover:shadow-lg hover:border-primary/50">
						<CardContent className="pt-6 text-center">
							<div className="mb-4 inline-flex p-3 bg-primary/10 rounded-full">
								<Heart className="h-8 w-8 text-primary" />
							</div>
							<h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
							<p className="text-sm text-muted-foreground">
								Our team is here to help you anytime.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Categories Section */}
			<section className="container mx-auto px-4 py-16">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Shop by Category
					</h2>
					<p className="text-muted-foreground text-lg">
						Explore our wide range of product categories
					</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{categories.map(category => {
						return (
							<Link
								key={category.name}
								to="/dashboard"
								search={{ category: category.slug }}
								className="group"
							>
								<Card className="overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/20 hover:border-primary cursor-pointer h-full">
									<CardContent className="p-6 flex flex-col items-center text-center gap-3">
										<div className="p-4 bg-primary/10 rounded-full transition-transform group-hover:scale-110">
											<category.icon className="h-8 w-8 text-primary" />
										</div>
										<h3 className="font-semibold text-lg">{category.name}</h3>
									</CardContent>
								</Card>
							</Link>
						);
					})}
				</div>
			</section>

			{/* CTA Section */}
			<section className="container mx-auto px-4 py-16 mb-16">
				<Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
					<CardContent className="py-16 text-center">
						<ShoppingBag className="h-16 w-16 mx-auto mb-6 opacity-90" />
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Ready to Start Shopping?
						</h2>
						<p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
							Join thousands of satisfied customers and discover amazing deals
							today. Sign up now and get 10% off your first order!
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link to="/auth/signup">
								<Button size="lg" variant="secondary" className="text-lg px-8">
									Get Started Free
								</Button>
							</Link>
							<Link to="/dashboard">
								<Button
									size="lg"
									variant="outline"
									className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
								>
									Browse Products
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			</section>

			{/* Footer */}
			<footer className="bg-secondary/30 border-t">
				<div className="container mx-auto px-4 py-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
						{/* About Section */}
						<div>
							<h3 className="font-bold text-lg mb-4 flex items-center gap-2">
								<ShoppingBag className="h-5 w-5 text-primary" />
								Nexus Market
							</h3>
							<p className="text-sm text-muted-foreground mb-4">
								Your trusted online shopping destination. Quality products,
								unbeatable prices, and exceptional service.
							</p>
							<div className="flex gap-3">
								<a
									href="https://github.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									<svg
										className="h-5 w-5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
									</svg>
								</a>
								<a
									href="https://twitter.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									<svg
										className="h-5 w-5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
									</svg>
								</a>
								<a
									href="https://facebook.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									<svg
										className="h-5 w-5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
									</svg>
								</a>
							</div>
						</div>

						{/* Shop Section */}
						<div>
							<h3 className="font-bold text-lg mb-4">Shop</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<Link
										to="/dashboard"
										search={{ category: "electronics" }}
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										Electronics
									</Link>
								</li>
								<li>
									<Link
										to="/dashboard"
										search={{ category: "jewelery" }}
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										Jewelry
									</Link>
								</li>
								<li>
									<Link
										to="/dashboard"
										search={{ category: "men's clothing" }}
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										Men's Clothing
									</Link>
								</li>
								<li>
									<Link
										to="/dashboard"
										search={{ category: "women's clothing" }}
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										Women's Clothing
									</Link>
								</li>
							</ul>
						</div>

						{/* Customer Service Section */}
						<div>
							<h3 className="font-bold text-lg mb-4">Customer Service</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<a
										href="#"
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										Contact Us
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										Shipping & Returns
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										FAQ
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										Size Guide
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										Track Order
									</a>
								</li>
							</ul>
						</div>

						{/* Company Section */}
						<div>
							<h3 className="font-bold text-lg mb-4">Company</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<a
										href="#"
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										About Us
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										Careers
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										Privacy Policy
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										Terms of Service
									</a>
								</li>
								<li>
									<a
										href="#"
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										Blog
									</a>
								</li>
							</ul>
						</div>
					</div>

					{/* Bottom Bar */}
					<div className="pt-8 border-t border-border">
						<div className="flex flex-col md:flex-row justify-between items-center gap-4">
							<p className="text-sm text-muted-foreground">
								© {new Date().getFullYear()} Nexus Market. All rights reserved.
							</p>
							<div className="flex gap-6 text-sm">
								<a
									href="#"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									Privacy
								</a>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									Terms
								</a>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary transition-colors"
								>
									Cookies
								</a>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

const categories = [
	{ name: "Electronics", slug: "electronics", icon: Zap },
	{ name: "Jewelry", slug: "jewelery", icon: Star },
	{ name: "Men's Clothing", slug: "men's clothing", icon: ShoppingBag },
	{ name: "Women's Clothing", slug: "women's clothing", icon: Heart },
];
