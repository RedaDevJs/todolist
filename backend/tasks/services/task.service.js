//TaskService.js

import { Task } from "../model/task.js";

export class TaskService {
  add = (task) => {
    const repository = new Task(task);
    return repository.save();
  };
  update = async (id, item) => {
    const result = await Task.findByIdAndUpdate({ _id: id }, item);
    if (result) return this.getOne(id);
    return null;
  };
  delete = (id) => Task.findByIdAndDelete({ _id: id });
  getOne = (id) => Task.findOne({ _id: id });
  getAll = async (page = 1, limit = 10, filter) => {
    try {
      if (page <= 0) page = 1;
      if (limit <= 0) limit = 10;

      const flt = {};
      if (filter) {
        if (typeof filter === "string") {
          const filters = filter.split("__"); // Remove unnecessary backticks
          flt[filters[0]] = filters[1];
        } else {
          [...filter].forEach((item) => {
            const filters = item.split("__"); // Remove unnecessary backticks
            flt[filters[0]] = filters[1];
          });
        }
      }

      return Task.find(flt, {}, { limit, skip: (page - 1) * limit });
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la récupération des tâches");
    }
  };
}
