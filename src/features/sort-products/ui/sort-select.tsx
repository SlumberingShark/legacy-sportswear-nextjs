'use client';

import { SortOption } from '../lib/sortUtils';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Сортировка:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="px-3 py-1.5 bg-white border border-zinc-200 rounded-md text-xs font-normal tracking-wide text-black focus:outline-none focus:border-black transition-colors cursor-pointer"
      >
        <option value="new">Новинки</option>
        <option value="price-low">Цена: по возрастанию</option>
        <option value="price-high">Цена: по убыванию</option>
        <option value="popular">Популярные</option>
      </select>
    </div>
  );
}