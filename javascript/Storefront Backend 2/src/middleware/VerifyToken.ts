import express from "express";
import { NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function verifyToken(
  req: express.Request,
  res: express.Response,
  next: NextFunction
): Promise<void> {
  if (req.headers.authorization == undefined) {
    res.send("authorization == undefined");
  } else {
    const authorizationHeader: string = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];
    const secret = process.env.TOKEN_SECRET || "";
    console.log("token", token);
    console.log("secret", secret);
    jwt.verify(token, secret, (err) => {
      if (err) {
        console.log("Token verification failed:", err.message);
        res.send("Token verification failed:" + err.message.toString());
      } else {
        console.log("Token verified successfully!");
        next();
      }
    });
  }
}
