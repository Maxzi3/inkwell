import { FiSearch, FiX } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import type { ChangeEvent } from "react";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm: string = searchParams.get("search") || "";

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    searchParams.set("search", e.target.value);
    setSearchParams(searchParams);
  };

  const clearSearch = () => {
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
    <FiSearch className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:scale-110 transition-transform" />
      <input
        className="border border-gray-300 dark:border-gray-600 bg-[#e7edf4] dark:bg-[#223649] text-[#0d141c] dark:text-white  md:px-4  focus:ring-blue-500 transition-all duration-300 placeholder:text-[#49739c] dark:placeholder:text-[#90aecb] flex w-11/12 mx-auto my-4 py-3 pl-10   overflow-hidden rounded-lg  focus:outline-0 focus:ring-0 border-none  focus:border-none h-full  px-4 text-base font-normal leading-normal "
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
};

export default Search;
