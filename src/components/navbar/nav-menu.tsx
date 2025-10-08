import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => (
	<NavigationMenu {...props}>
		<NavigationMenuList className="gap-3 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<Link
						className="text-2xl font-semibold flex items-center gap-2"
						to="/"
					>
						<span>Nexus Marketplace</span>
					</Link>
				</NavigationMenuLink>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
);
