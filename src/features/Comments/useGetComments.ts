import { useQuery } from "@tanstack/react-query";
import { getCommentsForPost } from "../../services/apiComments";

export function useComments(postId: string, page: number, limit = 5) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsForPost(postId, page, limit),
    enabled: !!postId,
  });
}
