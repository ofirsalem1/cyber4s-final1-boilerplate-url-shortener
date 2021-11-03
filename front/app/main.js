import "./styles/style.css";
const shortenBtnEl = document.getElementById("shorten-btn");
const urlInputEl = document.getElementById("url_input");
const newUrlDivEl = document.getElementById("new-url-div");

const baseUrl = "http://localhost:3000/short/";

shortenBtnEl.addEventListener("click", postUrl);

async function postUrl() {
  const response = await axios.post(baseUrl, {
    url: `${urlInputEl.value}`,
  });
  newUrlDivEl.innerText = `Your new URL: ${response.data}`;
  newUrlDivEl.style.display = "block";
}
