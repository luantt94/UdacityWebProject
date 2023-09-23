const isValidURL = (url) => {
  const urlPattern =
    /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6}\.?)(\/[\w.-]*)*\/?$/;
  return urlPattern.test(url);
};

function checkForName(inputText) {
  if (inputText == "" || isValidURL(inputText)) {
    return false;
  }
  return true;
}

export { checkForName };
