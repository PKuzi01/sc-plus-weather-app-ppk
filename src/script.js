//to get the info from api
function info(response) {
    console.log(response.data);
}
axios.get(apiUrl).then(info);

//date and time
function formatDate (timestamp) {
    let date = new Date(timestamp);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    let day = days[date.getDay()];
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    return `${day} ${hour}:${minute},`;
}

//current temp details
function showCurrentWeather(response) {
    let city = document.querySelector("#city");
    city.innerHTML = response.data.city;

    let description = document.querySelector("#description");
    description.innerHTML = response.data.condition.description;

    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = Math.round(response.data.temperature.current);

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.temperature.humidity}%`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = `${response.data.wind.speed}km/h`;

    let date = document.querySelector("#date");
    date.innerHTML = formatDate(response.data.time * 1000);

    let icon = document.querySelector("#current-icon");
    icon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);

    celsiusTemp = response.data.temperature.current;
}

function searchCity(city) {
    let apiKey = `9a96e3865c186c9fbo4aaef0cdb0e0dt`;

    let apiUrl1 = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl1).then(showCurrentWeather);

    let apiUrl2 = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl2).then(showForecast);
}

function manageSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input").value;
    searchCity(cityInput);
}

//celsius to fahrenheit
function showFahrenheit(event) {
    event.preventDefault();
        //possible sol for unit conversion
        //remove the "active" class from the celsius
        //celsius.classList.remove("active");
        //add the "active" class to fahrenheit
        //fahrenheit.classList.add("active");
    let temperature = document.querySelector("#current-temp");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    temperature.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
    event.preventDefault();
    let temperature = document.querySelector("#current-temp");
    temperature.innerHTML = Math.round(celsiusTemp);
}
//global 
//fahrenheit to celsius
let celsiusTemp = null;

//for search engine
let form = document.querySelector("#search-form");
form.addEventListener("submit", manageSubmit);

//celsius to fahrenheit
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

//fahrenheit to celsius
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

//default city
searchCity("Johannesburg");