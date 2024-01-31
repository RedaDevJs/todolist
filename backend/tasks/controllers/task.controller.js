import { TaskService } from "../services/task.service.js";

export class TaskController {
  constructor() {
    this.taskService = new TaskService();
  }

  Add = (task) => this.taskService.Add(task);
  update = (id, item) => this.taskService.update(id, item);
  delete = (id) => this.taskService.delete(id);
  getOne = (id) => this.taskService.getOne(id);
  getAll = (page, limit, filter) =>
    this.taskService.getAll(page, limit, filter);
}
