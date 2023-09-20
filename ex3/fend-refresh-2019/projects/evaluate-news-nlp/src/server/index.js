var path = require("path");
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const mockAPIResponse = require("./mockAPI.js");

const apiKey = "41f74b36edf6a40471ef3091c2bd9aa5";

const app = express();

app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

// Parse URL-encoded bodies and JSON bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  // res.sendFile(path.resolve("src/client/views/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8080!");
  console.log("*********************");
});
// I absolutely loved the movie! The plot was captivating, the acting was superb, and the cinematography was stunning. I highly recommend it to everyone!
// I'm really disappointed with the customer service I received. The product arrived late, and when I contacted support, they were unhelpful and rude. I would not recommend this company to anyone.
app.post("/test", function (req, res) {
  const text = req.body.text;
  const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&txt=${encodeURIComponent(
    text
  )}`;
  axios
    .get(apiUrl)
    .then((response) => response.data)
    .then((data) => {
      console.log(data);
      // let jsonData = {
      //   message: "haha",
      //   status_msg: data.status.msg,
      //   agreement: data.agreement,
      //   confidence: data.confidence,
      // };
      // You can access the sentiment analysis results here
      // res.send(jsonData);
      res.send(data);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});
