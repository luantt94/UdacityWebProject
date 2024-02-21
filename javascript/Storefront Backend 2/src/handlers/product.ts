import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import { verifyToken } from "../middleware/VerifyToken";

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(Number(req.params.id));
    res.json(product);
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: 0,
      name: <string>req.body.name || "",
      price: Number(<string>req.body.price || "0"),
      quantity: Number(<string>req.body.quantity || ""),
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(Number(req.params.id));
    res.json(deleted);
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", verifyToken, index);
  app.get("/products/:id", verifyToken, show);
  app.post("/products", verifyToken, create);
  app.delete("/products/:id", verifyToken, destroy);
};

export default productRoutes;
