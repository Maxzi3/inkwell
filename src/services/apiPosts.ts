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
}
export interface  CreateDraftInput {
  title: string;
  content: string;
  category: string;
  image?: string;
};

// GET all posts
export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

// CREATE a new post (you had postId here but didn’t send actual post data)
export const createPost = async (formData: FormData) => {
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }
  const res = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(res.data);
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
  const res = await api.patch(`/posts/${postId}/like`);
  return res.data.data;
};

// BOOKMARK a post
export const bookmarkPost = async (postId: string) => {
  const res = await api.patch(`/posts/${postId}/bookmark`);
  return res.data.data;
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
  console.log(formData)
  const res = await api.post("/posts/draft", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
