"use server";

import { prisma } from "@/prisma/prisma.client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// Вспомогательная функция
async function getUserId() {
  const cookieStore = await cookies();
  return cookieStore.get("session_id")?.value;
}

// ДОБАВЛЕНИЕ
export async function addToCartAction(productId: string, size: string, p0: string) {
  const userId = await getUserId();
  if (!userId) return { error: "Не авторизован" };

  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) cart = await prisma.cart.create({ data: { userId } });

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId, size },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + 1 },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, size, quantity: 1 },
    });
  }
  revalidatePath("/cart");
  return { success: true };
}

// ОБНОВЛЕНИЕ
export async function updateQuantityAction(itemId: string, quantity: number) {
  if (quantity < 1) return;
  await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });
  revalidatePath("/cart");
}

// УДАЛЕНИЕ
export async function removeItemAction(itemId: string) {
  await prisma.cartItem.delete({
    where: { id: itemId },
  });
  revalidatePath("/cart");
}