import { orderStore } from "../models/order";

const store = new orderStore();

describe("order Model", () => {
  it("should have an index method", () => {
    expect(store.indexOrders).toBeDefined();
  });
    it('create method should add a order', async () => {
      const result : {} = await store.create({
        status: 'Active',
        user_id: '1'
      });
      expect(result).toEqual({
        id: "1",
        status: 'Active',
        user_id: '1'
      });
    });

  it("index method should return a list of orders", async () => {
    const result : {} = await store.indexOrders();
    expect(result).toEqual([
      {
        id: 1,
        status: "Active",
        user_id: "1"
    }
    ]);
  });

    it('show method should return the correct order', async () => {
      const result : {} = await store.show();
      expect(result).toEqual({
        id: 1,
        name: "milk",
        price: 20,
        quantity: 20,
        order_id: "1",
        product_id: "1"
      });
    });
});
