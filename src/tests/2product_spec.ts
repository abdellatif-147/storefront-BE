import { productStore } from '../models/product';
import supertest from "supertest";
import app from "../server";
import jwt from "jsonwebtoken";
const secret = process.env.TOKEN_SECRET as string;

const storeProduct = new productStore();
describe('product Model', () => {
  it('should have an indexProduct method', () => {
    expect(storeProduct.indexProduct).toBeDefined();
  });
  it('create method should add a product', async () => {
    const result: {} = await storeProduct.create({
      name: 'tea',
      price: '10',
    });
    expect(result).toEqual({
      id: 1,
      name: 'tea',
      price: 10,
    });
  });

  it('index method should return a list of product', async () => {
    const result: {} = await storeProduct.indexProduct();
    expect(result).toEqual([
      {
        id: 1,
        name: 'tea',
        price: 10,
      },
    ]);
  });

  it('show method should return the correct product', async () => {
    const result: {} = await storeProduct.show(1);
    expect(result).toEqual({
      id: 1,
      name: 'tea',
      price: 10,
    });
  });
});

const request = supertest(app);
describe("product Endpoints", () => {
  const token = jwt.sign({ user: 'abdo' }, secret);

  it("create products endpoint", async () => {
    
    
    const response = await request.post(
      "/products"
    ).set('Authorization', `bearer ${token}`).send({
      name: 'milk',
      price: '20',
    });;
    expect(response.status).toBe(200);
  });
  it("get specific product by id endpoint", async () => {
    const response = await request.get(
      "/products/2"
    )
    expect(response.status).toBe(200);
  });
  it("get products endpoint", async () => {
    const response = await request.get(
      "/products"
    )
    expect(response.status).toBe(200);
  });
});
