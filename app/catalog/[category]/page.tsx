import Category from "@/src/pages/catalog/ui/catalog";

// Оставляем тип, но теперь params будет Promise
interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function CatalogPage({ params }: PageProps) {
  // Разворачиваем Promise с помощью await
  const resolvedParams = await params;
  
  // Передаем уже готовую строку category в компонент
  return <Category category={resolvedParams.category} />;
}