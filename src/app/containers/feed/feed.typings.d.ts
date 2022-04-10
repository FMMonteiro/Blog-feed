export interface PostData {
  id: number;
  title: string;
  author: string;
  publish_date: string;
  slug: string;
  description: string;
  content: string;
}

export interface CommentData {
  id?: number;
  postId?: number;
  parent_id?: number;
  user: string;
  date?: string;
  content: string;
}
