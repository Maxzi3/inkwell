import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import SearchAndFilterBar from "../../components/SearchAndFilter";
import NotificationPage from "../../pages/NotificationPage";
import Spinner from "../../ui/Spinner";
import type { Post } from "../../ui/types";
import PostCard from "./PostCard";
import { useGetPosts } from "./useGetPosts";

const categories = ["All", "technology", "business", "design", "lifestyle"];

const AllPosts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "All";
  const page = parseInt(searchParams.get("page") || "1", 10);

  // Query based on URL
  const {
    data: postsData,
    isPending,
    isError,
  } = useGetPosts({
    search: searchParams.get("search") || "",
    category: category === "All" ? undefined : category,
    page,
  });

  const posts: Post[] = postsData?.data || [];
  const totalPages = postsData?.totalPages || 1;
 
  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", newCategory);
    params.set("page", "1");
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  if (isError) {
    return (
      <p className="text-center text-red-500 font-medium">
        Failed to load posts.
      </p>
    );
  }

  return (
    <div className="px-4 mt-4">
      <SearchAndFilterBar
        categories={categories}
        onCategoryChange={handleCategoryChange}
        activeCategory={category}
      />
      <div>
        {isPending ? (
          <div className=" px-4 py-8">
            <Spinner />
          </div>
        ) : !isPending && posts.length === 0 ? (
          <p className="mt-10 font-medium">No posts Found for your search</p>
        ) : (
          <div className="grid grid-cols-1 mt-5 mb-14 md:border-none border-t border-t-border">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        <div className="md:block fixed hidden right-3 top-20">
          <NotificationPage />
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mb-20 flex md:justify-start justify-end">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AllPosts;
