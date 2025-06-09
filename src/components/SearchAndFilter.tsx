import clsx from "clsx";

interface Props {
  categories: string[];
  onCategoryChange: (category: string) => void;
  activeCategory: string;
}

export default function SearchAndFilterBar({
  categories,
  onCategoryChange,
  activeCategory,
}: Props) {
  return (
    <div className="mb-6 space-y-4 ">
      {/* Categories */}
      <div className="flex overflow-auto scrollbar-hide gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={clsx(
              "px-4 py-1 rounded-full text-sm whitespace-nowrap capitalize",
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
