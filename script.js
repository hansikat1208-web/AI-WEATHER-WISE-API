async function getWeather() {

    const city = document.getElementById("city").value;
    const weatherDiv = document.getElementById("weather");

    if (city === "") {
        weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    try {

        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {
            weatherDiv.innerHTML = "<p>City not found.</p>";
            return;
        }

        const location = locationData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        const weatherData = await weatherResponse.json();

        weatherDiv.innerHTML = `
            <h2>${location.name}</h2>
            <p>🌡️ Temperature: ${weatherData.current.temperature_2m} °C</p>
            <p>💧 Humidity: ${weatherData.current.relative_humidity_2m}%</p>
            <p>💨 Wind Speed: ${weatherData.current.wind_speed_10m} km/h</p>
        `;

    } catch (error) {

        weatherDiv.innerHTML =
            "<p>Unable to get weather data.</p>";

        console.error(error);
    }
}
