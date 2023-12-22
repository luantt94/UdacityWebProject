import { imageProcessing } from "../controller/imageProcessing";
import fs from "fs";

describe("Test endpoint responses", () => {
  it("gets the api endpoint", async () => {
    const filename = "fjord";
    await imageProcessing(filename, "300", "200");

    const folderPath = "./disk";
    let isExistedImg = false;

    const names = await fs.promises.readdir(folderPath);
    console.log("names", names);
    names.forEach((file) => {
      if (file === "fjord_300_200.jpg") {
        isExistedImg = true;
        return;
      }
    });

    expect(isExistedImg).toBe(true);
  });
});
