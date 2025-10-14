import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import Navbar from "@/components/navbar";
import { AuthProvider } from "../components/AuthProvider";
import { CartProvider } from "../components/CartProvider";
import { ToastProvider } from "../components/ui/toast";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<AuthProvider>
			<CartProvider>
				<ToastProvider>
					{/* <Header /> */}
					<Navbar />
					<Outlet />
					<TanStackDevtools
						config={{
							position: "bottom-left",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							TanStackQueryDevtools,
						]}
					/>
				</ToastProvider>
			</CartProvider>
		</AuthProvider>
	),
});
