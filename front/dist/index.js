/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/main.js":
/*!*********************!*\
  !*** ./app/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.css */ \"./app/styles/style.css\");\n\r\n/************** DOM element **************/\r\nconst shortenBtnEl = document.getElementById(\"shorten-btn\");\r\nconst loginBtnEl = document.getElementById(\"login-btn\");\r\nconst urlInputEl = document.getElementById(\"url-input\");\r\nconst usernameInputEl = document.getElementById(\"username-input\");\r\nconst newUrlDivEl = document.getElementById(\"new-url-div\");\r\nconst loginDivEl = document.getElementById(\"login-div\");\r\nconst shortenDivEl = document.getElementById(\"shorten-div\");\r\nconst statisticDivEl = document.getElementById(\"statistics-div\");\r\nconst searchStatisticDivEl = document.getElementById(\"search-statistic-div\");\r\nconst searchStatisticInputEl = document.getElementById(\"search-statistic-input\");\r\nconst searchStatisticBtnEl = document.getElementById(\"search-statistic-btn\");\r\n/************** DOM element **************/\r\n\r\n/************** Global variables **************/\r\nconst baseUrl = \"http://localhost:3000/\";\r\nlet userName = \"\"; // to send in the body of the request\r\n/************** Global variables **************/\r\n\r\n/************** Event listener **************/\r\nloginBtnEl.addEventListener(\"click\", saveUsername);\r\nusernameInputEl.addEventListener(\"keyup\", enterSaveUsername);\r\nshortenBtnEl.addEventListener(\"click\", createUrlShorten); // for get url shorten\r\nurlInputEl.addEventListener(\"keyup\", enterCreateUrlShorten);\r\nsearchStatisticBtnEl.addEventListener(\"click\", searchStatistic); // for search url\r\nsearchStatisticInputEl.addEventListener(\"keyup\", enterSearchStatistic);\r\n/************** Event listener **************/\r\n\r\n/************** Show the correct div **************/\r\nfunction saveUsername() {\r\n  userName = usernameInputEl.value;\r\n  if (usernameInputEl.value === \"\") {\r\n    userName = \"guest\";\r\n    loginDivEl.style.display = \"none\";\r\n    shortenDivEl.style.display = \"block\";\r\n    return;\r\n  }\r\n  const usernamepattern = /^[A-Za-z .]{3,15}$/;\r\n  if (!usernamepattern.test(userName)) {\r\n    return alert(\"You must enter valid username\");\r\n  }\r\n  showHistoryUrl(); // if the user is guest i dont want to show the history of url\r\n  loginDivEl.style.display = \"none\";\r\n  shortenDivEl.style.display = \"block\";\r\n}\r\n/************** Show the correct div **************/\r\n\r\n/************** Search with the enter key **************/\r\nfunction enterSearchStatistic(event) {\r\n  if (event.keyCode === 13) {\r\n    searchStatistic();\r\n  }\r\n}\r\n\r\nfunction enterSaveUsername(event) {\r\n  if (event.keyCode === 13) {\r\n    saveUsername();\r\n  }\r\n}\r\n\r\nfunction enterCreateUrlShorten(event) {\r\n  if (event.keyCode === 13) {\r\n    createUrlShorten();\r\n  }\r\n}\r\n/************** Search with the enter key **************/\r\n\r\n/************** Return shorten url **************/\r\nasync function createUrlShorten() {\r\n  try {\r\n    newUrlDivEl.removeChild(newUrlDivEl.firstChild);\r\n    if (!isValidHttpUrl(urlInputEl.value)) {\r\n      newUrlDivEl.innerText = \"The URL is not valid\";\r\n      newUrlDivEl.style.display = \"block\";\r\n      return;\r\n    }\r\n    const response = await axios.post(`/short`, {\r\n      url: `${urlInputEl.value}`,\r\n      username: userName,\r\n    });\r\n    const a = document.createElement(\"a\");\r\n    a.href = response.data;\r\n    a.innerText = `${response.data}`;\r\n    newUrlDivEl.innerText = \"Your new shorten URL: \";\r\n    newUrlDivEl.appendChild(a);\r\n    newUrlDivEl.style.display = \"block\";\r\n  } catch (error) {\r\n    console.log(error.response);\r\n    alert(error.response.data.error);\r\n  }\r\n}\r\n\r\n/************** Return shorten url **************/\r\n\r\n/************** Check if the URL is valid **************/\r\nfunction isValidHttpUrl(string) {\r\n  let url;\r\n  try {\r\n    if (string.length >= 1000) {\r\n      return false;\r\n    }\r\n    url = new URL(string);\r\n  } catch (_) {\r\n    return false;\r\n  }\r\n  return url.protocol === \"http:\" || url.protocol === \"https:\";\r\n}\r\n/************** Check if the URL is valid **************/\r\n\r\n/************** Show the URL history of the user **************/\r\nasync function showHistoryUrl() {\r\n  try {\r\n    const response = await axios.get(`/statistic/${userName}`);\r\n    for (let i of response.data) {\r\n      const div = document.createElement(\"div\");\r\n      div.classList.add(\"statistic-div\");\r\n      div.innerText = `Short URL: ${i.shortUrl}\\n\r\n    Long URL: ${i.longUrl.slice(0, 50)}...\\n\r\n    Creation date: ${i.creationDate}\\n \r\n    redirect Count: ${i.redirectCount} `;\r\n      statisticDivEl.appendChild(div);\r\n    }\r\n    statisticDivEl.style.display = \"block\";\r\n  } catch (error) {\r\n    console.log(error.response);\r\n    alert(error.response.data.error);\r\n  }\r\n}\r\n/************** Show the URL history of the user **************/\r\n\r\n/************** search URL statistic **************/\r\nasync function searchStatistic() {\r\n  if (searchStatisticDivEl.firstChild) {\r\n    searchStatisticDivEl.removeChild(searchStatisticDivEl.firstChild);\r\n  }\r\n  if (!isValidHttpUrl(searchStatisticInputEl.value)) {\r\n    const div = document.createElement(\"div\");\r\n    div.classList.add(\"statistic-div\");\r\n    div.innerText = \"The URL is not valid\";\r\n    searchStatisticDivEl.appendChild(div);\r\n  } else {\r\n    try {\r\n      const searchStatisticInputArr = searchStatisticInputEl.value.split(\"/\");\r\n      const shortId = searchStatisticInputArr[searchStatisticInputArr.length - 1]; // take the short ID from the search input\r\n      const username = searchStatisticInputArr[searchStatisticInputArr.length - 2]; // take the username from the search input\r\n      const response = await axios.get(`/statistic/${username}/${shortId}`);\r\n      const div = document.createElement(\"div\");\r\n      div.classList.add(\"statistic-div\");\r\n      div.innerText = `Short URL: ${response.data.shortUrl}\\n\r\n      Long URL: ${response.data.longUrl.slice(0, 50)}...\\n\r\n      Creation date: ${response.data.creationDate}\\n\r\n      redirect Count: ${response.data.redirectCount} `;\r\n      searchStatisticDivEl.appendChild(div);\r\n    } catch (error) {\r\n      console.log(error.response);\r\n      alert(error.response.data.error);\r\n    }\r\n  }\r\n}\r\n/************** search URL statistic **************/\r\n\r\n/************** for copy with button **************/\r\n// const copyText = document.getElementById(\"newurl\").textContent; // text\r\n// const url = copyText.split(\"copy\")[0];\r\n// navigator.clipboard.writeText(url);\r\n/************** for copy with button **************/\r\n\n\n//# sourceURL=webpack://calc/./app/main.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./app/styles/style.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/styles/style.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"/* @media screen and (min-width: 1000px) { */\\r\\nbody {\\r\\n  font-family: Arial, sans-serif;\\r\\n  font-size: 16px;\\r\\n  color: #222;\\r\\n  background-image: linear-gradient(300deg, rgb(255, 255, 255), rgb(58, 69, 83));\\r\\n  text-align: center;\\r\\n  line-height: 1.4em;\\r\\n}\\r\\n\\r\\nbutton {\\r\\n  background-color: rgb(58, 69, 83); /* Green */\\r\\n  border: none;\\r\\n  color: white;\\r\\n  padding: 15px 32px;\\r\\n  text-align: center;\\r\\n  text-decoration: none;\\r\\n  display: inline-block;\\r\\n  font-size: 16px;\\r\\n  border-radius: 3em;\\r\\n}\\r\\n\\r\\ninput {\\r\\n  border-radius: 3em;\\r\\n  max-width: max-content;\\r\\n  padding: 12px 20px;\\r\\n  margin: 8px 0;\\r\\n  box-sizing: border-box;\\r\\n}\\r\\n#new-url-div {\\r\\n  display: none;\\r\\n  margin: 5%;\\r\\n  border: solid black 3px;\\r\\n  width: 50%;\\r\\n  margin-left: 25%;\\r\\n  margin-right: 25%;\\r\\n  padding: 2%;\\r\\n  background: rgb(177, 214, 206);\\r\\n}\\r\\n.main-div {\\r\\n  margin: 5%;\\r\\n  border: solid black 3px;\\r\\n  width: 50%;\\r\\n  margin-left: 25%;\\r\\n  margin-right: 25%;\\r\\n  padding: 2%;\\r\\n  background: rgb(177, 214, 206);\\r\\n}\\r\\n#shorten-div {\\r\\n  display: none;\\r\\n}\\r\\n#statistics-div {\\r\\n  display: none;\\r\\n}\\r\\n.statistic-div {\\r\\n  border: solid black 3px;\\r\\n  width: 80%;\\r\\n  margin-left: 10%;\\r\\n  margin-right: 10%;\\r\\n  padding: 2%;\\r\\n  background: rgb(177, 214, 206);\\r\\n}\\r\\nfooter {\\r\\n  background-color: rgb(177, 214, 206);\\r\\n  /* margin-right: 15%;\\r\\n  margin-left: 15%; */\\r\\n  width: 100%;\\r\\n  position: fixed;\\r\\n  top: 80%;\\r\\n  font-family: \\\"Poppins\\\", sans-serif;\\r\\n}\\r\\n\\r\\n*:focus,\\r\\n*:active {\\r\\n  outline: none !important;\\r\\n  -webkit-tap-highlight-color: transparent;\\r\\n}\\r\\n.wrapper {\\r\\n  display: inline-flex;\\r\\n  justify-content: center;\\r\\n  align-items: center;\\r\\n}\\r\\n\\r\\n.wrapper .icon {\\r\\n  position: relative;\\r\\n  background-color: #ffffff;\\r\\n  border-radius: 50%;\\r\\n  padding: 10px;\\r\\n  margin-top: 5px;\\r\\n  margin-left: 25px;\\r\\n  width: 30px;\\r\\n  height: 30px;\\r\\n  font-size: 18px;\\r\\n  display: flex;\\r\\n  justify-content: center;\\r\\n  align-items: center;\\r\\n  flex-direction: column;\\r\\n  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);\\r\\n  cursor: pointer;\\r\\n  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);\\r\\n  color: #222;\\r\\n}\\r\\n\\r\\n.wrapper .tooltip {\\r\\n  position: absolute;\\r\\n  top: 0;\\r\\n  font-size: 14px;\\r\\n  background-color: #ffffff;\\r\\n  color: #ffffff;\\r\\n  padding: 5px 8px;\\r\\n  border-radius: 5px;\\r\\n  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);\\r\\n  opacity: 0;\\r\\n  pointer-events: none;\\r\\n  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);\\r\\n}\\r\\n\\r\\n.wrapper .tooltip::before {\\r\\n  position: absolute;\\r\\n  content: \\\"\\\";\\r\\n  height: 8px;\\r\\n  width: 8px;\\r\\n  background-color: #ffffff;\\r\\n  bottom: -3px;\\r\\n  left: 50%;\\r\\n  transform: translate(-50%) rotate(45deg);\\r\\n  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);\\r\\n}\\r\\n\\r\\n.wrapper .icon:hover .tooltip {\\r\\n  top: -45px;\\r\\n  opacity: 1;\\r\\n  visibility: visible;\\r\\n  pointer-events: auto;\\r\\n}\\r\\n\\r\\n.wrapper .icon:hover span,\\r\\n.wrapper .icon:hover .tooltip {\\r\\n  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);\\r\\n}\\r\\n\\r\\n.wrapper .github:hover,\\r\\n.wrapper .github:hover .tooltip,\\r\\n.wrapper .github:hover .tooltip::before {\\r\\n  background-color: #333333;\\r\\n  color: #ffffff;\\r\\n}\\r\\n/* } */\\r\\n\\r\\n/* @media only screen and (max-width: 1000px) {\\r\\n  body {\\r\\n    background-color: brown;\\r\\n  }\\r\\n} */\\r\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://calc/./app/styles/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n\n      content += cssWithMappingToString(item);\n\n      if (needLayer) {\n        content += \"}\";\n      }\n\n      if (item[2]) {\n        content += \"}\";\n      }\n\n      if (item[4]) {\n        content += \"}\";\n      }\n\n      return content;\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://calc/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://calc/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./app/styles/style.css":
/*!******************************!*\
  !*** ./app/styles/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./app/styles/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://calc/./app/styles/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n\n  return updater;\n}\n\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://calc/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n/* istanbul ignore next  */\n\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n\n    memo[target] = styleTarget;\n  }\n\n  return memo[target];\n}\n/* istanbul ignore next  */\n\n\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n\n  target.appendChild(style);\n}\n\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://calc/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\n\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://calc/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\n\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://calc/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n\n  var needLayer = typeof obj.layer !== \"undefined\";\n\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n\n  css += obj.css;\n\n  if (needLayer) {\n    css += \"}\";\n  }\n\n  if (obj.media) {\n    css += \"}\";\n  }\n\n  if (obj.supports) {\n    css += \"}\";\n  }\n\n  var sourceMap = obj.sourceMap;\n\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  options.styleTagTransform(css, styleElement, options.options);\n}\n\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n\n  styleElement.parentNode.removeChild(styleElement);\n}\n/* istanbul ignore next  */\n\n\nfunction domAPI(options) {\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\n\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://calc/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\n\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://calc/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app/main.js");
/******/ 	
/******/ })()
;