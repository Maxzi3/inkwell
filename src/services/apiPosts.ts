import api from "./api";

export interface PostUpdatePayload {
  title?: string;
  content?: string;
  image?: string;
  category?: string;
}
export interface EditDraftPayload {
  title?: string;
  content?: string;
  image?: string;
  category?: string;
}
export interface CreateDraftInput {
  title: string;
  content: string;
  category: string;
  image?: string;
}

type GetPostsParams = {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
};

export const getPosts = async ({
  search,
  category,
  page = 1,
  limit = 3,
}: GetPostsParams) => {
  const res = await api.get("/posts", {
    params: {
      search,
      category,
      page,
      limit,
    },
  });
  return res.data;
};

export const getUserPosts = async () => {
  const res = await api.get("/posts/my/posts");
  return res.data.data;
};

// CREATE a new post (you had postId here but didn’t send actual post data)
export const createPost = async (formData: FormData) => {
  const res = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// GET a single post by slug
export const getPostBySlug = async (slug: string) => {
  const res = await api.get(`/posts/${slug}`);
  return res.data.data;
};
// UPDATE a post
export const updatePost = async (
  postId: string,
  updateData: PostUpdatePayload
) => {
  const res = await api.patch(`/posts/${postId}`, updateData);
  return res.data.data;
};

export async function editDraftById(
  draftId: string,
  payload: EditDraftPayload
) {
  const { data } = await api.patch(`/posts/drafts/${draftId}`, payload);
  return data;
}

// DELETE a post by ID
export const deletePostId = async (postId: string) => {
  const res = await api.delete(`/posts/${postId}`);
  return res.data;
};
// DELETE a draft by ID
export async function deleteDraftById(draftId: string): Promise<void> {
  await api.delete(`/posts/drafts/${draftId}`);
}
// LIKE a post
export const likePost = async (postId: string) => {
  const res = await api.post(`/posts/${postId}/like`);
  return res.data;
};

export const unlikePost = async (postId: string) => {
  const res = await api.delete(`/posts/${postId}/like`);
  return res.data;
};

// BOOKMARK a post
export const bookmarkPost = async (postId: string) => {
  const res = await api.post(`/posts/${postId}/bookmark`);
  return res.data;
};

export const unbookmarkPost = async (postId: string) => {
  const res = await api.delete(`/posts/${postId}/bookmark`);
  return res.data;
};

// PUBLISH a draft
export const publishDraft = async (draftId: string) => {
  const res = await api.patch(`/posts/${draftId}/publishDraft`);
  return res.data.data;
};

// GET user drafts
export const getDrafts = async () => {
  const res = await api.get("/posts/my/drafts");
  return res.data.data;
};

// GET user bookmarks
export const getBookmarks = async () => {
  const res = await api.get("/posts/my/bookmarks");
  return res.data.data;
};

// GET user likes
export const getLikes = async () => {
  const res = await api.get("/posts/my/likes");
  return res.data.data;
};

// CREATE a new draft
export const createDraft = async (formData: FormData) => {
  const res = await api.post("/posts/draft", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
