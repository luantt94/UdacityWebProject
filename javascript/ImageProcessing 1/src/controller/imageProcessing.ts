import sharp from "sharp";
import fs from "fs";

function delay(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function waitImageCreated(
  newImgName: string,
  folderPath: string
): Promise<boolean> {
  let isCreated: boolean = false;
  let names;
  let retry = 0;
  while (!isCreated && retry < 5) {
    try {
      retry += 1;
      await delay(1000);
      names = await fs.promises.readdir(folderPath);
      names.forEach((file) => {
        if (file === newImgName) {
          console.log("Image is created and available on disk");
          isCreated = true;
          return;
        }
      });
      if (!isCreated && retry < 5) {
        console.log("Image is not available on disk, wait 1 more second");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return isCreated;
}

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

  const names = await fs.promises.readdir(folderPath);
  names.forEach((file) => {
    if (file === newImgName) {
      isExistedImg = true;
      return;
    }
  });

  if (!isExistedImg) {
    await sharp(`images\\${filename}.jpg`)
      .resize({ width: Number(width), height: Number(height) })
      .toFile(newImgPath, (err, info) => {
        console.log(info);
      })
      .toBuffer();
  }
  //Check image is available on disk
  await waitImageCreated(newImgName, folderPath).then(
    (data) => (result = data)
  );
  return result;
}
