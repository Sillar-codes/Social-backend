import { Request } from "express";

import { Entity, EntityId } from "..";

export interface User extends Entity {
  name: string;
  email: string;
  password: string;
  followers: EntityId[];
  following: EntityId[];
}

export type LoginType = Pick<User, "name" | "email" | "password">;

export interface RegisterType extends LoginType {
  prevPassword?: string;
  confirmPassword: string;
}

export interface UserDocument extends User, Document {}

export type UserInToken = Pick<User, "_id" | "email">;

export interface AuthRequest extends Request {
  user?: UserInToken;
}
