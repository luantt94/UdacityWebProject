import express, { Router, Request, Response } from "express";
import sharp from "sharp";
import fs from "fs";
// import sharp from "sharp";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { filename, width, height } = req.query;
  const newImgPath = `disk\\${filename}_${width}_${height}.jpg`;
  const folderPath = "./disk";
  let isExistedImg = false;

  const names = await fs.promises.readdir(folderPath);
  names.forEach((file) => {
    if (file.split(".")[0] === filename) {
      isExistedImg = true;
      return;
    }
  });

  if (!isExistedImg) {
    await sharp(`images\\${filename}.jpg`)
      .rotate()
      .resize({ width: Number(width), height: Number(height) })
      .toFile(newImgPath, (err, info) => {
        console.log(info);
      })
      .toBuffer();
  }

  const image = fs.readFileSync(newImgPath);
  res.setHeader("Content-Type", "image/jpeg");
  res.setHeader("Content-Length", image.length);

  res.write(image);
  res.end();
});

export default router;
