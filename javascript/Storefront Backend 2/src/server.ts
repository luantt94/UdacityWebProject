import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import Client from "./database";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/products", async function (req: Request, res: Response) {
  const conn = await Client.connect();
  const sql = "SELECT * FROM products";
  const result = await conn.query(sql);
  console.log(result.rows);
  conn.release();
  res.send("Hello World!");
});

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(3000, async function () {
  console.log(`starting app on: ${address}`);
});
