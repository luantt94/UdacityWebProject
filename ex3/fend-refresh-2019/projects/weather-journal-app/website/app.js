/* Global Variables */
const apiKey = "a120480d1813e997c3f29da55422805e";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

async function getWeatherData(zipCode) {
  const url = `${baseUrl}?zip=${zipCode}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

$("#generate").click(function () {
  zipCode = $("#zip").val();
  feelings = $("#feelings").val();
  // Create a new date instance dynamically with JS
  let d = new Date();
  let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
  getWeatherData(zipCode).then(function (data) {
    // alert(data.main.temp);
    const temp = data.main.temp;
    postData("/data", { temp, feelings, date: newDate });
    updateUI();
  });
});

async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("Error:", error);
  }
}

async function updateUI() {
  const response = await fetch("/data");
  try {
    const data = await response.json();
    // Select the necessary elements on the DOM and update their values
    $("#date").text(`date: ${data.date}`);
    $("#temp").text(`Temperature: ${data.temp}`);
    $("#content").text(`Feels: ${data.feelings}`);
    // alert(s);
  } catch (error) {
    console.log("Error:", error);
  }
}
