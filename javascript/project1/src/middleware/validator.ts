import express from "express";
import fs from "fs";
import { NextFunction } from "express";

export async function validator(
  req: express.Request,
  res: express.Response,
  next: NextFunction
): Promise<void> {
  const { filename, width, height } = req.query;

  let err = "";
  err += filename == undefined ? "filename is undefined. " : "";
  err += width == undefined ? "width is undefined. " : "";
  err += height == undefined ? "height is undefined. " : "";
  if (filename != undefined) {
    const fullName: string = await getImageFile(filename.toString());

    if (fullName == "") {
      err += filename + " does not exists. ";
    }
  }
  if (width != undefined && !/^\d+$/.test(width.toString())) {
    err += ". The value of width is not valid";
  }
  if (height != undefined && !/^\d+$/.test(height.toString())) {
    err += ". The value of height is not valid";
  }

  if (err != "") {
    res.status(400).send(err);
  } else {
    next();
  }
}

export async function getImageFile(filename: string): Promise<string> {
  const folderPath = "./images";
  let result = "";
  let names;

  try {
    names = await fs.promises.readdir(folderPath);
    names.forEach((file) => {
      const f = file.split(".")[0];

      if (f === filename) {
        result = file;
        return;
      }
    });
  } catch (err) {
    console.log(err);
  }

  return result;
}
