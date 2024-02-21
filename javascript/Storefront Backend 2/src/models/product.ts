import client from "../database";

export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(b: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, price, quantity) VALUES($1, $2, $3) RETURNING *";
      const conn = await client.connect();

      const result = await conn.query(sql, [b.name, b.price, b.quantity]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${b.name}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const sql = "DELETE FROM products WHERE id=($1)";
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
