import bcrypt from "bcrypt";
import { User } from "../model/user.js";
export class UserService {
  constructor() {
    this.saltRounds = 10;
  }

  async getSchema(item) {
    const { email, name, password } = item;
    const salt = await bcrypt.genSalt(this.saltRounds);
    const cryptedPassword = await bcrypt.hash(password, salt);
    return new User({ email, name, password: cryptedPassword, salt });
  }
  Add = async (item) => {
    this.collection = await this.getSchema(item);
    const user = await this.collection.save(item);
    if (user) return user["_doc"];
  };

  update = async (id, item) => {
    if (item.password) {
      const user = await this.getOne(id);
      if (user) {
        item.password = await bcrypt.hash(item.password, user.salt);
        item._id = id;
        this.Add(item);
      } else {
        return null;
      }
    }
    const result = await User.findByIdAndUpdate({ _id: id }, item);
    if (result) return this.getOne(id);
    return null;
  };
  getOne = (id) => User.findOne({ _id: id });
  delete = (id) => User.findByIdAndDelete({ _id: id });
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
    return User.find(
      flt,
      {
        password: 0,
        salt: 0,
      },
      { limit, skip: (page - 1) * limit }
    );
  };

  findByParams(params, value) {
    return User.findOne({ [params]: value });
  }
}
