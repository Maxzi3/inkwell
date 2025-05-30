import api from './api';

export interface CommentPayload {
  postId: string;
  content: string;
}

export interface ReplyPayload extends CommentPayload {
  parent: string;
}

export async function createComment(payload: CommentPayload) {
  const { data } = await api.post(`/posts/${payload.postId}/comments`, {
    content: payload.content,
  });
  return data;
}

export async function createReplyOnComment(payload: ReplyPayload) {
  const { data } = await api.post(`/posts/${payload.postId}/comments`, {
    parent: payload.parent,
    content: payload.content,
  });
  return data;
}

export async function getCommentsForPost(postId: string) {
  const { data } = await api.get(`/posts/${postId}/comments`);
  return data;
}

export async function updateComment(payload: {
  postId: string;
  commentId: string;
  content: string;
}) {
  const { data } = await api.patch(
    `/posts/${payload.postId}/comments/${payload.commentId}`,
    { content: payload.content }
  );
  return data;
}

export async function deleteComment(postId: string, commentId: string) {
  const { data } = await api.delete(`/posts/${postId}/comments/${commentId}`);
  return data;
}
