import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-black text-white py-20 mt-32 w-full border-t border-zinc-900">
			<div className="px-12">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 mb-16">
					{/* Блок 1 */}
					<div>
						<h3 className="text-xs uppercase tracking-widest mb-6 opacity-50 font-semibold">Поддержка</h3>
						<ul className="space-y-3">
							<li>
								<Link href="/support/contacts" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
									Связаться с нами
								</Link>
							</li>
							<li>
								<Link href="/support/delivery" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
									Доставка
								</Link>
							</li>
							<li>
								<Link href="/support/returns" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
									Возврат
								</Link>
							</li>
							<li>
								<Link href="/support/faq" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
									FAQ
								</Link>
							</li>
						</ul>
					</div>

					{/* Блок 2 */}
					<div>
						<h3 className="text-xs uppercase tracking-widest mb-6 opacity-50 font-semibold">Компания</h3>
						<ul className="space-y-3">
							<li>
								<Link href="/about" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
									О нас
								</Link>
							</li>
							<li>
								<Link href="/careers" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
									Карьера
								</Link>
							</li>
							<li>
								<Link href="/sustainability" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
									Устойчивое развитие
								</Link>
							</li>
						</ul>
					</div>

					{/* Блок 3 */}
					<div>
						<h3 className="text-xs uppercase tracking-widest mb-6 opacity-50 font-semibold">Правовая информация</h3>
						<ul className="space-y-3">
							<li>
								<Link href="/legal/privacy" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
									Конфиденциальность
								</Link>
							</li>
							<li>
								<Link href="/legal/terms" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
									Условия
								</Link>
							</li>
						</ul>
					</div>

					{/* Блок 4 - Связь измененная на почту */}
					<div>
						<h3 className="text-xs uppercase tracking-widest mb-6 opacity-50 font-semibold">Связь</h3>
						<ul className="space-y-3">
							<li className="flex flex-col gap-1">
								<span className="text-xs opacity-40 uppercase tracking-wide">Email для связи:</span>
								<a
									href="mailto:legacy-shop@gmail.com"
									className="text-sm opacity-80 hover:opacity-100 hover:underline underline-offset-4 transition-all tracking-wide font-medium"
								>
									legacy-shop@gmail.com
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Копирайт */}
				<div className="border-t border-zinc-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
					<p className="text-xs opacity-40">© 2026 Legacy. Все права защищены.</p>
					<p className="text-[10px] tracking-widest opacity-20 uppercase font-bold">Heavy Duty Gear</p>
				</div>
			</div>
		</footer>
	);
}
