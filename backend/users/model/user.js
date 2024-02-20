//user.js

import mongoose from "mongoose";

const { Schema } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2"; // Import the plugin

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
  role: {
    required: true,
    type: String,
  },
  salt: {
    required: true,
    type: String,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

// Apply the mongoosePaginate plugin to the userSchema
userSchema.plugin(mongoosePaginate);
export const User = mongoose.model("User", userSchema, "users");
