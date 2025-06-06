import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface Props {
  categories: string[];
  onSearch: (value: string) => void;
  onCategoryChange: (category: string) => void;
  activeCategory: string;
  searchValue: string;
}

export default function SearchAndFilterBar({
  categories,
  onSearch,
  onCategoryChange,
  activeCategory,
  searchValue,
}: Props) {
  const [search, setSearch] = useState(searchValue);

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };
  return (
    <div className="mb-6 space-y-4">
      {/* Search */}
      <div className="relative w-full max-w-[500px] mx-auto">
        <FiSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:scale-110 transition-transform" />
        <input
          className="border-none border-text-primary bg-input focus:ring-blue-500 transition-all duration-300 placeholder:text-text-primary flex w-11/12 mx-auto py-3 pl-[40px] overflow-hidden rounded-lg focus:outline-0 focus:ring-0 h-full  text-base font-normal leading-normal"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleChange}
        />
        {searchValue && (
          <button
            onClick={() => onSearch("")}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
          >
            <FiX size={18} />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto gap-2 hide-scrollbar">
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
