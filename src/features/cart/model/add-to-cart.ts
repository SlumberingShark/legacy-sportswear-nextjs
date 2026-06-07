"use server";

import { prisma } from "../../../../prisma/prisma.client";
import { revalidatePath } from "next/cache";

export async function addToCartAction(userId: string, productId: string, size: string) {
	// 1. Ищем корзину пользователя или создаем новую
	let cart = await prisma.cart.findUnique({ where: { userId } });

	if (!cart) {
		cart = await prisma.cart.create({ data: { userId } });
	}

	// 2. Ищем, есть ли уже такой товар с таким размером в корзине
	const existingItem = await prisma.cartItem.findUnique({
		where: {
			cartId_productId_size: {
				cartId: cart.id,
				productId,
				size,
			},
		},
	});

	if (existingItem) {
		// Если есть - увеличиваем количество
		await prisma.cartItem.update({
			where: { id: existingItem.id },
			data: { quantity: existingItem.quantity + 1 },
		});
	} else {
		// Если нет - создаем запись
		await prisma.cartItem.create({
			data: {
				cartId: cart.id,
				productId,
				size,
				quantity: 1,
			},
		});
	}

	revalidatePath("/cart");
}
