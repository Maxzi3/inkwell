import api from './api'

// GET all posts
export const getPosts = () => api.get('/posts').then(res => res.data)

// CREATE a new post (you had postId here but didn’t send actual post data)
export const createPost = (post: { title: string; content: string; category: string; image?: string }) =>
  api.post('/posts', post).then(res => res.data)

// GET a single post by slug
export const getPostBySlug = (slug: string) =>
  api.get(`/posts/${slug}`).then(res => res.data.data)

// UPDATE a post
export const updatePost = (postId: string, update: any) =>
  api.patch(`/posts/${postId}`, update).then(res => res.data.data)

// DELETE a post by ID
export const deletePostId = (postId: string) =>
  api.delete(`/posts/${postId}`).then(res => res.data)

// LIKE a post
export const likePost = (postId: string) =>
  api.patch(`/posts/${postId}/like`).then(res => res.data.data)

// BOOKMARK a post
export const bookmarkPost = (postId: string) =>
  api.patch(`/posts/${postId}/bookmark`).then(res => res.data.data)

// PUBLISH a draft
export const publishDraft = (postId: string) =>
  api.patch(`/posts/${postId}/publishDraft`).then(res => res.data.data)

// GET user drafts
export const getDrafts = () =>
  api.get('/posts/my/drafts').then(res => res.data.data)

// GET user bookmarks
export const getBookmarks = () =>
  api.get('/posts/my/bookmarks').then(res => res.data.data)

// GET user likes
export const getLikes = () =>
  api.get('/posts/my/likes').then(res => res.data.data)

// CREATE a new draft
export const createDraft = () =>
  api.post('/posts/draft').then(res => res.data)
