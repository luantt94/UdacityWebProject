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
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: <string>req.query.name || "",
      price: Number(<string>req.query.price || "0"),
      quantity: Number(<string>req.query.quantity || ""),
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
    const deleted = await store.delete(req.body.id);
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
