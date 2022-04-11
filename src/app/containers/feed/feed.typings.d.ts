export interface PostData {
  id: number;
  title: string;
  author: string;
  publish_date: string;
  slug: string;
  description: string;
  content: string;
  avatar_color?: string;
  comments?: CommentData[];
}

export interface CommentData {
  id?: number;
  postId?: number;
  parent_id?: number | null;
  user: string;
  date?: string;
  content: string;
}
