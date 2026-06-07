"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";
import { AuthModal } from "@/src/features";
// Импортируем меню и тип динамического конфига (без промо)
import { MegaMenu, DynamicMegaMenuConfig } from "./mega-menu";
// Импортируем тип категории из Призмы
import type { Category } from "@/src/generated/prisma";

type MenuType = "men" | "women";

interface HeaderProps {
  cartCount?: number;
  initialIsAuth: boolean;
  dbCategories: Category[]; // Принимаем реальные категории из базы
}

export default function Header({ cartCount = 0, initialIsAuth, dbCategories }: HeaderProps) {
  const [activeMegaMenu, setActiveMegaMenu] = useState<MenuType | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const router = useRouter();

  const handleUserClick = () => {
    if (initialIsAuth) {
      router.push("/profile");
    } else {
      setIsAuthOpen(true);
    }
  };

  // Переход на страницу общего каталога (все товары для мужчин / женщин)
  const handleCategoryClick = (type: MenuType) => {
    setActiveMegaMenu(null);
    router.push(`/catalog/${type}`);
  };

  // Формируем динамический конфиг для MegaMenu БЕЗ промо-баннера
  const getDynamicConfig = (): DynamicMegaMenuConfig | null => {
    if (!activeMegaMenu) return null;

    // Фильтруем категории из базы по текущему гендеру
    const filteredDbCategories = dbCategories.filter((cat) => cat.gender === activeMegaMenu);

    // Мапим категории в ссылки
    const dynamicLinks = filteredDbCategories.map((cat) => ({
      title: cat.name,
      href: `/catalog/${activeMegaMenu}/${cat.slug}`,
    }));

    return {
      sections: [
        {
          title: "Категории",
          links: dynamicLinks,
        },
      ],
    };
  };

  const dynamicConfig = getDynamicConfig();

  return (
    <header className="relative sticky top-0 z-50 bg-white border-b border-gray-200" onMouseLeave={() => setActiveMegaMenu(null)}>
      <div className="px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="tracking-[0.2em] uppercase font-semibold text-black text-lg">
            Legacy
          </Link>

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
            <button onClick={handleUserClick} className="text-black cursor-pointer">
              <User className={`w-5 h-5 ${initialIsAuth ? "text-green-600" : "text-black"}`} />
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

      {/* Выпадающее меню без промо */}
      <MegaMenu isOpen={activeMegaMenu !== null} onClose={() => setActiveMegaMenu(null)} config={dynamicConfig} />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
}