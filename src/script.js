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

    getForecast(response.data.coordinates);
}

//date of forecast
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    return days[day];
}

//forecast
function displayForecast(response) {
    let forecast = (response.data.daily);
    let forecastElement = document.querySelector("#weather-forecast");

    let forecastHTML = `<div class="row fiveDay" id="fiveDay">`;

    forecast.forEach(function(forecastDay, index) {
        if (index < 5) {
        forecastHTML = forecastHTML + 
            `
                <div class="col p-2">
                    <p class="dateForecast" id="date-forecast">${formatDay(forecastDay.time)}</p>
                    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" id="icon" class="fiveDayIcon" width="50">
                    <div class="fiveDay1">
                        <span id="five-day-max">${Math.round(forecastDay.temperature.maximum)}°</span>
                        <span id="five-day-min" class="fiveDayMin">${Math.round(forecastDay.temperature.minimum)}°</span>
                    </div>  
                </div>
           `;} 
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

//getting coords for forecast
function getForecast(coordinates) {
    let apiKey = `9a96e3865c186c9fbo4aaef0cdb0e0dt`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function searchCity(city) {
    let apiKey = `9a96e3865c186c9fbo4aaef0cdb0e0dt`;

    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showCurrentWeather);
}

function manageSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input").value;
    searchCity(cityInput);
}

//global 
//for search engine
let form = document.querySelector("#search-form");
form.addEventListener("submit", manageSubmit);


//default city
searchCity("Johannesburg");
