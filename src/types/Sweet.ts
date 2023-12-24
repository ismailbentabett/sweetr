import { User } from "./User";

export interface Sweet {
  id?: string;
  content: string;
  userId : string;
  liked? : boolean;
  bookmarked? : boolean;
  user? : User;
  bookmaked : boolean;
  likesCount? : number;
  createdAt?: string;
  updatedAt?: string;
}