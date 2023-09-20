function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  //   checkForName(formText);

  console.log("::: Form Submitted :::");
  fetch("http://localhost:8081/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: formText }),
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
      console.log("CHANGE!!");
    });
}

export { handleSubmit };
