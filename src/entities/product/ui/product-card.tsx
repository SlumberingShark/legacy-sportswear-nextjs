"use client";

import { useState } from "react";
import Link from "next/link"; // Добавлен импорт
import { Heart } from "lucide-react";
import { ImageWithFallback } from "@/src/shared/ui/ImageWithFallback";
import { Product } from "../model/types";

interface ProductCardProps {
	product: Product;
	onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
	const { id, name, price, fabric, colors, image, inStock = true } = product;
	const [isFavorite, setIsFavorite] = useState(false);

	return (
		<div className="group relative flex flex-col bg-white overflow-hidden transition-all duration-300">
			{/* ССЫЛКА-ОБЕРТКА: растягивается на всю карточку */}
			<Link href={`/product/${id}`} className="absolute inset-0 z-0" aria-label={name} />

			<div className="relative aspect-3/4 bg-zinc-100 overflow-hidden rounded-xl mb-4">
				<ImageWithFallback src={image} alt={name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out" />

				{/* Кнопка добавления (z-10 выше z-0 ссылки) */}
				{inStock && (
					<div className="absolute bottom-3 inset-x-3 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 z-10">
						<button
							onClick={(e) => {
								e.preventDefault();
								onAddToCart?.(product);
							}}
							className="w-full bg-white text-black text-xs uppercase tracking-wider py-3 px-4 rounded-lg font-medium shadow-md hover:bg-zinc-900 hover:text-white transition-colors duration-200"
						>
							В корзину
						</button>
					</div>
				)}
			</div>

			<div className="flex flex-col grow space-y-1 px-1">
				{colors.length > 0 && (
					<div className="flex gap-1.5 mb-1 items-center">
						{colors.map((color, colorIndex) => (
							<div
								key={colorIndex}
								className="w-3.5 h-3.5 rounded-full border border-zinc-200 cursor-pointer p-px hover:scale-110 transition-transform"
								style={{ backgroundColor: color }}
								title={color}
							/>
						))}
					</div>
				)}
				<h3 className="text-sm font-normal text-zinc-900 tracking-tight line-clamp-1">{name}</h3>
				{fabric && <p className="text-xs text-zinc-400 font-normal tracking-wide">{fabric}</p>}
				<p className="text-sm font-normal text-black pt-1">{typeof price === "number" ? price.toLocaleString("ru-RU") : price} ₽</p>
				{!inStock && <span className="text-[11px] text-zinc-400 uppercase tracking-wider pt-1">Нет в наличии</span>}
			</div>
		</div>
	);
}
