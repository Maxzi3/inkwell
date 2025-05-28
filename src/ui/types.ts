export interface Post  {
  _id: string;
  title: string;
  content: string;
  category: string;
  image?: string;
}
  
  export interface Comment {
    id: string;
    postId: string;
    content: string;
    author: string;
    createdAt: string;
  }
  