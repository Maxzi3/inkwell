import { useQuery } from "@tanstack/react-query";
import type { Post } from "../../ui/types";
import { getUserPosts } from "../../services/apiPosts";

export const useUserPosts = () => {
  return useQuery<Post[]>({
    queryKey: ["user-posts"],
    queryFn: getUserPosts,
  });
};
