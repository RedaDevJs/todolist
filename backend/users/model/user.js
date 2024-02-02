import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  id: mongoose.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
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
export const User = mongoose.model("User", userSchema, "Users");
