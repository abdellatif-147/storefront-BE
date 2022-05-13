import { orderStore } from "../models/order";

const storeOrder = new orderStore();

describe("order Model", () => {
  it("should have an indexOrder method", () => {
    expect(storeOrder.indexOrders).toBeDefined();
  });
    it('create method should add a order', async () => {   
           
      const result : {} = await storeOrder.create({
        status: 'Active',
        userId: '1'
      });      
      expect(result).toEqual([{
        id: 1,
        status: 'Active',
        user_id: '1'
      }]);
    });

  it("index method should return a list of orders", async () => {
    const result : {} = await storeOrder.indexOrders();
    expect(result).toEqual([
      {
        id: 1,
        status: "Active",
        user_id: "1"
    }
  ]);
  });
  it("index method should add order products", async () => {      
    const result : {} = await storeOrder.addProduct(20,1,1);      
    expect(result).toEqual(
      {
        id: 1,
        quantity: 20,
        order_id: "1",
        product_id: "1"
    }
    );
  });
    it('show method should return the correct order', async () => {
      const result : {} = await storeOrder.show();
      expect(result).toEqual({
        id: 1,
        name: "tea",
        price: 10,
        quantity: 20,
        order_id: "1",
        product_id: "1"
      });
    });
});
