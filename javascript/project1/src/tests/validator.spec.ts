const { getImageFile } = require("../middleware/validator");

describe("Verify fuction getImageFile", () => {
  it("Find imgage fjord on images folder", async () => {
    const imgName = await getImageFile("fjord");
    expect(imgName == "fjord.jpg").toBe(true);
  });

  it("Find imgage encenadaport on images folder", async () => {
    const imgName = await getImageFile("encenadaport");
    expect(imgName == "encenadaport.jpg").toBe(true);
  });

  it("Find imgage icelandwaterfall on images folder", async () => {
    const imgName = await getImageFile("icelandwaterfall");
    expect(imgName == "icelandwaterfall.jpg").toBe(true);
  });

  it("Find imgage palmtunnel on images folder", async () => {
    const imgName = await getImageFile("palmtunnel");
    expect(imgName == "palmtunnel.jpg").toBe(true);
  });

  it("Find imgage santamonica on images folder", async () => {
    const imgName = await getImageFile("santamonica");
    expect(imgName == "santamonica.jpg").toBe(true);
  });

  it("Find imgage invalid on images folder", async () => {
    const imgName = await getImageFile("invalid");
    expect(imgName == "").toBe(true);
  });
});
