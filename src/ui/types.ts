export interface Post  {
  _id: string;
  title: string;
  content: string;
  category:string;
  image?: string;
  createdAt: string;
  author: {
    fullName: string;
    avatar: string;
  };
  views:number;
  slug:string;
  likes: string[];
  bookmarks: string[];
  comment: string[];
}
export interface Draft {
  _id: string;
  title: string;
  content: string;
  image?: string;
  slug: string;
}
export interface Notification {
  _id: string;
  sender: {
    _id: string;
    fullName: string;
    avatar: string;
  };
  type: "like" | "comment" ;
  post?: {
    _id: string;
    title: string;
    slug: string;
  };
  createdAt: string;
  isRead: boolean;
}

  export interface Comment {
    _id: string;
    postId: string;
    content: string;
    author: string;
    createdAt: string;
  }
  