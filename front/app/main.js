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
  const a = document.createElement("a");
  a.href = response.data;
  a.innerText = `${response.data}`;
  newUrlDivEl.appendChild(a);
  newUrlDivEl.style.display = "block";
}
