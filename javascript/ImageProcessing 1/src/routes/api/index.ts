import express, { Router, Request, Response } from "express";
import fs from "fs";
import { imageProcessing } from "../../controller/imageProcessing";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  // const filename: string = <string>req.query.filename || "";
  // const width: string = <string>req.query.width || "";
  // const height: string = <string>req.query.height || "";
  const { filename, width, height } = req.query as {
    filename: string;
    width: string;
    height: string;
  };

  const newImgPath = `disk\\${filename}_${width}_${height}.jpg`;
  const result: boolean = await imageProcessing(filename, width, height);
  if (!result) {
    res
      .status(400)
      .send(
        "There is some err while looking your files, try to refresh the page"
      );
    return;
  }

  const image = fs.readFileSync(newImgPath);
  res.setHeader("Content-Type", "image/jpeg");
  res.setHeader("Content-Length", image.length);

  res.write(image);
  res.end();
});

export default router;
