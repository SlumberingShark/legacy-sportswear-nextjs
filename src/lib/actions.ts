import type { Product, Category } from '../generated/prisma'; 
import { prisma } from '../../prisma/prisma.client';

export async function getProductsByCategory(gender: 'men' | 'women', categorySlug: string): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: {
          gender: gender,
          slug: categorySlug,
        },
      },
    });
    return products;
  } catch (error) {
    console.error('Ошибка при получении товаров:', error);
    return [];
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    return categories as Category[];
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    return [];
  }
}