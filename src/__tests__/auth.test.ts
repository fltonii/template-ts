import Auth from "../helpers/auth";
import Cookie from "js-cookie";
// the api must be mocked here in order for the test no to call login each time it runs

afterEach(jest.clearAllMocks);

let setCookie = jest.fn().mockImplementation((name, val) =>
  Object.defineProperty(window.document, "cookie", {
    writable: true,
    value: `${name}=${val}`
  })
);

Cookie.set = setCookie;
describe("Login", () => {
  it("sets the auth cookie", async () => {
    await Auth.login(jest.fn());
    expect(setCookie).toHaveBeenCalledTimes(1);
    expect(Cookie.get("auth")).toEqual("mock");
  });
  it("executes the callback", async () => {
    let cb = jest.fn();
    await Auth.login(cb);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe("Logout", () => {
  it("expires the auth token", () => {
    // depends on the api
  });
  it("removes the cookie", async () => {
    if (!Cookie.get("auth")) {
      Cookie.set("auth", "mock");
    }
    await Auth.logout();
    expect(Cookie.get("auth")).toBeFalsy();
  });
});

describe("Is Logged In", () => {
  it("Verifies token validation with api and returns boolean", async () => {
    const response = await Auth.isLoggedIn();
    expect(typeof response).toBe("boolean");
  });
});
