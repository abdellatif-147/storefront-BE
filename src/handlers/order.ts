import Express, { Request, Response } from 'express';
import { orderStore } from '../models/order';
import authenticate from '../middlewares/auth';

const orderRoute = (app: Express.Application) => {
  app.post('/orders', authenticate, create);
  app.get('/orders/:id', authenticate, show);
  app.get('/orders', authenticate, index);
  // add product
  app.post('/orders/:id/products', authenticate, addProduct);
};

const store = new orderStore();
const create = async (req: Request, res: Response) => {
  try {
    const addedOrder = await store.create(req.body);
    res.status(200)
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
    res.status(200)
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
    res.status(200)
    res.json(allOrders);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

// ... other methods
const addProduct = async (req: Request, res: Response) => {
  try {
    const orderId: number = parseInt(req.params.id);
    const productId: number = req.body.productId;
    const quantity: number = parseInt(req.body.quantity);
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

export default orderRoute;
