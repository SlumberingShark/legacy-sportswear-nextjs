import Link from "next/link";

// 1. Создаем чистый интерфейс для динамического конфига
export interface DynamicMegaMenuConfig {
	sections: Array<{
		title: string;
		links: Array<{ title: string; href: string }>;
	}>;
}

interface MegaMenuProps {
	isOpen: boolean;
	onClose: () => void;
	config: DynamicMegaMenuConfig | null; // Используем наш новый тип
}

export const MegaMenu = ({ isOpen, onClose, config }: MegaMenuProps) => {
	if (!isOpen || !config) return null;

	return (
		<div
			className="absolute left-0 w-full top-full bg-white shadow-2xl border-t border-gray-100 animate-in slide-in-from-top-2 duration-200 z-40"
			onMouseLeave={onClose}
		>
			<div className="max-w-7xl mx-auto px-12 py-10">
				<div className="flex gap-16">
					{/* Ссылки категорий */}
					<div className="flex gap-16 flex-1 flex-wrap">
						{config.sections.map((section, idx) => (
							<div key={idx} className="min-w-[180px]">
								<h3 className="text-xs uppercase tracking-widest mb-4 opacity-60 font-semibold text-black">{section.title}</h3>
								<ul className="space-y-2">
									{section.links.map((link, linkIdx) => (
										<li key={linkIdx}>
											<Link href={link.href} className="text-sm text-gray-900 hover:opacity-60 transition-opacity block py-0.5" onClick={onClose}>
												{link.title}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
