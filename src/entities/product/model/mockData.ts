import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  // === МУЖСКАЯ КОЛЛЕКЦИЯ ===
  {
    id: "men_pants_1",
    name: "ABC Classic-Fit брюки",
    price: 980000, // 9800 ₽
    fabric: "Warpstreme™ — Эластичный нейлон",
    colors: ['#1a1a1a', '#2c3e50', '#34495e', '#7f8c8d'],
    image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=600&h=900&fit=crop',
    gender: 'men',
    inStock: true
  },
  {
    id: "men_pants_2",
    name: "Commission Slim брюки",
    price: 850000, // 8500 ₽
    fabric: "Canvas — Сверхпрочный хлопок",
    colors: ['#000000', '#8b4513', '#556b2f'],
    image: 'https://images.unsplash.com/flagged/photo-1556746834-1cb5b8fabd54?w=600&h=900&fit=crop',
    gender: 'men',
    inStock: true
  },
  {
    id: "men_pants_3",
    name: "Surge Hybrid брюки",
    price: 790000, // 7900 ₽
    fabric: "Swift™ — Влагоотводящий материал",
    colors: ['#000000', '#1a1a1a', '#4a5568'],
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=900&fit=crop',
    gender: 'men',
    inStock: true
  },
  {
    id: "men_joggers_1",
    name: "City Sweat Jogger",
    price: 690000, // 6900 ₽
    fabric: "French Terry — Мягкий трикотаж",
    colors: ['#1a1a1a', '#708090', '#a9a9a9'],
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=900&fit=crop',
    gender: 'men',
    inStock: true
  },
  {
    id: "men_shorts_1",
    name: "Pace Breaker Linerless шорты",
    price: 480000, // 4800 ₽
    fabric: "Recycled Polyester — Легкая сетка",
    colors: ['#000000', '#2d3748', '#1a202c'],
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=900&fit=crop',
    gender: 'men',
    inStock: true
  },

  // === ЖЕНСКАЯ КОЛЛЕКЦИЯ ===
  {
    id: "women_leggings_1",
    name: "Align High-Rise леггинсы",
    price: 890000, // 8900 ₽
    fabric: "Nulu™ — Эффект второй кожи",
    colors: ['#000000', '#2d3748', '#4a5568', '#800020'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=900&fit=crop',
    gender: 'women',
    inStock: true
  },
  {
    id: "women_top_1",
    name: "Wunder Train спортивный бра",
    price: 420000, // 4200 ₽
    fabric: "Everlux™ — Быстросохнущий компрессионный материал",
    colors: ['#1a1a1a', '#708090', '#e5e7eb'],
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&h=900&fit=crop',
    gender: 'women',
    inStock: true
  },
  {
    id: "women_hoodie_1",
    name: "Scuba Oversized худи",
    price: 1150000, // 11500 ₽
    fabric: "Cotton Fleece — Плотный флис с начесом",
    colors: ['#000000', '#a9a9a9', '#f3f4f6'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=900&fit=crop',
    gender: 'women',
    inStock: true
  },
  {
    id: "women_shorts_1",
    name: "Track That High-Rise шорты",
    price: 520000, // 5200 ₽
    fabric: "Lightweight Woven — Ветрозащитная ткань",
    colors: ['#000000', '#2c3e50'],
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=900&fit=crop',
    gender: 'women',
    inStock: true
  },
  {
    id: "women_pants_1",
    name: "Groove Super High-Rise брюки клеш",
    price: 920000, // 9200 ₽
    fabric: "Nulu™ — Премиальный трикотаж",
    colors: ['#1a1a1a', '#2d3748'],
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=900&fit=crop',
    gender: 'women',
    inStock: false // Для проверки плашки "Нет в наличии"
  }
];