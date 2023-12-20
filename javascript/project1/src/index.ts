import express from "express";
import router from "../routes/api";
import validator from "../middleware/validator";

const app = express();
const port = 3000;

app.use("/api/images", validator, router);
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
