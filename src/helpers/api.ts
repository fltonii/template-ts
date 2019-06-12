import Client from "./axiosClient";
import Cookie from "js-cookie";
import { AxiosInstance } from "axios";

class Api {
  protected token: string | undefined;
  public call: AxiosInstance;
  constructor() {
    this.token = Cookie.get("auth");
    this.call = Client(this.token);
  }

  async login(args: { email: string; password: string }) {
    return await this.call.post("/login", {
      params: args
    });
  }
  async verify() {
    return await this.call("/auth/verify");
  }
  async logout() {
    return await this.call("/auth/logout");
  }
}

export default new Api();
