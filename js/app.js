import "/css/app.css";

let inputCity = "";
const apiKey = "KEY_API"; //PLEASE, USE YOUR API

function createUrl(key, city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
}

function createNewCard(newCardData) {
  const newCard = document.createElement("div");
  newCard.className = "city-card";
  const cardContent = `
    <h2>${newCardData.city} <span>(${newCardData.country})</span></h2>
    <figure>
        <img
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${newCardData.icon}"
        />
    </figure>
    <div class="temp">${newCardData.temp} <sup>°C</sup></div>
    <div class="desc">${newCardData.description}</div>
  `;
  newCard.innerHTML = cardContent;
  return newCard;
}

function onSubmit() {
  const url = createUrl(apiKey, inputCity);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      hideErrorMessage();
      addCityToCities(data);
      clearInput();
    })
    .catch((err) => {
      showErrorMessage();
    });
}

function showErrorMessage() {
  document.querySelector(".error-message").innerHTML =
    "The city doesn't exist! 😢";
}

function hideErrorMessage() {
  document.querySelector(".error-message").innerHTML = "";
}

function clearInput() {
  document.querySelector('input[type="text"]').value = "";
}

function addCityToCities(rawData) {
  console.log(rawData);
  const newCardData = {
    city: rawData.name,
    country: rawData.sys.country,
    icon: `${rawData.weather[0].icon}.svg`,
    temp: rawData.wind.deg,
    description: `${rawData.weather[0].main}: ${rawData.weather[0].description}`,
  };
  const newCard = createNewCard(newCardData);
  document.querySelector(".cities").appendChild(newCard);
}
function onInput() {
  inputCity = this.value;
}

function bindEvents() {
  // Submit..
  document
    .querySelector('input[type="submit"]')
    .addEventListener("click", onSubmit);

  // Input text..
  document
    .querySelector('input[type="text"]')
    .addEventListener("input", onInput);
}

window.onload = () => {
  document.querySelector('input[type="text"]').value = "";
  bindEvents();
};
