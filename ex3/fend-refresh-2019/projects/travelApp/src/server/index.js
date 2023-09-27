var path = require("path");
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const mockAPIResponse = require("./mockAPI.js");
const dotenv = require("dotenv");
dotenv.config();

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

const user = process.env.USER;
const w_api_key = process.env.WEATHERBIT_API_KEY;
const p_api_key = process.env.PIXABAY_API_KEY;

// I absolutely loved the movie! The plot was captivating, the acting was superb, and the cinematography was stunning. I highly recommend it to everyone!
// I'm really disappointed with the customer service I received. The product arrived late, and when I contacted support, they were unhelpful and rude. I would not recommend this company to anyone.
app.post("/test", function (req, res) {
  const location = req.body.location;
  const remainDay = req.body.remainDay;

  const locationUrl = `https://secure.geonames.org/searchJSON?q=${location}&maxRows=1&username=${user}`;

  axios
    .get(locationUrl)
    .then((response) => response.data)
    .then((data) => {
      // console.log(data);
      let { lat, lng } = data.geonames[0];
      const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${remainDay}&key=${w_api_key}`;
      // console.log(weatherUrl);

      axios
        .get(weatherUrl)
        .then((response) => response.data)
        .then((data) => {
          // console.log(data);
          lastDate = remainDay - 1;
          const { weather, temp, app_max_temp, app_min_temp, datetime } =
            data.data[lastDate];
          const { description } = weather;

          const pixabayUrl = `https://pixabay.com/api/?key=${p_api_key}&q=${location}&image_type=photo`;
          axios
            .get(pixabayUrl)
            .then((response) => response.data)
            .then((data) => {
              const img = data.hits[0].webformatURL;
              const weatherData = {
                description,
                temp,
                app_max_temp,
                app_min_temp,
                datetime,
                img,
                location,
              };
              console.log(weatherData);
              res.send(weatherData);
            })
            .catch((error) => {
              console.log("Error:", error);
            });
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});
