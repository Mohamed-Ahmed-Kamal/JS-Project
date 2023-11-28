let numberInput = document.querySelector("[type = 'number']");
let textInput = document.querySelector("[type = 'text']");
let select = document.querySelector("select");
let creatBtn = document.querySelector("[value= 'Create']");
let resultsBox = document.querySelector(".results");
creatBtn.onclick = (event) => {
  event.preventDefault();
  document.querySelectorAll(".box").forEach((el) => el.remove());
  for (let i = 1; i <= numberInput.value; i++) {
    let newEle = document.createElement(select.value);
    newEle.className = "box";
    newEle.title = "Element";
    newEle.id = `id-${i}`;
    newEle.appendChild(document.createTextNode(textInput.value));
    resultsBox.appendChild(newEle);
  }
};
// start clock ----------------------------------------
let hourHand = document.querySelector(".hour-hand");
let minHand = document.querySelector(".min-hand");
let secHand = document.querySelector(".second-hand");
function setTime() {
  let now = new Date();
  let sec = now.getSeconds();
  let secDegrees = (sec / 60) * 360 + 90;
  secHand.style.transform = `rotate(${secDegrees}deg)`;
  let min = now.getMinutes();
  let minDegrees = (min / 60) * 360 + 90;
  minHand.style.transform = `rotate(${minDegrees}deg)`;
  let hour = now.getHours();
  let hourDegrees = (hour / 12) * 360 + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}
setInterval(setTime, 1000);
// start drams --------------------------------------
window.addEventListener("keydown", function (e) {
  let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  let key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
});
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

let keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
// start css variables --------------------------
let inputs = document.querySelectorAll(".controls input");

function update() {
  let suffix = this.dataset.sizing || "";
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
}
inputs.forEach((input) => input.addEventListener("change", update));
inputs.forEach((input) => input.addEventListener("mousemove", update));
//  start flex box- -----------------------------------------------------

let panel = document.querySelectorAll(".panel");
function opentoggle() {
  this.classList.toggle("open");
}
function openactive(e) {
  console.log(e.propertyName);
  if (e.propertyName.includes("flex")) {
    this.classList.toggle("openActive");
  }
}
panel.forEach((panel) => panel.addEventListener("click", opentoggle));
panel.forEach((panel) => panel.addEventListener("transitionend", openactive));

// <!-- Start Know the population of each American state ----------------- -->

let endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
let cities = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function findthematch(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

function desplayMatches() {
  const matchArray = findthematch(this.value, cities);
  let inf = matchArray.map((place) => {
    return `
    
    <li>
    <span class="name">${place.city},${place.state}</span>
    <span class="population">${place.population}</span>
    </li>
    `;
  });
  if (searchInput.value == "") {
    suggestions.innerHTML = "";
  } else {
    suggestions.innerHTML = inf;
  }
}

let searchInput = document.querySelector(".statePup .search-form .search");
let suggestions = document.querySelector(".statePup .search-form .suggestions");
searchInput.addEventListener("keyup", desplayMatches);
