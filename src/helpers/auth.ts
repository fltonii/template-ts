import Cookie from "js-cookie";
class Auth {
  async login(cb?: () => void) {
    // request the api for a cookie
    // timeout there to simulate async code
    await new Promise(resolve => {
      setTimeout(() => {
        Cookie.set("auth", "mock");
        cb && cb();
        resolve();
      }, 300);
    });
  }
  async logout(cb?: () => void) {
    // request the api for expiring the cookie

    await new Promise(resolve => {
      setTimeout(() => {
        Cookie.remove("auth");
        cb && cb();
        resolve();
      }, 300);
    });
  }

  async isLoggedIn() {
    const cookie = await Cookie.get("auth");
    if (cookie) {
      // request the api for checking cookie
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 300);
      });
      return true; // would be response
    }
    return false;
  }
}

export default new Auth();
