import { useSearchParams } from 'react-router-dom';
import Search from './Search'
import type { ChangeEvent } from "react";


const NavBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const filterValue = searchParams.get("category") || "all";

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
      searchParams.set("category", e.target.value);
      setSearchParams(searchParams);
    };
  return (
    <div>
          {/* Category Filter */}
          <select
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ml-10"
              value={filterValue}
              onChange={handleFilterChange}
            >
              <option value="all">All </option>
              <option value="jerseys">Technology</option>
              <option value="watches">Travel</option>
              <option value="shoes">Food</option>
              <option value="Lifestyle">LifeStyle</option>
            </select>
            {/* Search Input */}
            <Search/> 

            <div></div>
    </div>
  )
}

export default NavBar