"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { MegaMenu } from "./mega-menu";
import { menuConfigs } from "../model/menuData";

type MenuType = "men" | "women";

export default function Header({ cartCount = 0 }: { cartCount?: number }) {
	const [activeMegaMenu, setActiveMegaMenu] = useState<MenuType | null>(null);

	return (
		<header className="sticky top-0 z-50 bg-white border-b border-gray-200">
			<div className="px-6 py-4 max-w-7xl mx-auto">
				<div className="flex items-center justify-between">
					<Link href="/" className="tracking-[0.2em] uppercase font-semibold text-black text-lg">
						Legacy
					</Link>

					<nav className="hidden lg:flex items-center gap-8">
						{(["men", "women"] as const).map((type) => (
							<div key={type} className="relative" onMouseEnter={() => setActiveMegaMenu(type)} onMouseLeave={() => setActiveMegaMenu(null)}>
								<Link href={`/catalog/${type}`} className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity py-4 inline-block text-black">
									{type === "men" ? "Мужчинам" : "Женщинам"}
								</Link>

								<MegaMenu isOpen={activeMegaMenu === type} onClose={() => setActiveMegaMenu(null)} config={menuConfigs[type]} />
							</div>
						))}
					</nav>

					<div className="flex items-center gap-6">
						<button className="text-black">
							<Search className="w-5 h-5" />
						</button>
						<button className="text-black">
							<User className="w-5 h-5" />
						</button>
						<Link href="/cart" className="relative text-black">
							<ShoppingBag className="w-5 h-5" />
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
