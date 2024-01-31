import { Task } from "../model/task.js";

export class TaskService {
  Add = (task) => {
    const repository = new Task({
      Titre: task.Titre,
      Priorite: task.Priorite,
      Statut: task.Statut,
      Description: task.Description,
      deadline: task.deadline,
      Commentaires: task.Commentaires,
    });
    return repository.save();
  };
  update = async (id, item) => {
    const result = await Task.findByIdAndUpdate({ _id: id }, item);
    if (result) return this.getOne(id);
    return null;
  };
  delete = (id) => Task.findByIdAndDelete({ _id: id });
  getOne = (id) => Task.findOne({ _id: id });
  getAll = (page = 1, limit = 10, filter) => {
    if (page <= 0) page = 1;
    if (limit <= 0) limit = 10;
    const flt = {};
    if (filter) {
      if (typeof filter == "string") {
        const filters = `${filter}`.split("__");
        flt[filter[0]] = filters[1];
      } else {
        [...filter].forEach((item) => {
          const filters = `${item}`.split("__");
          flt[filter[0]] = filters[1];
        });
      }
    }
    return Task.find(flt, {}, { limit, skip: (page - 1) * limit })
    // .populate(
    //   "userId"
    // );
  };
}
