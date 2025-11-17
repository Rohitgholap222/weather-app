const apiKey = "weather-detection"; // Put your OpenWeather API key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const temp = document.querySelector(".temp");
const cityName = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherIcon = document.getElementById("weatherIcon");

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    if (response.status === 404) {
        alert("City not found. Please enter a valid city name!");
        return;
    }

    const data = await response.json();

    // Update UI
    temp.textContent = `${data.main.temp}°C`;
    cityName.textContent = data.name;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind: ${data.wind.speed} km/h`;

    // Update weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Please enter a city name!");
        return;
    }
    getWeather(city);
});

