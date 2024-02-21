import client from "../database";

export type ProductOrder = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class ProductOrderStore {
  async index(): Promise<ProductOrder[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM product_orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get product_orders ${err}`);
    }
  }

  async show(id: number): Promise<ProductOrder> {
    try {
      const sql = "SELECT * FROM product_orders WHERE id=($1)";
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product_order ${id}. Error: ${err}`);
    }
  }

  async create(b: ProductOrder): Promise<ProductOrder> {
    try {
      const sql =
        "INSERT INTO product_orders (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
      const conn = await client.connect();

      const result = await conn.query(sql, [
        b.order_id,
        b.product_id,
        b.quantity,
      ]);

      const product_order = result.rows[0];

      conn.release();

      return product_order;
    } catch (err) {
      throw new Error(`Could not add new product_order. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const sql = "DELETE FROM product_orders WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not delete product_order ${id}. Error: ${err}`);
    }
  }
}
