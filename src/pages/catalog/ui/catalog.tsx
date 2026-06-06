import { notFound } from "next/navigation";
import { MOCK_PRODUCTS } from "@/src/entities/product/model/mockData";
import { ProductGrid } from "@/src/widgets/product-grid";

// 1. Четко прописываем интерфейс, который принимает category
interface CategoryProps {
	category: string;
}

const CATEGORY_TITLES: Record<string, string> = {
	men: "Мужчинам",
	women: "Женщинам",
};

// 2. Указываем этот интерфейс в аргументах функции компонента
export default function Category({ category }: CategoryProps) {
	if (!CATEGORY_TITLES[category]) {
		notFound();
	}

	const filteredProducts = MOCK_PRODUCTS.filter((product) => product.gender === category);

	return (
		<div className="bg-white min-h-screen text-black py-12">
			<div className="max-w-7xl mx-auto px-6 md:px-12">
				<div className="mb-8">
					<h1 className="text-3xl sm:text-4xl font-normal tracking-tight">{CATEGORY_TITLES[category]}</h1>
				</div>
				<ProductGrid initialProducts={filteredProducts} />
			</div>
		</div>
	);
}
