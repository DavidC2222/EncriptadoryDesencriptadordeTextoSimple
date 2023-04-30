const encryptButton = document.querySelector(
  ".button-container .button:nth-child(1)"
);
const decryptButton = document.querySelector(
  ".button-container .button:nth-child(2)"
);
const copyButton = document.querySelector(".copy-button");
const inputText = document.querySelector(".input-text");
const result = document.querySelector(".result");
const emptyResult = document.querySelector(".empty-result");
const errorPopup = document.querySelector(".error-popup");
const closeErrorButton = document.querySelector(".close-error");

function isValidCharacter(character) {
  const validCharacters = /^[a-z\s]+$/;
  return validCharacters.test(character);
}

function encrypt(text) {
  const encryptionRules = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };

  let encryptedText = text.replace(
    /[eioua]/g,
    (letter) => encryptionRules[letter]
  );
  return encryptedText;
}

function decrypt(encryptedText) {
  const decryptionRules = {
    enter: "e",
    imes: "i",
    ai: "a",
    ober: "o",
    ufat: "u",
  };

  let decryptedText = encryptedText.replace(
    /(enter|imes|ai|ober|ufat)/g,
    (keyword) => decryptionRules[keyword]
  );
  return decryptedText;
}

function showErrorPopup() {
  errorPopup.style.display = "flex";
}

encryptButton.addEventListener("click", () => {
  const text = inputText.value;
  if (!text.split("").every(isValidCharacter)) {
    showErrorPopup();
    return;
  }
  const encryptedText = encrypt(text);
  emptyResult.style.display = "none";
  result.textContent = encryptedText;
});

decryptButton.addEventListener("click", () => {
  const text = inputText.value;
  if (!text.split("").every(isValidCharacter)) {
    showErrorPopup();
    return;
  }
  const decryptedText = decrypt(text);
  emptyResult.style.display = "none";
  result.textContent = decryptedText;
});

function copyTextToClipboard(text) {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
}

copyButton.addEventListener("click", () => {
  const textToCopy = result.textContent;
  copyTextToClipboard(textToCopy);
});

closeErrorButton.addEventListener("click", () => {
  errorPopup.style.display = "none";
});
