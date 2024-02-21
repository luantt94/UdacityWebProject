import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/VerifyToken";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(Number(req.params.id));
    res.json(user);
  } catch (err) {
    throw new Error(`Error: ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      id: 0,
      username: <string>req.body.username || "",
      password: <string>req.body.password || "",
      password_digest: "",
      email: <string>req.body.email || "",
    };

    const newUser = await store.create(user);
    const secret = process.env.TOKEN_SECRET || "TOKEN_SECRET";
    const token = jwt.sign({ user: newUser }, secret);
    console.log("token sign", token);
    res.json(token);
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

const userRoutes = (app: express.Application) => {
  app.get("/users", verifyToken, index);
  app.get("/users/:id", verifyToken, show);
  app.post("/users", create);
  app.delete("/users/:id", verifyToken, destroy);
};

export default userRoutes;
