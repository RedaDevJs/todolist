import { UserService } from "../../users/services/user.service";
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
      if (bcrypt.compare(password, user.password)) {
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
  getSinitizeUser = (user) => {
    const { _id, email, name } = user;
    return { _id, email, name };
  };
}
