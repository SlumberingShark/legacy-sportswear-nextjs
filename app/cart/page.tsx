import { prisma } from "../../prisma/prisma.client";
import CartClient from "@/src/pages/cart/ui/cart";
import { cookies } from "next/headers";

export default async function CartPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_id")?.value;

  if (!userId) {
    return <CartClient initialCart={{ items: [] }} />;
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  return <CartClient initialCart={cart || { items: [] }} />;
}