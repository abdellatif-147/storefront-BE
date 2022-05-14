import { userModel } from "../models/user";
import supertest from "supertest";
import app from "../server";
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
      lastName: "arafa",
    });
    expect(result).toEqual({
      firstname: "abdelatif",
      lastname: "arafa",
      username: "abdo",
    });
  });
  it("should have an login method", () => {
    expect(store.login).toBeDefined();
  });

  it("index method should return a logged in user", async () => {
    const result: {} | null = await store.login("abdo", "123");
    expect(result).toEqual({
      username: "abdo",
    });
  });
  it("index method should return a list of user", async () => {
    const result: {} = await store.indexUsers();
    
    expect(result).toEqual([
      {
        username: "abdo",
        firstname: "abdelatif",
        lastname: "arafa",
      },
    ]);
  });

  it("show method should return the correct user", async () => {
    const result: {} = await store.show(1);    
    expect(result).toEqual({
      username: "abdo",
      firstname: "abdelatif",
      lastname: "arafa",
    });
  });
});
const request = supertest(app);
describe("user Endpoints", () => {
  let token : string
  it("check signUp endpoint", async () => {
    const response = await request.post(
      "/signUp"
    ).send({
      firstName: 'test',
      lastName: 'test',
      userName: 'test@test.com',
      password: '123456',
    });;
    expect(response.status).toBe(200);
  });
  it("check login endpoint", async () => {
    const response = await request.post(
      "/signIn"
    ).send({
      userName: 'test@test.com',
      password: '123456',
    });
    token = response.body    
    expect(response.status).toBe(200);
  });
  it("get specific user by id endpoint", async () => {
    
    const response = await request.get(
      "/user/2"
    ).set('Authorization', `bearer ${token}`)

    expect(response.status).toBe(200);
  });

  it("get users endpoint", async () => {
    const response = await request.get(
      "/users"
    ).set('Authorization', `bearer ${token}`)
    expect(response.status).toBe(200);
  });
});
