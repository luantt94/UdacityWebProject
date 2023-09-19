function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;
  checkForName(formText);

  console.log("::: Form Submitted :::");
  fetch("http://localhost:8080/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: formText }),
  })
    .then((res) => res.json())
    .then(function (res) {
      document.getElementById("results").innerHTML = res.message;
      console.log(res.message);
    });
}

export { handleSubmit };
