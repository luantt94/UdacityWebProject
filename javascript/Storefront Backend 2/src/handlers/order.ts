import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import { verifyToken } from "../middleware/VerifyToken";

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: 0,
      user_id: Number(<string>req.query.user_id || "0"),
      total_price: 0,
      status: 0,
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyToken, index);
  app.get("/orders/:id", verifyToken, show);
  app.post("/orders", verifyToken, create);
  app.delete("/orders/:id", verifyToken, destroy);
};

export default orderRoutes;
