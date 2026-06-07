import { prisma } from "../../../prisma/prisma.client";
import { ProductCard } from "@/src/entities/product";
import { addToCartAction } from "@/src/features/cart/model/add-to-cart";

type Params = Promise<{ category: string }>;

export default async function CategoryPage({ params }: { params: Params }) {
  const { category } = await params;

  const categories = await prisma.category.findMany({
    where: { gender: category },
    include: { products: true },
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold uppercase tracking-wider mb-12">{category === "men" ? "Мужская коллекция" : "Женская коллекция"}</h1>

      {categories.map((cat) => (
        <div key={cat.id} className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">{cat.name}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {cat.products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  image: product.imageUrl,
                  colors: [],
                  fabric: "",
                  inStock: true,
                  gender: product.gender as "men" | "women",
                }}
                onAddToCart={async () => {
                  "use server";
                  await addToCartAction("user-id", product.id, "S");
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}