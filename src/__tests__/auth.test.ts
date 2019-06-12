import Auth from "../helpers/auth";
import Cookie from "js-cookie";
import api from "../helpers/api";

afterEach(jest.clearAllMocks);

// todo: separate all api mocks in another file
jest
  .spyOn(api, "login")
  .mockImplementation((args: { email: string; password: string }): any => {
    return {
      data: {
        id: "mocked",
        token: "mocked"
      }
    };
  });

jest.spyOn(api, "verify").mockImplementation((): any => {
  return { data: { valid: true } };
});

jest.spyOn(api, "logout").mockImplementation((): any => {});

// ⚠️ the following code stinks, needs to be refactored
let setCookie = jest.fn().mockImplementation((name, val) =>
  Object.defineProperty(window.document, "cookie", {
    writable: true,
    value: `${name}=${val}`
  })
);

Cookie.set = setCookie;
describe("Login", () => {
  it("sets the auth cookie", async () => {
    await Auth.login({ email: "test@test.com", password: "123" }, jest.fn());
    expect(setCookie).toHaveBeenCalledTimes(1);
    expect(Cookie.get("auth")).toEqual("mocked");
  });
  it("executes the callback", async () => {
    let cb = jest.fn();
    await Auth.login({ email: "test@test.com", password: "123" }, cb);
    expect(cb).toHaveBeenCalledTimes(1);
  });
  it("calls the API", async () => {
    await Auth.login({ email: "test@test.com", password: "123" }, jest.fn());
    expect(api["login"]).toHaveBeenCalledTimes(1);
  });
});

describe("Logout", () => {
  it("requests the api to expire the auth token", async () => {
    if (!Cookie.get("auth")) {
      Cookie.set("auth", "mocked");
    }
    await Auth.logout();
    expect(api.logout).toHaveBeenCalledTimes(1);
  });
  it("removes the cookie", async () => {
    if (!Cookie.get("auth")) {
      Cookie.set("auth", "mocked");
    }
    await Auth.logout();
    expect(Cookie.get("auth")).toBeFalsy();
  });
});

describe("Is Logged In", () => {
  it("Verifies token validation with api and returns boolean with token", async () => {
    if (!Cookie.get("auth")) {
      Cookie.set("auth", "mocked");
    }
    let val = await Auth.isLoggedIn();
    expect(val).toBe(true); // the api is mocked to return true, in real cases it can return false
    expect(api.verify).toHaveBeenCalledTimes(1);
  });

  it("Verifies token validation with api and returns boolean with no token", async () => {
    if (Cookie.get("auth")) {
      Cookie.remove("auth");
    }
    let val = await Auth.isLoggedIn();
    expect(val).toBe(false);
    expect(api.verify).toHaveBeenCalledTimes(0);
  });
});
