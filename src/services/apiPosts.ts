import api from "./api";

// GET all posts
export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

// CREATE a new post (you had postId here but didn’t send actual post data)
export const createPost = async (post: {
  title: string;
  content: string;
  category: string;
  image?: string;
}) => {
  const res = await api.post("/posts", post);
  return res.data;
};

// GET a single post by slug
export const getPostBySlug = async (slug: string) => {
  const res = await api.get(`/posts/${slug}`);
  return res.data.data;
};
// UPDATE a post
export const updatePost = async (postId: string, update: string) => {
  const res = await api.patch(`/posts/${postId}`, update);
  return res.data.data;
};

// DELETE a post by ID
export const deletePostId = async (postId: string) => {
  const res = await api.delete(`/posts/${postId}`);
  return res.data;
};

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
export const publishDraft = async (postId: string) => {
  const res = await api.patch(`/posts/${postId}/publishDraft`);
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
export const createDraft = async () => {
  const res = await api.post("/posts/draft");
  return res.data;
};
