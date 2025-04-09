import { Entity, EntityId } from "..";
import { User } from "../user";

export interface Comment extends Partial<Entity> {
  user: EntityId;
  content: string;
}

export interface Post extends Entity {
  user: EntityId;
  title: string;
  content: string;
  likes: EntityId[];
  comments: Comment[];
}

export type PostFormData = Pick<Post, "title" | "content">;

export interface PostDocument extends Post, Document {}
