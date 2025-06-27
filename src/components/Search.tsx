import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useDebounce } from "../hooks/useDebounce";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);

  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset page on search
    setSearchParams(params);
  }, [debouncedSearch]);

  return (
    <div className="relative w-full max-w-[500px] mx-auto lg:mb-0 mb-4">
      <FiSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400 hover:scale-110 transition-transform" />
      <input
        className="border-none border-text-primary bg-input focus:ring-blue-500 transition-all duration-300 placeholder:text-text-primary flex w-11/12 mx-auto py-3 pl-[40px] overflow-hidden rounded-lg focus:outline-0 focus:ring-0 h-full  text-base font-normal leading-normal"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
};

export default Search;
