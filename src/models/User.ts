import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { Request } from "express";

import { AuthRequest, UserDocument } from "../types/user";
import { SCHEMA_NAMES } from "../system/config";

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: SCHEMA_NAMES.user,
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: SCHEMA_NAMES.user,
      },
    ],
  },
  { timestamps: true }
);

export const User = model(SCHEMA_NAMES.user, userSchema);

export const findByUserId = async (req: AuthRequest) => {
  try {
    const user = await User.findById(req.user && req.user._id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    throw err;
  }
};

export const findByParamId = async (req: AuthRequest) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    throw err;
  }
};

export const findOneByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (err) {
    throw err;
  }
};

export const saveUser = async (req: Request) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const newUser = await user.save();
    return newUser;
  } catch (err) {
    throw err;
  }
};

export const findOneAndUpdateByEmail = async (req: Request) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
      { new: true }
    );
    return newUser;
  } catch (err) {
    throw err;
  }
};
