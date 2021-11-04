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
const searchStatisticDivEl = document.getElementById("search-statistic-div");
const searchStatisticInputEl = document.getElementById("search-statistic-input");
const searchStatisticBtnEl = document.getElementById("search-statistic-btn");
/************** DOM element **************/

/************** Global variables **************/
const baseUrl = "http://localhost:3000/";
let userName = ""; // to send in the body of the request
/************** Global variables **************/

/************** Event listener **************/
loginBtnEl.addEventListener("click", saveUsername);
usernameInputEl.addEventListener("keyup", enterSaveUsername);
shortenBtnEl.addEventListener("click", createUrlShorten); // for get url shorten
urlInputEl.addEventListener("keyup", enterCreateUrlShorten);
searchStatisticBtnEl.addEventListener("click", searchStatistic); // for search url
searchStatisticInputEl.addEventListener("keyup", enterSearchStatistic);
/************** Event listener **************/

/************** Show the correct div **************/
function saveUsername() {
  userName = usernameInputEl.value;
  if (usernameInputEl.value === "") {
    userName = "guest";
  } else {
    showHistoryUrl(); // if the user is guest i dont want to show the history of url
  }
  loginDivEl.style.display = "none";
  shortenDivEl.style.display = "block";
}
/************** Show the correct div **************/

/************** Search with the enter key **************/
function enterSearchStatistic(event) {
  if (event.keyCode === 13) {
    searchStatistic();
  }
}

function enterSaveUsername(event) {
  if (event.keyCode === 13) {
    saveUsername();
  }
}

function enterCreateUrlShorten(event) {
  if (event.keyCode === 13) {
    createUrlShorten();
  }
}
/************** Search with the enter key **************/

/************** Return shorten url **************/
async function createUrlShorten() {
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
/************** Return shorten url **************/

/************** Check if the URL is valid **************/
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
/************** Check if the URL is valid **************/

/************** Show the URL history of the user **************/
async function showHistoryUrl() {
  const response = await axios.get(`${baseUrl}statistic/${userName}`);
  for (let i of response.data) {
    const div = document.createElement("div");
    div.classList.add("statistic-div");
    div.innerText = `Short URL: ${JSON.stringify(i.shortUrl)}\n
    Long URL: ${JSON.stringify(i.longUrl)}\n
    Creation date: ${JSON.stringify(i.creationDate)}\n 
    redirect Count: ${JSON.stringify(i.redirectCount)} `;
    statisticDivEl.appendChild(div);
  }
  statisticDivEl.style.display = "block";
}
/************** Show the URL history of the user **************/

/************** search URL statistic **************/
async function searchStatistic() {
  searchStatisticDivEl.removeChild(searchStatisticDivEl.firstChild);
  if (searchStatisticInputEl.value === "") {
    const div = document.createElement("div");
    div.classList.add("statistic-div");
    div.innerText = "you must enter somting";
    searchStatisticDivEl.appendChild(div);
    return;
  }
  const searchStatisticInputArr = searchStatisticInputEl.value.split("/");
  const shortId = searchStatisticInputArr[searchStatisticInputArr.length - 1]; // take the short ID from the search input
  const username = searchStatisticInputArr[searchStatisticInputArr.length - 2]; // take the username from the search input
  const response = await axios.get(`${baseUrl}statistic/${username}/${shortId}`);
  const div = document.createElement("div");
  div.classList.add("statistic-div");
  div.innerText += `Short URL: ${JSON.stringify(response.data.shortUrl)}\n
  Long URL: ${JSON.stringify(response.data.longUrl)}\n
  Creation date: ${JSON.stringify(response.data.creationDate)}\n
  redirect Count: ${JSON.stringify(response.data.redirectCount)} `;
  searchStatisticDivEl.appendChild(div);
}
/************** search URL statistic **************/
