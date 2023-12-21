import { User } from "./User";

export interface Sweet {
  id: string;
  content: string;
  user: User;
  likesCount: number;
  subsweetsCount: number;
  date: Date;
}