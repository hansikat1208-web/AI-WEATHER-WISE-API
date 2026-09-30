async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const result = document.getElementById("weatherResult");

    if (city === "") {
        result.innerHTML = "Please enter a city name.";
        return;
    }

    result.innerHTML = "Loading weather information...";

    try {
        // Find city
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            result.innerHTML = "City not found.";
            return;
        }

        const location = geoData.results[0];

        // Get weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&timezone=auto`
        );

        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        result.innerHTML = `
            <h2>${location.name}</h2>

            <h3>🌡️ Temperature</h3>
            <p>${current.temperature_2m} °C</p>

            <h3>💧 Humidity</h3>
            <p>${current.relative_humidity_2m}%</p>

            <h3>💨 Wind Speed</h3>
            <p>${current.wind_speed_10m} km/h</p>

            <p>Feels like: ${current.apparent_temperature} °C</p>
        `;

    } catch (error) {
        console.error(error);
        result.innerHTML = "Unable to get weather data.";
    }
}