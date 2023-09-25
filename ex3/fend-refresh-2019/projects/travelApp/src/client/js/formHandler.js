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
      //Clean old results
      document.getElementById("results").innerHTML = "";
      let agreement = document.createElement("h3");
      agreement.innerText = "agreement: " + res.agreement;
      document.getElementById("results").appendChild(agreement);
      let confidence = document.createElement("h3");
      confidence.innerText = "confidence: " + res.confidence;
      document.getElementById("results").appendChild(confidence);

      let detail = document.createElement("h3");
      detail.innerText = "DETAILS:";
      document.getElementById("results").appendChild(detail);

      for (let i = 0; i < res.sentence_list.length; i++) {
        const sentence = document.createElement("h4");
        sentence.innerText = "sentence: " + res.sentence_list[i].text;
        document.getElementById("results").appendChild(sentence);

        agreement = document.createElement("LI");
        agreement.innerText = "agreement: " + res.sentence_list[i].agreement;
        document.getElementById("results").appendChild(agreement);

        confidence = document.createElement("LI");
        confidence.innerText = "confidence: " + res.sentence_list[i].confidence;
        document.getElementById("results").appendChild(confidence);
      }
    });
}

function validateInput(formText) {
  // check what text was put into the form field
  return checkForName(formText);
}

export { handleSubmit, validateInput };
