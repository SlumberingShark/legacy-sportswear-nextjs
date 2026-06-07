import { prisma } from "@/prisma/prisma.client";
import { notFound } from "next/navigation";
import { ImageWithFallback } from "@/src/shared/ui/ImageWithFallback";
import { addToCartAction } from "@/src/features/cart/model/add-to-cart";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const product = await prisma.product.findUnique({
		where: { id },
	});

	if (!product) {
		notFound();
	}

	return (
		<div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
			{/* Левая часть: Изображение */}
			<div className="bg-zinc-100 rounded-2xl overflow-hidden aspect-3/4">
				<ImageWithFallback src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
			</div>

			{/* Правая часть: Информация */}
			<div className="flex flex-col gap-6">
				<h1 className="text-4xl font-bold uppercase tracking-tight">{product.name}</h1>
				<p className="text-2xl font-medium">{product.price.toLocaleString("ru-RU")} ₽</p>

				<div>
					<h3 className="text-sm font-semibold mb-2">Размеры:</h3>
					<div className="flex gap-2">
						{product.sizes.map((size) => (
							<button key={size} className="border border-zinc-300 py-2 px-4 hover:border-black transition-colors">
								{size}
							</button>
						))}
					</div>
				</div>

				<form
					action={async () => {
						"use server";
						await addToCartAction("user-id", product.id, product.sizes[0]);
					}}
				>
					<button className="w-full bg-black text-white py-4 font-medium uppercase hover:bg-zinc-800 transition-colors">Добавить в корзину</button>
				</form>
			</div>
		</div>
	);
}