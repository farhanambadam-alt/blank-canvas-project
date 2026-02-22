import type { Category } from '@/types/salon';

interface CategoryChipsProps {
  categories: Category[];
  selected: string | null;
  onSelect: (id: string) => void;
}

const CategoryChips = ({ categories, selected, onSelect }: CategoryChipsProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto px-4 py-2 scrollbar-hide snap-x snap-mandatory">
      {categories.map((cat) => {
        const isActive = selected === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 snap-center"
          >
            <div
              className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                isActive
                  ? 'border-primary scale-110 shadow-md'
                  : 'border-transparent'
              }`}
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <span className={`text-[11px] font-body font-medium whitespace-nowrap ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {cat.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryChips;
