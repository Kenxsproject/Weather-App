"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var form = document.querySelector(".top-banner form");
var input = document.querySelector(".top-banner input");
var msg = document.querySelector(".top-banner .msg");
var list = document.querySelector(".ajax-section .cities");
var apiKey = "4d8fb5b93d4af21d66a2948710284366";
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var inputVal = input.value.trim();
  var listItems = list.querySelectorAll(".city");
  var listItemsArray = Array.from(listItems);
  if (listItemsArray.length > 0) {
    var filteredArray = listItemsArray.filter(function (el) {
      var content = "";
      var cityName = el.querySelector(".city-name span").textContent.toLowerCase();
      var countryCode = el.querySelector(".city-name sup").textContent.toLowerCase();
      var fullName = "".concat(cityName, ",").concat(countryCode);
      if (inputVal.includes(",")) {
        var _inputVal$split = inputVal.split(","),
          _inputVal$split2 = _slicedToArray(_inputVal$split, 2),
          inputCity = _inputVal$split2[0],
          inputCountry = _inputVal$split2[1];
        inputVal = inputCity.trim();
        content = inputCountry.trim() === countryCode ? cityName : fullName;
      } else {
        content = cityName;
      }
      return content === inputVal.toLowerCase();
    });
    if (filteredArray.length > 0) {
      var cityName = filteredArray[0].querySelector(".city-name span").textContent;
      msg.textContent = "You already know the weather for ".concat(cityName, "... Otherwise, be more specific by providing the country code as well \uD83D\uDE09");
      form.reset();
      input.focus();
      return;
    }
  }
  var url = "https://api.openweathermap.org/data/2.5/weather?q=".concat(inputVal, "&appid=").concat(apiKey, "&units=metric");
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    var main = data.main,
      name = data.name,
      sys = data.sys,
      weather = data.weather;
    var icon = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/".concat(weather[0].icon, ".svg");
    var li = document.createElement("li");
    li.classList.add("city");
    var markup = "\n        <h2 class=\"city-name\" data-name=\"".concat(name, ",").concat(sys.country, "\">\n          <span>").concat(name, "</span>\n          <sup>").concat(sys.country, "</sup>\n        </h2>\n        <div class=\"city-temp\">").concat(Math.round(main.temp), "<sup>\xB0C</sup></div>\n        <figure>\n          <img class=\"city-icon\" src=\"").concat(icon, "\" alt=\"").concat(weather[0].description, "\">\n          <figcaption>").concat(weather[0].description, "</figcaption>\n        </figure>\n      ");
    li.innerHTML = markup;
    list.appendChild(li);
    msg.textContent = "";
    form.reset();
    input.focus();
  })["catch"](function () {
    msg.textContent = "Please search for a valid city \uD83D\uDE29";
  });
});