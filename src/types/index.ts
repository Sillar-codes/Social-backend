import { Schema } from "mongoose";

export type EntityId = Schema.Types.ObjectId;

export interface Entity {
  _id: EntityId;
  createdAt: Date;
  updatedAt: Date;
}
