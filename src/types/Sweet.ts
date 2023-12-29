import { User } from "./User";

export interface Sweet {
  id?: string;
  content: string;
  userId: string;
  liked?: boolean;
  likes_count: number;
  bookmarks_count: number;
  bookmarked?: boolean;
  user?: User;
  bookmaked: boolean;
  likesCount?: number;
  createdAt?: string;
  updatedAt?: string;
  created_at?: any;
  updated_at?: any;
}
