import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  console.log("create", req.body);
  try {
    const user: User = {
      id: 0,
      username: <string>req.body.username || "",
      password: <string>req.body.password || "",
      email: <string>req.body.email || "",
      password_digest: "",
    };

    const newUser = await store.create(user);
    const secret = process.env.TOKEN_SECRET || "TOKEN_SECRET";
    var token = jwt.sign({ user: newUser }, secret);
    console.log("token sign", token);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.delete("/users/:id", destroy);
};

export default userRoutes;
