import { notFound } from 'next/navigation';
import { getProductsByCategory } from '@/src/lib/actions';

interface CatalogPageProps {
  params: Promise<{
    category: string;    // Сюда прилетит 'men' или 'women'
    subCategory: string; // Сюда прилетит например 'tshirts', 'hoodies', 'compression-tshirts'
  }>;
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  // В Next.js 15+ params — это Promise, поэтому обязательно делаем await
  const { category, subCategory } = await params;

  // Проверяем корректность гендера, чтобы не слать кривые запросы в базу
  if (category !== 'men' && category !== 'women') {
    notFound();
  }

  // Стучимся в базу за реальным шмотом
  const products = await getProductsByCategory(category, subCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold uppercase mb-8">
        {category === 'men' ? 'Мужские' : 'Женские'} — {subCategory}
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500 text-lg">В этой категории товаров пока нет 😔</p>
      ) : (
        // Твоя сетка товаров (Grid), которая раньше рендерила хардкод
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg flex flex-col justify-between">
              {/* Картинка с Тильды */}
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-80 object-cover rounded-md mb-4"
              />
              
              <div>
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-xl font-bold mb-3">{product.price} ₽</p>
                
                {/* Доступные размеры */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {product.sizes.map((size) => (
                    <span key={size} className="border px-2 py-1 text-xs rounded bg-gray-100">
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full bg-black text-white py-2 rounded uppercase font-semibold text-sm hover:bg-gray-800 transition">
                В корзину
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}