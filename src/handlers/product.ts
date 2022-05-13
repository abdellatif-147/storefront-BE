import Express, { Request, Response } from "express";
import { productStore } from "../models/product";
import app from "../server";
import authenticate from "../utils/auth";
const store = new productStore();

const productRoute = (app: Express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", authenticate, create);
};

const create = async (req: Request, res: Response) => {
  try {
    const addedProduct = await store.create(req.body);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};
const index = async (req: Request, res: Response) => {
  try {
    const allOrders = await store.indexProduct();
    res.json(allOrders);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};
export default productRoute