"use server";
import { prisma } from "../../../../prisma/prisma.client";
import { revalidatePath } from "next/cache";

export async function updateQuantityAction(itemId: string, quantity: number) {
	if (quantity < 1) return;

	await prisma.cartItem.update({
		where: { id: itemId },
		data: { quantity },
	});

	revalidatePath("/cart");
}

export async function removeItemAction(itemId: string) {
	await prisma.cartItem.delete({
		where: { id: itemId },
	});

	revalidatePath("/cart");
}
