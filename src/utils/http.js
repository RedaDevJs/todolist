import axios from "axios";
export class HttpService {
  host = "http://localhost:6001/";

  getHeaders(token) {
    let headers = {};
    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    return headers;
  }

  post(url, body, token = undefined) {
    return axios.post(url, body, {
      headers: this.getHeaders(token),
    });
  }

  get(url, token = undefined) {
    return axios.get(url, {
      headers: this.getHeaders(token),
    });
  }
}
