"use client";

import { useState } from "react";
import { Product, ProductCard } from "@/src/entities/product";
import { SortSelect, sortProducts, SortOption } from "@/src/features/sort-products";

interface ProductGridProps {
	initialProducts: Product[];
}

export function ProductGrid({ initialProducts }: ProductGridProps) {
	const [sortBy, setSortBy] = useState<SortOption>("new");

	// Применяем чистую функцию сортировки из слоя features
	const processedProducts = sortProducts(initialProducts, sortBy);

	const handleAddToCart = (product: Product) => {
		// В будущем здесь будет вызов фичи / корзины (например, dispatch в Redux или запрос к API)
		console.log("Добавлено в корзину:", product.name, `ID: ${product.id}`);
	};

	return (
		<div className="w-full">
			{/* Панель управления каталогом (Сортировка и кнопка фильтров) */}
			<div className="flex items-center justify-between gap-4 flex-wrap mb-10 pb-4 border-b border-zinc-100">
				<SortSelect value={sortBy} onChange={setSortBy} />
			</div>

			{/* Сетка товаров: строго 4 колонки на десктопе, без лишних внутренних отступов */}
			{processedProducts.length === 0 ? (
				<div className="text-center py-20 text-zinc-400 text-sm">В этой категории пока нет товаров</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
					{processedProducts.map((product) => (
						<ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
					))}
				</div>
			)}
		</div>
	);
}
