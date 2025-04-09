import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  findByUserId,
  findOneAndUpdateByEmail,
  findOneByEmail,
  saveUser,
} from "../../models/User";
import { JWT_SECRET } from "../../system/config";
import { AuthRequest, LoginType, RegisterType } from "../../types/user";
import { validateLoginInput, validateRegisterInput } from "../../utils/user";

// @route   /api/register
// @method  POST
// @desc    Sign up
export const handleRegister = async (req: Request, res: Response) => {
  try {
    const { isValid, error } = validateRegisterInput(req.body as RegisterType);
    if (!isValid) {
      res.status(400).json(error);
      return;
    }

    const sameUser = await findOneByEmail((req.body as RegisterType).email);
    if (sameUser) {
      res.status(400).json({ email: "This email does already exist" });
      return;
    }
    const newUser = await saveUser(req);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// @route   /api/auth
// @method  PUT
// @desc    Update user
export const handleUpdate = async (req: Request, res: Response) => {
  try {
    const { isValid, error } = validateRegisterInput(req.body as RegisterType);
    if (!isValid) {
      res.status(400).json(error);
      return;
    }

    const prevUser = await findOneByEmail((req.body as RegisterType).email);
    if (!prevUser) {
      res.status(400).json({ email: "This email doesn't exist" });
      return;
    }
    const prevPassword = (req.body as RegisterType).prevPassword;
    if (prevPassword !== undefined) {
      const isMatch = await bcrypt.compare(prevPassword, prevUser.password);
      if (!isMatch) {
        res.status(400).json({ prevPassword: "Previous Password is wrong" });
        return;
      }
    }
    const newUser = await findOneAndUpdateByEmail(req.body.email);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// @route   /api/login
// @method  POST
// @desc    Sign in
export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { isValid, error } = validateLoginInput(req.body as LoginType);
    if (!isValid) {
      res.status(400).json(error);
      return;
    }
    const user = await findOneByEmail(req.body.email);
    if (!user) res.status(404).json({ email: "User not found" });
    else {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) res.status(400).json({ password: "Invalid credentials" });
      else {
        const token = jwt.sign(
          { _id: user._id, email: user.email },
          JWT_SECRET
        );
        res
          .header("Authorization", "Bearer " + token)
          .json({ token: token, user: user });
      }
    }
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

// @route   /api/get-current-user
// @method  GET
// @desc    Get Current User
export const handleCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await findByUserId(req);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: "user not found" });
  }
};
