import sharp from "sharp";
import fs from "fs";
import { result } from "lodash";

export async function imageProcessing(
  filename: string,
  width: string,
  height: string
): Promise<boolean> {
  const newImgName = `${filename}_${width}_${height}.jpg`;
  const newImgPath = `disk\\${newImgName}`;
  const folderPath = "./disk";
  let isExistedImg = false;
  let result = false;
  let names;

  names = await fs.promises.readdir(folderPath);
  console.log("namesnames", names);
  names.forEach((file) => {
    if (file === newImgName) {
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
      .toBuffer()
      .then((data) => {
        console.log("Create images file successfully");
      })
      .catch((err) => {
        console.log("Error happen while create image file", err);
      });
  }
  //Check image is available on disk
  try {
    names = await fs.promises.readdir(folderPath);
    names.forEach((file) => {
      if (file === newImgName) {
        console.log("Image is created and available on disk");
        result = true;
        return;
      }
    });
    if (!result) {
      console.log("Image is not available on disk");
    }
  } catch (err) {
    console.log(err);
    return result;
  }
  return result;
}
