import { checkForName } from "./nameChecker";

function handleSubmit(event) {
  event.preventDefault();
  let location = document.getElementById("location").value;
  let date_depart = document.getElementById("departing").value;
  let current_date = new Date();
  let remainDay =
    Math.ceil(
      (new Date(date_depart).getTime() - current_date.getTime()) /
        (1000 * 3600 * 24)
    ) + 1;

  if (!validateInput(location)) {
    alert("Location should not be empty or url");
    return;
  }

  console.log("::: Form Submitted :::");
  fetch("http://localhost:8081/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ location, remainDay }),
  })
    .then((res) => res.json())
    .then(function (res) {
      localStorage.setItem("currentTrip", JSON.stringify(res));
      document.getElementById("results").innerHTML = "";

      let myTripTo = document.createElement("h1");
      myTripTo.innerText = "My trip to: " + res.location;

      let min_max_temp = document.createElement("h4");
      min_max_temp.innerText =
        "Hight - " + res.app_max_temp + ", Low - " + res.app_min_temp;

      let text = document.createElement("h1");
      text.innerText = "Typical weather for then is: ";

      let datetime = document.createElement("h4");
      datetime.innerText = "Departing: " + res.datetime;

      let img = document.createElement("img");
      img.src = res.img;
      // img.alt = res.description;

      let description = document.createElement("h4");
      description.innerText =
        "Mostly " + res.description + " throughout the day.";

      document.getElementById("results").appendChild(myTripTo);
      document.getElementById("results").appendChild(datetime);
      document.getElementById("results").appendChild(text);
      document.getElementById("results").appendChild(min_max_temp);
      document.getElementById("results").appendChild(description);

      document.getElementById("results").appendChild(img);
      $("#saveTrip").prop("disabled", false);
    });
}

function validateInput(formText) {
  // check what text was put into the form field
  return checkForName(formText);
}

$("#deleteAllTrips").click(function () {
  localStorage.setItem("myTrips", null);
  updateListTrips();
});

$("#saveTrip").click(function () {
  let res = JSON.parse(localStorage.getItem("currentTrip"));
  let myTrips = JSON.parse(localStorage.getItem("myTrips"));

  if (myTrips == null) {
    myTrips = { trips: [] };
  }
  myTrips.trips.push(res);
  localStorage.setItem("myTrips", JSON.stringify(myTrips));

  updateListTrips();
  localStorage.setItem("currentTrip", null);
  document.getElementById("results").innerHTML = "";
  $("#saveTrip").prop("disabled", true);
});

function updateListTrips() {
  $("#listTrips").html("");
  let myTrips = JSON.parse(localStorage.getItem("myTrips"));

  if (myTrips != null) {
    myTrips.trips.forEach(function (item) {
      let div = document.createElement("div");

      let myTripTo = document.createElement("h2");
      myTripTo.innerText = "My trip to: " + item.location;

      let min_max_temp = document.createElement("h5");
      min_max_temp.innerText =
        "Hight - " + item.app_max_temp + ", Low - " + item.app_min_temp;

      let text = document.createElement("h2");
      text.innerText = "Typical weather for then is: ";

      let datetime = document.createElement("h5");
      datetime.innerText = "Departing: " + item.datetime;

      let img = document.createElement("img");
      img.src = item.img;
      // img.alt = item.description;

      let description = document.createElement("h5");
      description.innerText =
        "Mostly " + item.description + " throughout the day.";

      div.appendChild(myTripTo);
      div.appendChild(datetime);
      div.appendChild(text);
      div.appendChild(min_max_temp);
      div.appendChild(description);

      div.appendChild(img);

      $("#listTrips").append(div);
    });
  }
}
export { handleSubmit, validateInput, updateListTrips };
