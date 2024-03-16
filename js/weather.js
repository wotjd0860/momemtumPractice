/* This api key is from "https://openweathermap.org/", If you want to check this function,
you can sign up and get your own api key for it. That site is free 

1. create apikey.js file in the "js" folder
2. create const valuable in the apikey.js file ex) const apikeys = {API_KEY_WEATHER: "your api key"}
*/
const API_KEY = apiKeys.API_KEY_WEATHER;

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log("you live in", lat, lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");
            city.innerText = data.name;
            weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
        });
}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);