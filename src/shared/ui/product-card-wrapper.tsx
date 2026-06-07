"use client";

import { ProductCard } from "@/src/entities/product";
import { addToCartAction } from "@/src/features/cart/model/add-to-cart";

export function ProductCardWrapper({ product }: { product: any }) {
  const handleAddToCart = async () => {
    // Временно хардкодим userId, пока нет системы авторизации
    await addToCartAction("id-текущего-пользователя", product.id, "S");
    alert('Товар добавлен в корзину');
  };

  return <ProductCard product={product} onAddToCart={handleAddToCart} />;
}