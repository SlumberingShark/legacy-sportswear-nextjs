"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";
import { AuthModal } from "@/src/features";
import { MegaMenu, DynamicMegaMenuConfig } from "./mega-menu";
import type { Category } from "@/src/generated/prisma";
import { checkAuth } from "@/src/features/auth/actions";
type MenuType = "men" | "women";

interface HeaderProps {
	cartCount?: number;
	dbCategories: Category[];
}

export default function Header({ cartCount = 0, dbCategories }: HeaderProps) {
	const [activeMegaMenu, setActiveMegaMenu] = useState<MenuType | null>(null);
	const [isAuthOpen, setIsAuthOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	const getDynamicConfig = (): DynamicMegaMenuConfig | null => {
		if (!activeMegaMenu) return null;
		const filteredDbCategories = dbCategories.filter((cat) => cat.gender === activeMegaMenu);
		const dynamicLinks = filteredDbCategories.map((cat) => ({
			title: cat.name,
			href: `/catalog/${activeMegaMenu}/${cat.slug}`,
		}));

		return {
			sections: [{ title: "Категории", links: dynamicLinks }],
		};
	};

	useEffect(() => {
		// Проверка авторизации через твой action
		checkAuth().then((status) => {
			setIsLoggedIn(status);
			setIsLoading(false);
		});
	}, []);

	const handleUserClick = () => {
		if (isLoading) return;
		// Если залогинен — идем в профиль, если нет — открываем модалку
		if (isLoggedIn) {
			router.push("/profile");
		} else {
			setIsAuthOpen(true);
		}
	};

	const handleCategoryClick = (type: MenuType) => {
		setActiveMegaMenu(null);
		router.push(`/catalog/${type}`);
	};

	return (
		<header className="sticky top-0 z-50 bg-white border-b border-gray-200" onMouseLeave={() => setActiveMegaMenu(null)}>
			<div className="px-6 py-4 max-w-7xl mx-auto">
				<div className="flex items-center justify-between">
					<Link href="/" className="tracking-[0.2em] uppercase font-semibold text-black text-lg">
						Legacy
					</Link>

					{/* ВОТ ЭТОТ БЛОК МЫ ВЕРНУЛИ */}
					<nav className="hidden lg:flex items-center gap-8">
						{(["men", "women"] as const).map((type) => (
							<div key={type} onMouseEnter={() => setActiveMegaMenu(type)}>
								<button
									onClick={() => handleCategoryClick(type)}
									className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity py-4 inline-block text-black cursor-pointer bg-transparent border-none uppercase"
								>
									{type === "men" ? "Мужчинам" : "Женщинам"}
								</button>
							</div>
						))}
					</nav>

					<div className="flex items-center gap-6">
						<button onClick={handleUserClick} className="text-black cursor-pointer flex items-center gap-2">
							{!isLoading && isLoggedIn && <span className="text-xs font-semibold text-green-600">Профиль</span>}
							<User className={`w-5 h-5 ${isLoggedIn ? "text-green-600" : "text-black"}`} />
						</button>

						<Link href="/cart" className="relative text-black">
							<ShoppingBag className="w-5 h-5" />
							{cartCount > 0 && (
								<span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
									{cartCount}
								</span>
							)}
						</Link>
					</div>
				</div>
			</div>

			<MegaMenu isOpen={activeMegaMenu !== null} onClose={() => setActiveMegaMenu(null)} config={getDynamicConfig()} />
			<AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
		</header>
	);
}
