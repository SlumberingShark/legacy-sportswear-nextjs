import Link from "next/link";
import { Button } from "@/src/shared/ui/button";
import { Card } from "@/src/shared/ui/card";

import { ImageWithFallback } from "@/src/shared/ui/ImageWithFallback";

export default function Home() {
	return (
    // Принудительно задаем белый фон для всей страницы
    <div className="bg-white text-black min-h-screen animate-in fade-in duration-500">
      
      {/* 1. Hero Banner */}
      <section className="relative h-[75vh] bg-black overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1609377375722-46264cf88939?w=2400&h=1600&fit=crop"
          alt="Hero Banner"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-4xl">
            {/* Уменьшили размер, сделали текст плотнее по высоте — точно как на скрине */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight mb-8 leading-[1.15]">
              Больше пространства <br /> для движения
            </h1>
            
            <Button 
              asChild 
              size="lg" 
              className="font-normal tracking-wide px-12 py-6 bg-black text-white hover:bg-zinc-900 border border-zinc-800 rounded-lg text-sm transition-colors"
            >
              <Link href="/catalog">
                В каталог
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Category Cards */}
      <section className="py-20 max-w-7xl mx-auto px-6 bg-white">
        <div className="mb-10">
          {/* Исправленный заголовок: чистый, аккуратный, без капса */}
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-black">
            Категории
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Мужская категория */}
          <Link href="/catalog/men" className="group block">
            <Card className="relative h-[420px] overflow-hidden border-none shadow-none rounded-xl bg-zinc-100">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1554139844-af2fc8ad3a3a?w=1000&h=800&fit=crop"
                alt="Мужчинам"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              {/* Плавный мягкий градиент внизу */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end">
                <div className="p-8 w-full flex flex-col justify-end items-start gap-4">
                  <h3 className="text-white text-3xl font-normal tracking-wide">
                    Мужчинам
                  </h3>
                  {/* Белая прямоугольная кнопка со скруглением rounded-lg */}
                  <span className="inline-block bg-white text-black text-sm px-6 py-3 rounded-lg font-normal hover:bg-gray-100 transition-colors">
                    Смотреть
                  </span>
                </div>
              </div>
            </Card>
          </Link>

          {/* Женская категория */}
          <Link href="/catalog/women" className="group block">
            <Card className="relative h-[420px] overflow-hidden border-none shadow-none rounded-xl bg-zinc-100">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1547852356-b20668106c51?w=1000&h=800&fit=crop"
                alt="Женщинам"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end">
                <div className="p-8 w-full flex flex-col justify-end items-start gap-4">
                  <h3 className="text-white text-3xl font-normal tracking-wide">
                    Женщинам
                  </h3>
                  <span className="inline-block bg-white text-black text-sm px-6 py-3 rounded-lg font-normal hover:bg-gray-100 transition-colors">
                    Смотреть
                  </span>
                </div>
              </div>
            </Card>
          </Link>

        </div>
      </section>

      {/* 3. Promotional Banner */}
      <section className="relative h-[55vh] bg-black overflow-hidden my-12">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1486739985386-d4fae04ca6f7?w=2400&h=1200&fit=crop"
          alt="Промо"
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight mb-8">
              Коллекция Performance
            </h2>
            <Button 
              asChild 
              size="lg"
              className="font-normal tracking-wide px-10 py-6 bg-black text-white hover:bg-zinc-900 border border-zinc-800 rounded-lg text-sm transition-colors"
            >
              <Link href="/catalog">
                Смотреть коллекцию
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
