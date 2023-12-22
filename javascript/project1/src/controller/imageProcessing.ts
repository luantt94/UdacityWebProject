import sharp from "sharp";
import fs from "fs";

export async function imageProcessing(
  filename: string,
  width: string,
  height: string
) {
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
}
