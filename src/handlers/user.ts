import Express, { Request, Response } from "express";
import { userModel } from "../models/user";
import jwt from "jsonwebtoken";
import authenticate from "../middlewares/auth";

const userRoute = (app: Express.Application) => {
  app.post("/signUp", signUp);
  app.post("/signIn", login);
  app.get("/user/:id", authenticate, show);
  app.get("/users", authenticate, index);
};
const store = new userModel();
const secret = process.env.TOKEN_SECRET as string;
const signUp = async (req: Request, res: Response) => {
  try {
    const { userName, password, firstName, lastName } = req.body;
    const newUser = await store.signUp({
      userName,
      password,
      firstName,
      lastName,
    });
    var token = jwt.sign({ user: newUser }, secret);
    res.status(200)
    res.json(token);
  } catch (err) {
    res.status(400)
    console.log(err);
  }
};
const login = async (req: Request, res: Response) => {
  try {
    const newUser = await store.login(req.body.userName, req.body.password);
    var token = jwt.sign({ user: newUser }, secret);
    res.status(200)
    res.json(token);
  } catch (error) {
    res.status(201)
    console.log(error);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(+req.params.id);
    res.status(200);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const allUsers = await store.indexUsers();
    res.json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};
export default userRoute;
