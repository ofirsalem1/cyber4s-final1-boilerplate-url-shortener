import "./styles/style.css";
const shortenBtnEl = document.getElementById("shorten-btn");
const urlInputEl = document.getElementById("url_input");
const newUrlDivEl = document.getElementById("new-url-div");

const baseUrl = "http://localhost:3000/short/";

shortenBtnEl.addEventListener("click", postUrl);

async function postUrl() {
  try {
    newUrlDivEl.removeChild(newUrlDivEl.firstChild);
    if (!isValidHttpUrl(urlInputEl.value)) {
      newUrlDivEl.innerText = "The URL is not valid";
      newUrlDivEl.style.display = "block";
      return;
    }
    const response = await axios.post(baseUrl, {
      url: `${urlInputEl.value}`,
    });
    const a = document.createElement("a");
    a.href = response.data;
    a.innerText = `${response.data}`;
    newUrlDivEl.appendChild(a);
    newUrlDivEl.style.display = "block";
  } catch (error) {
    console.log(error.response);
    alert(error.response.data);
  }
}

function isValidHttpUrl(string) {
  let url;
  try {
    if (string.length >= 1000) {
      return false;
    }
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
