import { userModel } from "../models/user";

import bcrypt from "bcrypt";
const store = new userModel();
const pepper = process.env?.BCRYPT_PASSWORD;
const saltRounds = process.env?.SALT_ROUND as string;
const hash = bcrypt.hashSync("123" + pepper, parseInt(saltRounds));

describe("product Model", () => {
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
  it("should have an index method", () => {
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
