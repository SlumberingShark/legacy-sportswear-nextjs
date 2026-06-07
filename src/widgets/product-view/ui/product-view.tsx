// src/widgets/product/ProductView.tsx
import { ImageWithFallback } from "@/src/shared/ui/ImageWithFallback";

export function ProductView({ product }: { product: any }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 mt-6 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Левая часть: Галерея */}
      <div className="bg-zinc-100 rounded-2xl overflow-hidden aspect-[3/4]">
        <ImageWithFallback src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Правая часть: Описание */}
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold uppercase">{product.name}</h1>
        <p className="text-2xl font-semibold">{product.price.toLocaleString("ru-RU")} ₽</p>
        
        {/* Выбор размера */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Размер</h3>
          <div className="flex gap-2">
            {["XS", "S", "M", "L", "XL"].map(size => (
              <button key={size} className="border border-zinc-200 py-2 px-4 hover:border-black transition-colors">{size}</button>
            ))}
          </div>
        </div>

        <button className="bg-black text-white py-4 uppercase font-medium hover:bg-zinc-800">
          Добавить в корзину
        </button>

        {/* Доп. инфо */}
        <div className="text-sm text-zinc-500 space-y-2 mt-4">
          <p>Материал: 100% хлопок</p>
          <p>Плотность: 240 г/м²</p>
        </div>
      </div>
    </div>
  );
}