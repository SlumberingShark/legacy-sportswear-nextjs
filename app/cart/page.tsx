import { prisma } from "../../prisma/prisma.client";
import CartClient from "@/src/pages/cart/ui/cart";

export default async function CartPage() {

	const userId = "id-текущего-пользователя";

	const cart = await prisma.cart.findUnique({
		where: { userId },
		include: {
			items: {
				include: { product: true },
			},
		},
	});

	return <CartClient initialCart={cart} />;
}
