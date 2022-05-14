import client from '../database';

export interface order {
  status: string;
  order_id: number;
}
export interface Order {
  quantity: number;
  order_id: number;
  product_id: number;
}

export class orderStore {
  async indexOrders(): Promise<order[]> {
    try {
      const conect = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conect.query(sql);
      conect.release();
      return result?.rows;
    } catch (err) {
      throw new Error(`cannot get orders ${err}`);
    }
  }
  async show(): Promise<order[]> {
    try {
      const sql =
        'SELECT * FROM products as p INNER JOIN order_products ON order_products.id = p.id';
      const conect = await client.connect();
      const result = await conect.query(sql);
      conect.release();
      return result?.rows[0];
    } catch (err) {
      console.log(err);
      throw new Error(`cannot get orders ${err}`);
    }
  }
  async create(body: { [key: string]: string }): Promise<order[]> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      const conect = await client.connect();
      const result = await conect.query(sql, [body.status, body.userId]);
      conect.release();
      return result?.rows;
    } catch (err) {
      console.log(err);
      throw new Error(`cannot get orders ${err}`);
    }
  }
  async addProduct(
    quantity: number,
    orderId: number,
    productId: number,
  ): Promise<Order> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      //@ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];
      conn.release();

      return order;
    } catch (err) {
      console.log(err);
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`,
      );
    }
  }
}
