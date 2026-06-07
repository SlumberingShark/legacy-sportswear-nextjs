import { prisma } from "@/prisma/prisma.client";
import { notFound } from "next/navigation";
import { ProductView } from "@/src/widgets/product-view/ui/product-view";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const product = await prisma.product.findUnique({
		where: { id },
	});

	if (!product) {
		notFound();
	}

	return <ProductView product={product} />;
}
