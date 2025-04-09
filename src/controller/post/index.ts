import { Request, Response } from "express";

import { AuthRequest } from "../../types/user";
import { Post, findAll, findOne, savePost } from "../../models/Post";
import { EntityId } from "../../types";
import { Comment, PostFormData } from "../../types/post";
import { validatePostInput } from "../../utils/post";

// @route   /api/posts/create
// @method  POST
// @desc    Post a blog
export const handlePost = async (req: AuthRequest, res: Response) => {
  try {
    const { isValid, error } = validatePostInput(req.body as PostFormData);
    if (!isValid) {
      res.status(400).json(error);
      return;
    }
    const newPost = await savePost(req);
    res.json(newPost);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// @route   /api/posts
// @method  GET
// @desc    Post a blog
export const handleGetAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// @route   /api/posts/:id/like
// @method  POST
// @desc    like a post
export const handleLikePost = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new Error("Not Authorized");
    const post = await findOne(req);

    if (!post.likes.includes(req.user._id)) {
      post.likes.push(req.user._id);
      const savedPost = await post.save();
      res.status(200).json(savedPost);
    } else {
      res.status(400).json({ error: "You already liked the post" });
    }
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// @route   /api/posts/:id/like
// @method  POST
// @desc    like a post
export const handleUnlikePost = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new Error("Not Authorized");
    const post = await findOne(req);

    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== (req.user?._id as EntityId).toString()
      );
      const savedPost = await post.save();
      res.status(200).json(savedPost);
    } else {
      res.status(400).json({ error: "you don't like the post yet" });
    }
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// @route   /api/posts/:id/comment
// @method  POST
// @desc    post a comment
export const handlePostComment = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) throw new Error("Not Authorized");
    const post = await findOne(req);
    let newComment: Comment = {
      user: req.user._id as EntityId,
      content: req.body.content,
    };
    post.comments.push(newComment);
    const updatedPost = await post.save();
    res.status(201).json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
