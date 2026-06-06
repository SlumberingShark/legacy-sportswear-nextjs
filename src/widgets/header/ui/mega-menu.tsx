import Link from "next/link";
import { MegaMenuConfig } from "../model/menuData";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  config: MegaMenuConfig | null;
}

export const MegaMenu = ({ isOpen, onClose, config }: MegaMenuProps) => {
  if (!isOpen || !config) return null;

  return (
    <div
      // pt-6 создает невидимую область, чтобы курсор не "терял" меню при переходе
      className="absolute left-0 right-0 top-full pt-6 animate-in slide-in-from-top-5 duration-200"
      onMouseLeave={onClose}
    >
      <div className="bg-white shadow-2xl border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-12 py-10">
          <div className="flex gap-16">
            
            {/* Ссылки категорий */}
            <div className="flex gap-16 flex-1 flex-wrap">
              {config.sections.map((section, idx) => (
                <div key={idx} className="min-w-[180px]">
                  <h3 className="text-xs uppercase tracking-widest mb-4 opacity-60 font-semibold text-black">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link 
                          href={link.href} 
                          className="text-sm text-gray-900 hover:opacity-60 transition-opacity block py-0.5" 
                          onClick={onClose}
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Промо-баннер */}
            <div className="w-[400px] shrink-0">
              <div className="relative h-[280px] overflow-hidden rounded-lg bg-gray-100">
                {/* Здесь в будущем будет Image из next/image */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                  <h4 className="text-white text-xl mb-1 font-medium">{config.promo.title}</h4>
                  <p className="text-white/80 text-sm">{config.promo.description}</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};