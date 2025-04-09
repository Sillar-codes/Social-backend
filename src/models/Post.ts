import { Schema, model } from "mongoose";
import { Response } from "express";

import { PostDocument } from "../types/post";
import { SCHEMA_NAMES } from "../system/config";
import { AuthRequest } from "../types/user";

const postSchema = new Schema<PostDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: SCHEMA_NAMES.user,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: SCHEMA_NAMES.user,
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: SCHEMA_NAMES.user,
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Post = model(SCHEMA_NAMES.post, postSchema);

export const savePost = async (req: AuthRequest) => {
  const post = new Post({
    user: req.user?._id,
    title: req.body.title,
    content: req.body.content,
  });
  const newPost = await post.save();
  return newPost;
};

export const findAll = async () => {
  const posts = await Post.find()
    .populate("user", ["name", "email"])
    .populate("comments.user", "name")
    .sort({ createdAt: "desc" })
    .lean();
  return posts;
};

export const findOne = async (req: AuthRequest) => {
  const post = await Post.findById(req.params.id)
    .populate("user", ["name", "email"])
    .populate("comments.user", "name");
  if (!req.user || !req.user._id) {
    throw new Error("Not Authorized");
  }

  if (!post) {
    throw new Error("Post not found");
  }
  return post;
};
