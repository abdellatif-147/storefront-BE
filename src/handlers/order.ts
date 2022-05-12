import Express, { Request, Response } from "express";
import { orderStore } from "../models/order";
import authenticate from "../utils/auth";

const orderRoute = (app: Express.Application) => {
  app.get("/orders", authenticate, index);
  app.get("/orders/:id", authenticate, show);
  app.post("/orders", authenticate, create);
  // add product
  app.post("/orders/:id/products", authenticate, addProduct);
};

const store = new orderStore();
const create = async (req: Request, res: Response) => {
  try {
    const addedOrder = await store.create(req.body);
    res.json(addedOrder);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show();
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};
const index = async (req: Request, res: Response) => {
  try {
    const allOrders = await store.indexOrders();
    res.json(allOrders);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

// ... other methods
const addProduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  const quantity: number = parseInt(req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

export default orderRoute;
