import { userModel } from "../models/user";
const store = new userModel();

describe("user Model", () => {
  it("should have an signup method", () => {
    expect(store.signUp).toBeDefined();
  });
  it("create method should add a register user", async () => {
    const result: {} = await store.signUp({
      userName: "abdo",
      password: "123",
      firstName: "abdelatif",
      lastName: "arafa"
    });
    expect(result).toEqual({
      firstname: "abdelatif",
      lastname: "arafa",
      username: "abdo"
    });
  });
  it("should have an login method", () => {
    expect(store.login).toBeDefined();
  });

  it("index method should return a logged in user", async () => {
    const result: {} | null = await store.login("abdo", "123");
    expect(result).toEqual(
      {
        username: "abdo"
      },
    );
  });
});

