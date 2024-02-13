// TaskService.js

import { Task } from "../model/task.js";

export class TaskService {
  add = (task) => {
    const repository = new Task(task);
    return repository.save();
  };

  update = async (id, item) => {
    const result = await Task.findByIdAndUpdate({ _id: id }, item);
    return result ? this.getOne(id) : null;
  };

  delete = (id) => Task.findByIdAndDelete({ _id: id });

  getOne = (id) => Task.findOne({ _id: id });

  getAll = async (page = 1, limit = 10, filter) => {
    try {
      page = Math.max(1, page);
      limit = Math.max(1, limit);

      const flt = {};

      if (filter) {
        if (typeof filter === "string") {
          const [key, value] = filter.split("__");
          flt[key] = value;
        } else if (Array.isArray(filter)) {
          filter.forEach((item) => {
            const [key, value] = item.split("__");
            flt[key] = value;
          });
        }
      }

      return Task.find(flt, {}, { limit, skip: (page - 1) * limit });
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches :", error);
      throw new Error("Erreur lors de la récupération des tâches");
    }
  };
  getAllByUserId = async (userId, page = 1, limit = 50) => {
    try {
      page = Math.max(1, page);
      limit = Math.max(1, limit);

      const flt = { userId };

      return Task.find(flt, {}, { limit, skip: (page - 1) * limit });
    } catch (error) {
      console.error("Error retrieving tasks by userId:", error);
      throw new Error("Error retrieving tasks by userId");
    }
  };
}
