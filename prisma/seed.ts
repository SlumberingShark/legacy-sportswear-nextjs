import "dotenv/config";

import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
	adapter,
});

async function main() {
	await prisma.cartItem.deleteMany();
	await prisma.orderItem.deleteMany();
	await prisma.order.deleteMany();
	await prisma.product.deleteMany();
	await prisma.category.deleteMany();

	console.log("Старые данные очищены. Начинаем заполнение базы...");

	// =========================
	// MEN CATEGORIES
	// =========================

	const menCompression = await prisma.category.create({
		data: { name: "Компрессионные футболки", slug: "compression-tshirts", gender: "men" },
	});

	const menTshirts = await prisma.category.create({
		data: { name: "Футболки", slug: "tshirts", gender: "men" },
	});

	const menHoodies = await prisma.category.create({
		data: { name: "Худи", slug: "hoodies", gender: "men" },
	});

	const menLongsleeves = await prisma.category.create({
		data: { name: "Лонгсливы", slug: "longsleeves", gender: "men" },
	});

	const menPants = await prisma.category.create({
		data: { name: "Спортивные штаны", slug: "pants", gender: "men" },
	});

	// =========================
	// WOMEN CATEGORIES
	// =========================

	const womenTshirts = await prisma.category.create({
		data: { name: "Футболки", slug: "tshirts", gender: "women" },
	});

	const womenHoodies = await prisma.category.create({
		data: { name: "Худи", slug: "hoodies", gender: "women" },
	});

	const womenPants = await prisma.category.create({
		data: { name: "Спортивные штаны", slug: "pants", gender: "women" },
	});

	// =========================
	// PRODUCTS
	// =========================

	await prisma.product.createMany({
		data: [
			{
				name: "Рашгард SUPERVILLAIN",
				price: 2490,
				sizes: ["S", "M", "L", "XL", "XXL"],
				imageUrl: "https://optim.tildacdn.com/stor3439-6534-4266-b730-386537633238/-/resize/800x1000/-/format/webp/41162351.jpg.webp",
				gender: "men",
				categoryId: menCompression.id,
			},
			{
				name: "Рашгард SUPERVILLAIN Gray",
				price: 2490,
				sizes: ["S", "M", "L", "XL", "XXL"],
				imageUrl: "https://optim.tildacdn.com/stor3838-3237-4262-a662-373830363936/-/format/webp/16683638.jpg.webp",
				gender: "men",
				categoryId: menCompression.id,
			},
			{
				name: "Рашгард SUPERVILLAIN Toxic",
				price: 2490,
				sizes: ["S", "M", "L", "XL", "XXL"],
				imageUrl: "https://optim.tildacdn.com/stor3531-3736-4566-a432-333731336238/-/resize/800x1000/-/format/webp/26787155.jpg.webp",
				gender: "men",
				categoryId: menCompression.id,
			},
			{
				name: "Футболка STORM",
				price: 2990,
				sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
				imageUrl: "https://optim.tildacdn.com/stor6163-3638-4233-b832-343164333237/-/resize/800x1000/-/format/webp/90670385.jpg.webp",
				gender: "men",
				categoryId: menTshirts.id,
			},
			{
				name: "Футболка DARK PINK",
				price: 2990,
				sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
				imageUrl: "https://optim.tildacdn.com/stor3436-6266-4338-a133-663164646562/-/resize/800x1000/-/format/webp/38347360.jpg.webp",
				gender: "men",
				categoryId: menTshirts.id,
			},
			{
				name: "Футболка POWERLIFTERS WHITE",
				price: 2990,
				sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"],
				imageUrl: "https://optim.tildacdn.com/stor3931-6265-4662-b438-653436306263/-/resize/800x1000/-/format/webp/48551221.jpg.webp",
				gender: "men",
				categoryId: menTshirts.id,
			},
			{
				name: "Зип-Худи SKULL",
				price: 4990,
				sizes: ["S", "M", "L", "XL", "XXL"],
				imageUrl: "https://optim.tildacdn.com/stor3463-3130-4264-b865-323832363965/-/resize/800x1000/-/format/webp/56163863.jpg.webp",
				gender: "men",
				categoryId: menHoodies.id,
			},
			{
				name: "Зип-Худи POWERLIFTERS WHITE",
				price: 4990,
				sizes: ["S", "M", "L", "XL", "XXL"],
				imageUrl: "https://optim.tildacdn.com/stor6138-6364-4236-b639-643330376463/-/format/webp/60531753.jpg.webp",
				gender: "men",
				categoryId: menHoodies.id,
			},
			{
				name: "Худи LOGM PINK",
				price: 4990,
				sizes: ["S", "M", "L", "XL", "XXL"],
				imageUrl: "https://optim.tildacdn.com/stor3966-6639-4166-b565-643165303934/-/resize/800x1000/-/format/webp/74687234.jpg.webp",
				gender: "men",
				categoryId: menHoodies.id,
			},
			{
				name: "Лонгслив TRAINING",
				price: 2290,
				sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL"],
				imageUrl: "https://optim.tildacdn.com/stor6661-6265-4636-a434-316331396262/-/resize/800x1000/-/format/webp/35976340.jpg.webp",
				gender: "men",
				categoryId: menLongsleeves.id,
			},
			{
				name: "Штаны WIDE",
				price: 4290,
				sizes: ["S", "M", "L", "XL", "XXL"],
				imageUrl: "https://optim.tildacdn.com/stor6238-3665-4234-a261-393063393861/-/resize/800x1000/-/format/webp/71230750.jpg.webp",
				gender: "men",
				categoryId: menPants.id,
			},
			{
				name: "Футболка GYM GIRLS BLACK",
				price: 2990,
				sizes: ["XS", "S", "M", "L", "XL", "XXL"],
				imageUrl: "https://optim.tildacdn.com/stor6238-3635-4639-b138-376464313535/-/resize/800x1000/-/format/webp/21499122.jpg.webp",
				gender: "women",
				categoryId: womenTshirts.id,
			},
			{
				name: "Футболка CONNECTION BLUE",
				price: 2990,
				sizes: ["XS", "S", "M", "L", "XL", "XXL"],
				imageUrl: "https://optim.tildacdn.com/stor6339-3361-4561-a364-396130393461/-/resize/800x1000/-/format/webp/89198107.jpg.webp",
				gender: "women",
				categoryId: womenTshirts.id,
			},
			{
				name: "Zip-худи Therapy B",
				price: 6990,
				sizes: ["M", "L"],
				imageUrl: "https://static.tildacdn.com/stor3031-3961-4939-b839-353338616136/787b87d3af5714bf5bf5dd56ff1d7820.png",
				gender: "women",
				categoryId: womenHoodies.id,
			},
			{
				name: "Штаны WIDE WOMEN",
				price: 4290,
				sizes: ["S", "M", "L", "XL", "XXL"],
				imageUrl: "https://optim.tildacdn.com/stor6236-6231-4036-b431-343266366631/-/resize/800x1000/-/format/webp/97931603.jpg.webp",
				gender: "women",
				categoryId: womenPants.id,
			},
			{
				name: "Футболка Therapy R Белая",
				price: 3190,
				sizes: ["M", "L", "XL"],
				imageUrl: "https://static.tildacdn.com/stor6432-3166-4065-b838-616637383834/144f103374f8d400fbf34dcbbb85b1b7.jpg",
				gender: "women",
				categoryId: womenTshirts.id,
			},
			{
				name: "Zip-худи Monuments’s",
				price: 6990,
				sizes: ["M", "L"],
				imageUrl: "https://static.tildacdn.com/stor3162-3732-4435-b632-663964646634/132610108bdf6c8a730c4603e1eb208a.png",
				gender: "men",
				categoryId: menHoodies.id,
			},
			{
				name: "Футболка GAINS",
				price: 2990,
				sizes: ["XS", "S", "M", "L"],
				imageUrl: "https://optim.tildacdn.com/stor3231-3965-4139-a331-643666623931/-/resize/1000x1400/-/format/webp/44225684.jpg.webp",
				gender: "women",
				categoryId: womenTshirts.id,
			},
		],
	});

	console.log("База данных успешно заполнена 🔥");
}

main()
	.catch((e) => {
		console.error("Ошибка seed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
