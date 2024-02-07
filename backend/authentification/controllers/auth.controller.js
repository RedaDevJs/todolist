import { AuthService } from "../services/auth.service.js";

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  login = (item) => this.authService.login(item);
  register = (item) => this.authService.register(item);
}
