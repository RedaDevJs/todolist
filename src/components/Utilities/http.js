import axios from "axios";

export class HttpService {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:6001/",
    });
  }

  getHeaders(token) {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  post(url, body, token = undefined) {
    const headers = this.getHeaders(token);
    return this.instance.post(url, body, { headers });
  }

  get(url, token = undefined) {
    const headers = this.getHeaders(token);
    return this.instance.get(url, { headers });
  }
}

