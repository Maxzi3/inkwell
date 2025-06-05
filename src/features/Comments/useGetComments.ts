import { useQuery } from "@tanstack/react-query";
import { getCommentsForPost } from "../../services/apiComments";

export function useComments(postId: string) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsForPost(postId),
    enabled: !!postId,
  });
}
