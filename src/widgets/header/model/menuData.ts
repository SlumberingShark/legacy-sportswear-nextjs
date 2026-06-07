export interface MenuLink {
	title: string;
	href: string;
}

export interface MenuSection {
	title: string;
	links: MenuLink[];
}

export interface MenuPromo {
	title: string;
	description: string;
	image: string;
}

export interface MegaMenuConfig {
	sections: MenuSection[];
}

export const menuConfigs: Record<"men" | "women", MegaMenuConfig> = {
	men: {
		sections: [
			{
				title: "Верх",
				links: [
					{ title: "Рашгарды", href: "/catalog/men/rashguards" },
					{ title: "Компрессионные футболки", href: "/catalog/men/compression" },
					{ title: "Оверсайз футболки", href: "/catalog/men/oversize-tshirts" },
					{ title: "Майки / Стрингеры", href: "/catalog/men/tanks" },
					{ title: "Худи и свитшоты", href: "/catalog/men/hoodies" },
				],
			},
			{
				title: "Низ",
				links: [
					{ title: "Широкие штаны", href: "/catalog/men/wide-pants" },
					{ title: "Джоггеры", href: "/catalog/men/joggers" },
					{ title: "Компрессионные штаны / Тайтсы", href: "/catalog/men/compression-pants" },
					{ title: "Шорты для тренировок", href: "/catalog/men/shorts" },
				],
			},
		],
	},
	women: {
		sections: [
			{
				title: "Верх",
				links: [
					{ title: "Рашгарды", href: "/catalog/women/rashguards" },
					{ title: "Спортивные бра / Топы", href: "/catalog/women/bras" },
					{ title: "Оверсайз футболки", href: "/catalog/women/oversize-tshirts" },
					{ title: "Лонгсливы", href: "/catalog/women/longsleeves" },
				],
			},
			{
				title: "Низ",
				links: [
					{ title: "Тайтсы / Легинсы", href: "/catalog/women/leggings" },
					{ title: "Широкие штаны", href: "/catalog/women/wide-pants" },
					{ title: "Спортивные шорты", href: "/catalog/women/shorts" },
				],
			},
		],
	},
};
