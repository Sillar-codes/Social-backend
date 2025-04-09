import { Response } from "express";

import { User, findByParamId, findByUserId } from "../../models/User";
import { AuthRequest } from "../../types/user";

// @route   /api/profile
// @method  GET
// @desc    Get current user's profile
export const handleProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await findByUserId(req);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// @route   /api/:id/follow
// @method  POST
// @desc    Follow the user
export const handleFollowUser = async (req: AuthRequest, res: Response) => {
  try {
    const userToFollow = await findByParamId(req);
    const currentUser = await findByUserId(req);

    if (!currentUser?.following.includes(userToFollow?._id)) {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
      await currentUser.save();
      await userToFollow.save();
      res.status(200).json(userToFollow);
    } else {
      res.status(400).json({ error: "you already followed this user." });
    }
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// @route   /api/:id/follow
// @method  POST
// @desc    Unfollow the user
export const handleUnfollowUser = async (req: AuthRequest, res: Response) => {
  try {
    const userToUnFollow = await findByParamId(req);
    const currentUser = await findByUserId(req);

    if (currentUser?.following.includes(userToUnFollow._id)) {
      if (currentUser?.following) {
        currentUser.following = currentUser.following.filter(
          (id) => id.toString() !== userToUnFollow._id.toString()
        );
      }
      if (userToUnFollow.followers) {
        userToUnFollow.followers = userToUnFollow.followers.filter(
          (id) => id.toString() !== currentUser?._id.toString()
        );
      }
      await currentUser.save();
      await userToUnFollow.save();
      res.status(201).json(userToUnFollow);
    } else {
      res.status(404).json({ error: "you are not following this user" });
    }
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};

// @route   /api/explore
// @method  GET
// @desc    Explore user
export const handleExplore = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user && req.user._id },
    }).lean();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
};
