import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";

type UseGetPostsParams = {
  search?: string;
  category?: string;
  page?: number;
};

export const useGetPosts = ({
  search,
  category,
  page = 1,
}: UseGetPostsParams) => {
  return useQuery({
    queryKey: ["posts", { search, category, page }],
    queryFn: () => getPosts({ search, category, page }),
  });
};
