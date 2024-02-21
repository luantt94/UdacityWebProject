import client from "../database";

export type Order = {
  id: number;
  user_id: number;
  total_price: number;
  status: number; //0 is not finished; 1 is finished
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(b: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (user_id, total_price, status) VALUES($1, $2, $3) RETURNING *";
      const conn = await client.connect();

      const result = await conn.query(sql, [
        b.user_id,
        b.total_price,
        b.status,
      ]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
