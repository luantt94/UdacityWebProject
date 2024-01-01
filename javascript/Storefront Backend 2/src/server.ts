import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productRoutes from "./handlers/product";
import userRoutes from "./handlers/user";
import orderRoutes from "./handlers/order";
import productOrderRoutes from "./handlers/product_order";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

productRoutes(app);
userRoutes(app);
orderRoutes(app);
productOrderRoutes(app);

app.listen(3000, async function () {
  console.log(`starting app on: ${address}`);
});
