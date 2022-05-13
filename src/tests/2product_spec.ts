import { productStore } from "../models/product";

const storeProduct = new productStore();

describe("product Model", () => {
  it("should have an indexProduct method", () => {
    expect(storeProduct.indexProduct).toBeDefined();
  });
  it("create method should add a product", async () => {    
    const result: {} = await storeProduct.create({
      name: "tea",
      price: "10",
    });    
    expect(result).toEqual({
      id: 1,
      name: "tea",
      price: 10,
    });
  });

  it("index method should return a list of product", async () => {
    const result: {} = await storeProduct.indexProduct();
    expect(result).toEqual([
      {
        id: 1,
        name: "tea",
        price: 10,
      },
    ]);
  });

  it("show method should return the correct product", async () => {
    const result: {} = await storeProduct.show(1);
    expect(result).toEqual({
      id: 1,
      name: "tea",
      price: 10,
    });
  });
});
