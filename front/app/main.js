import "./styles/style.css";
/************** DOM element **************/
const shortenBtnEl = document.getElementById("shorten-btn");
const loginBtnEl = document.getElementById("login-btn");
const urlInputEl = document.getElementById("url-input");
const usernameInputEl = document.getElementById("username-input");
const newUrlDivEl = document.getElementById("new-url-div");
const loginDivEl = document.getElementById("login-div");
const shortenDivEl = document.getElementById("shorten-div");
const statisticDivEl = document.getElementById("statistics-div");
/************** DOM element **************/

/************** Global variables **************/
const baseUrl = "http://localhost:3000/";
let userName = "";
/************** Global variables **************/

/************** Event listener **************/
shortenBtnEl.addEventListener("click", postUrl);
loginBtnEl.addEventListener("click", saveUsername);
/************** Event listener **************/

/************** Show the correct div **************/
function saveUsername() {
  userName = usernameInputEl.value;
  if (!usernameInputEl.value) {
    userName = "username";
  }
  loginDivEl.style.display = "none";
  shortenDivEl.style.display = "block";
  showStatistic();
}
/************** Show the correct div **************/
urlInputEl.addEventListener("keyup", enterPostUrl);
usernameInputEl.addEventListener("keyup", enterSaveUsername);

function enterSaveUsername(event) {
  if (event.keyCode === 13) {
    saveUsername();
  }
}

function enterPostUrl(event) {
  if (event.keyCode === 13) {
    postUrl();
  }
}

async function postUrl() {
  try {
    newUrlDivEl.removeChild(newUrlDivEl.firstChild);
    if (!isValidHttpUrl(urlInputEl.value)) {
      newUrlDivEl.innerText = "The URL is not valid";
      newUrlDivEl.style.display = "block";
      return;
    }
    const response = await axios.post(`${baseUrl}short`, {
      url: `${urlInputEl.value}`,
      username: userName,
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

async function showStatistic() {
  const response = await axios.get(`${baseUrl}statistic/${userName}`);
  for (let i of response.data) {
    const div = document.createElement("div");
    div.classList.add("statistic-div");
    div.innerText += `Short URL: ${JSON.stringify(i.shortUrl)}\n
    Long URL: ${JSON.stringify(i.longUrl)}\n
    Creation date: ${JSON.stringify(i.creationDate)}\n 
    redirect Count: ${JSON.stringify(i.redirectCount)} `;
    statisticDivEl.appendChild(div);
  }
  statisticDivEl.style.display = "block";
}
