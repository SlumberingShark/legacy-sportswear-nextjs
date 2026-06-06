import { Product } from '@/src/entities/product';

export type SortOption = 'new' | 'price-low' | 'price-high' | 'popular';

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'new':
    case 'popular':
    default:
      return sorted;
  }
}