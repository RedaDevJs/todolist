// task.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema({
  id: mongoose.ObjectId, // Ajoutez cette ligne
  titre: {
    type: String,
    required: true,
  },
  priorite: String,
  statut: String,
  description: String,
  deadline: Date,
  commentaires: [String], // Tableau pour stocker les commentaires
});

export const Task = mongoose.model("Task", taskSchema, "tasks");