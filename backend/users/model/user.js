//user.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  id: mongoose.ObjectId,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
 salt: {
    required: true,
    type: String,
  },
});
export const User = mongoose.model("User", userSchema, "users");
