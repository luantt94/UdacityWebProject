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
  if (filename == undefined && width == undefined && height == undefined) {
    err = "<li> Missing filename, height and width.</li>";
  }
  if (filename == undefined && width == undefined && height != undefined) {
    err = "<li> Missing filename and height.</li>";
  }
  if (filename == undefined && width != undefined && height == undefined) {
    err = "<li> Missing filename and width.</li>";
  }
  if (filename == undefined && width != undefined && height != undefined) {
    err = "<li> Missing filename.</li>";
  }
  if (filename != undefined && width == undefined && height == undefined) {
    err = "<li> Missing height and width.</li>";
  }
  if (filename != undefined && width == undefined && height != undefined) {
    err = "<li> Missing width.</li>";
  }
  if (filename != undefined && width != undefined && height == undefined) {
    err = "<li> Missing height.</li>";
  }

  if (filename != undefined) {
    const fullName: string = await getImageFile(filename.toString());

    if (fullName == "") {
      err += `<li>Invalid input for filename e.g. ${filename} </li>`;
    }
  }
  if (width != undefined && !/^\d+$/.test(width.toString())) {
    err += `<li>Invalid input for width e.g.  ${width} </li>`;
  }
  if (height != undefined && !/^\d+$/.test(height.toString())) {
    err += `<li>Invalid input for height e.g.  ${height} </li>`;
  }

  if (err != "") {
    err = `<ol>${err}</ol>`;
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
