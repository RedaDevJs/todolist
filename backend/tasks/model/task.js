import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema({
  id: mongoose.ObjectId,
  Titre: {
    type: String,
    required: true,
  },
  Priorite: String,
  Statut: String,
  Description: String,
  deadline: Date,
  Commentaires: String,
  userId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
export const Task = mongoose.model("Task", taskSchema, "Tasks");
