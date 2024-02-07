import { UserService } from "../../users/services/user.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export class AuthService {
  constructor() {
    this.userService = new UserService();
  }

  login = async (item) => {
    const { email, password } = item;
    const user = await this.userService.findByParams("email", email);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
            { ...this.getSinitizeUser(user) },
            "privatekey",
            {
              expiresIn: "1d",
            }
        );
        return { token };
      }
      return null;
    }
    return null;
  };
  register = async (item) => {
    try {
      const user = await this.userService.Add(item);
      if (user) {
        const u = this.getSinitizeUser(user);
        const token = jwt.sign(
            { ...this.getSinitizeUser(user) },
            "privatekey",
            {
              expiresIn: "1d",
            }
        );
        return { token };
      }
    } catch (err) {
      const { code } = err;
      if (code === 11000) return "duplicate email";
    }
  };

  getSinitizeUser = (user) => {
    const { _id, email, name } = user;
    return { _id, email, name };
  };
}