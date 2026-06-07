"use client";

import { useState, useTransition } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/shared";
import { prisma } from "../../../../prisma/prisma.client";
import { updateQuantityAction, removeItemAction } from '../../../features/cart/model/actions'


// Типы данных
interface Product {
	name: string;
	price: number;
	imageUrl: string;
}
interface CartItem {
	id: string;
	quantity: number;
	size: string;
	product: Product;
}

// Заглушка для ошибки картинки
const ERROR_IMG_SRC =
	"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4=";

function CartImage({ src, alt, className }: { src: string; alt: string; className: string }) {
	const [didError, setDidError] = useState(false);
	return didError ? (
		<div className={`flex items-center justify-center bg-gray-100 ${className}`}>
			<img src={ERROR_IMG_SRC} alt="Error" className="w-1/2 opacity-30" />
		</div>
	) : (
		<img src={src} alt={alt} className={className} onError={() => setDidError(true)} />
	);
}

export default function CartClient({ initialCart }: { initialCart: any }) {
	const [isPending, startTransition] = useTransition();
	const cartItems = initialCart?.items || [];

	const handleUpdate = (id: string, qty: number) => {
		startTransition(() => updateQuantityAction(id, Math.max(1, qty)));
	};

	const handleRemove = (id: string) => {
		startTransition(() => removeItemAction(id));
	};

	const subtotal = cartItems.reduce((sum: number, item: CartItem) => sum + item.product.price * item.quantity, 0);

	return (
		<div className="py-12">
			<div className="max-w-6xl mx-auto px-6">
				<h1 className="text-4xl tracking-tight mb-12">Корзина</h1>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					<div className="lg:col-span-2 space-y-6">
						{cartItems.length === 0 ? (
							<div className="text-center py-12 border rounded-3xl">
								<p className="text-gray-500 mb-6">Ваша корзина пуста</p>
								<Button asChild>
									<Link href="/category/all">Перейти в каталог</Link>
								</Button>
							</div>
						) : (
							cartItems.map((item: CartItem) => (
								<div key={item.id} className="flex gap-6 border-b border-gray-200 pb-6">
									<div className="w-32 h-40 bg-neutral-50 rounded-lg overflow-hidden flex-shrink-0">
										<CartImage src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
									</div>
									<div className="flex-1">
										<h3 className="text-lg font-medium">{item.product.name}</h3>
										<p className="text-sm text-gray-500 mt-1">Размер: {item.size}</p>
										<p className="text-lg mt-3 font-semibold">{item.product.price.toLocaleString("ru-RU")} ₽</p>
									</div>
									<div className="flex flex-col items-end justify-between">
										<Button variant="ghost" size="icon" onClick={() => handleRemove(item.id)} className="text-gray-400 hover:text-red-600">
											<Trash2 className="w-5 h-5" />
										</Button>
										<div className="flex items-center gap-1 border border-input rounded-2xl p-1">
											<Button variant="ghost" size="icon-xs" onClick={() => handleUpdate(item.id, item.quantity - 1)}>
												<Minus className="w-3 h-3" />
											</Button>
											<span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
											<Button variant="ghost" size="icon-xs" onClick={() => handleUpdate(item.id, item.quantity + 1)}>
												<Plus className="w-3 h-3" />
											</Button>
										</div>
									</div>
								</div>
							))
						)}
					</div>
					<div className="lg:col-span-1">
						<div className="bg-secondary/30 rounded-3xl p-6 sticky top-24">
							<h2 className="text-xl font-medium mb-6">Итого</h2>
							<div className="space-y-3 mb-6">
								<div className="flex justify-between text-sm">
									<span>Подытог</span>
									<span>{subtotal.toLocaleString("ru-RU")} ₽</span>
								</div>
								<div className="border-t border-border pt-3 flex justify-between text-lg font-semibold">
									<span>Всего</span>
									<span>{subtotal.toLocaleString("ru-RU")} ₽</span>
								</div>
							</div>
							<Button className="w-full py-6 text-base rounded-xl" disabled={cartItems.length === 0 || isPending}>
								{isPending ? "Загрузка..." : "Оформить заказ"}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
