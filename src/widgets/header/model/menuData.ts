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
  promo: MenuPromo;
}

export const menuConfigs: Record<'men' | 'women', MegaMenuConfig> = {
  men: {
    sections: [
      {
        title: 'Верх',
        links: [
          { title: 'Рашгарды', href: '/catalog/men/rashguards' },
          { title: 'Компрессионные футболки', href: '/catalog/men/compression' },
          { title: 'Оверсайз футболки', href: '/catalog/men/oversize-tshirts' },
          { title: 'Майки / Стрингеры', href: '/catalog/men/tanks' },
          { title: 'Худи и свитшоты', href: '/catalog/men/hoodies' },
        ],
      },
      {
        title: 'Низ',
        links: [
          { title: 'Широкие штаны', href: '/catalog/men/wide-pants' },
          { title: 'Джоггеры', href: '/catalog/men/joggers' },
          { title: 'Компрессионные штаны / Тайтсы', href: '/catalog/men/compression-pants' },
          { title: 'Шорты для тренировок', href: '/catalog/men/shorts' },
        ],
      },
    ],
    promo: {
      title: 'Heavy Duty',
      description: 'Экипировка, созданная для экстремальных нагрузок и новых отказов.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    },
  },
  women: {
    sections: [
      {
        title: 'Верх',
        links: [
          { title: 'Рашгарды', href: '/catalog/women/rashguards' },
          { title: 'Спортивные бра / Топы', href: '/catalog/women/bras' },
          { title: 'Оверсайз футболки', href: '/catalog/women/oversize-tshirts' },
          { title: 'Лонгсливы', href: '/catalog/women/longsleeves' },
        ],
      },
      {
        title: 'Низ',
        links: [
          { title: 'Тайтсы / Легинсы', href: '/catalog/women/leggings' },
          { title: 'Широкие штаны', href: '/catalog/women/wide-pants' },
          { title: 'Спортивные шорты', href: '/catalog/women/shorts' },
        ],
      },
    ],
    promo: {
      title: 'Iron Grace',
      description: 'Идеальная посадка, подчеркивающая форму. Компрессия и поддержка.',
      image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&h=600&fit=crop',
    },
  },
};