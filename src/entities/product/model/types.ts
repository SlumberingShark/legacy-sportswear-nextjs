export interface Product {
	id: string; // пригодится для Prisma в будущем
	name: string;
	price: number; // в копейках или рублях (в зависимости от бэкенда)
	fabric?: string;
	colors: string[];
	image: string;
	gender: "men" | "women";
	inStock?: boolean;
}
