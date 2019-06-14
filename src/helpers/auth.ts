import Cookie from "js-cookie";
import api from "./api";
class Auth {
  async login(args: { email: string; password: string }, cb?: () => void) {
    try {
      const response = await api.login(args);
      Cookie.set("auth", response.data.token);
    } catch (error) {
      throw new Error(error);
    }
    cb && cb();
  }
  async logout(cb?: () => void) {
    // request the api for expiring the cookie
    try {
      await api.logout();
      Cookie.remove("auth");
      cb && cb();
    } catch (error) {
      throw new Error(error);
    }
  }

  async isLoggedIn() {
    const cookie = Cookie.get("auth");
    if (cookie) {
      try {
        let response = await api.verify();
        return response.data.valid;
      } catch (error) {
        throw new Error(error);
      }
    }
    return false;
  }
}

export default new Auth();
