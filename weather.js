const inputBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.searchBtn');
const weatherImg = document.querySelector('.weather img');
const temperature = document.querySelector('.temp');
const city = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

async function checkWeather(cityName) {
    const api_key = "1f80203009d811fa84141b0d9cece89a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const weatherData = await response.json();
        // console.log(weatherData);

        // Update UI with fetched data
        temperature.textContent = `${weatherData.main.temp}°C`;
        city.textContent = weatherData.name;
        humidity.textContent = `${weatherData.main.humidity}%`;
        wind.textContent = `${weatherData.wind.speed} Km/h`;

        // Set weather image based on condition
        const weatherCondition = weatherData.weather[0].main;
        weatherImg.src = getWeatherIcon(weatherCondition); // Use a helper function to set icon based on condition
    } catch (error) {
        // console.error(error);
        alert("Location not found!");
    }
}

// Helper function to get icon based on weather condition
function getWeatherIcon(condition) {
    switch (condition.toLowerCase()) {
        case 'clear': return 'sunny.png';
        case 'clouds': return 'cloudy.png';
        case 'rain': return 'rainy.png';
        // Add more conditions as needed
        default: return 'default.png';
    }
}

searchBtn.addEventListener('click', () => {
    const cityName = inputBox.value.trim();
    if (cityName) {
        checkWeather(cityName);
    } else {
        alert("Please enter a city name.");
    }
});

inputBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      searchBtn.click();
    }
});