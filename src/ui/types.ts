export interface Post  {
  _id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  author: {
    fullName: string;
    avatar: string;
  };
  likes: string[];
  bookmarks: string[];
  comment: string[];
}
  
  export interface Comment {
    id: string;
    postId: string;
    content: string;
    author: string;
    createdAt: string;
  }
  