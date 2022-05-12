import Express, { Request, Response } from "express";
import { userModel } from "../models/user";
import jwt from "jsonwebtoken";

const userRoute = (app: Express.Application) => {
  app.post("/user", signUp);
  app.post("/auth", login);
};
const store = new userModel();
const secret = process.env.TOKEN_SECRET as string;
const signUp = async (req: Request, res: Response) => {
  const { username, password, firstName, lastName } = req.body;
  const newUser = await store.signUp({
    username,
    password,
    firstName,
    lastName,
  });
  var token = jwt.sign({ user: newUser }, secret);
  res.json(token);
};
const login = async (req: Request, res: Response) => {
  const newUser = await store.login(req.body.username, req.body.password);
  var token = jwt.sign({ user: newUser }, secret);
  res.json(token);
};
export default userRoute