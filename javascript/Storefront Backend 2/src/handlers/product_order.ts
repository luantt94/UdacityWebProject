import express, { Request, Response } from "express";
import { ProductOrder, ProductOrderStore } from "../models/product_order";
import { verifyToken } from "../middleware/VerifyToken";

const store = new ProductOrderStore();

const index = async (req: Request, res: Response) => {
  const product_orders = await store.index();
  res.json(product_orders);
};

const show = async (req: Request, res: Response) => {
  const product_order = await store.show(req.params.id);
  res.json(product_order);
};

const create = async (req: Request, res: Response) => {
  try {
    const product_order: ProductOrder = {
      order_id: Number(<string>req.query.order_id || "0"),
      product_id: Number(<string>req.query.product_id || "0"),
      quantity: Number(<string>req.query.quantity || "0"),
    };

    const newProductOrder = await store.create(product_order);
    res.json(newProductOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const productOrderRoutes = (app: express.Application) => {
  app.get("/product_orders", verifyToken, index);
  app.get("/product_orders/:id", verifyToken, show);
  app.post("/product_orders", verifyToken, create);
  app.delete("/product_orders/:id", verifyToken, destroy);
};

export default productOrderRoutes;
