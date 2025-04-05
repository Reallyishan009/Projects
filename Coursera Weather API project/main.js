// Global variables
let citiesData = [];
let selectedCity = null;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    loadCitiesData(); // Load and display cities in dropdown
});

// Load and parse city data
function loadCitiesData() {
    // Inline city data instead of fetching from CSV file
    const cityCoordinatesData = `latitude,longitude,name,country
52.367,4.904,Amsterdam,Netherlands
39.933,32.859,Ankara,Turkey
56.134,12.945,Åstorp,Sweden
37.983,23.727,Athens,Greece
54.597,-5.93,Belfast,UK
41.387,2.168,Barcelona,Spain
52.52,13.405,Berlin,Germany
46.948,7.447,Bern,Switzerland
43.263,-2.935,Bilbao,Spain
50.847,4.357,Brussels,Belgium
47.497,19.04,Bucharest,Romania
59.329,18.068,Budapest,Hungary
51.483,-3.168,Cardiff,UK
50.937,6.96,Cologne,Germany
55.676,12.568,Copenhagen,Denmark
51.898,-8.475,Cork,Ireland
53.349,-6.26,Dublin,Ireland
55.953,-3.188,Edinburgh,UK
43.7696,11.255,Florence,Italy
50.11,8.682,Frankfurt,Germany
43.254,6.637,French Riviera,France
32.65,-16.908,Funchal,Portugal
57.708,11.974,Gothenburg,Sweden
53.548,9.987,Hamburg,Germany
60.169,24.938,Helsinki,Finland
39.02,1.482,Ibiza,Spain
50.45,30.523,Kyiv,Ukraine
61.115,10.466,Lillehammer,Norway
38.722,-9.139,Lisbon,Portugal
51.507,-0.127,London,UK
40.416,-3.703,Madrid,Spain
39.695,3.017,Mallorca,Spain
53.48,-2.242,Manchester,UK
43.296,5.369,Marseille,France
27.76,-15.586,Maspalomas,Spain
45.464,9.19,Milan,Italy
48.135,11.582,Munich,Germany
40.851,14.268,Naples,Italy
43.034,-2.417,Oñati,Spain
59.913,10.752,Oslo,Norway
48.856,2.352,Paris,France
50.075,14.437,Prague,Czech Republic
64.146,-21.942,Reykjavík,Iceland
56.879,24.603,Riga,Latvia
41.902,12.496,Rome,Italy
39.453,-31.127,Santa Cruz das Flores,Portugal
28.463,-16.251,Santa Cruz de Tenerife,Spain
57.273,-6.215,Skye,UK
42.697,23.321,Sofia,Bulgaria
59.329,18.068,Stockholm,Sweden
59.437,24.753,Tallinn,Estonia
18.208,16.373,Vienna,Austria
52.229,21.012,Warsaw,Poland
53.961,-1.07,York,UK
47.376,8.541,Zurich,Switzerland`;

    try {
        const lines = cityCoordinatesData.split('\n');

        // Skip headers if present
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].trim();
            if (row === '') continue;

            const parts = row.split(',');
            if (parts.length < 4) continue;

            const latitude = parseFloat(parts[0]);
            const longitude = parseFloat(parts[1]);
            const name = parts[2]?.trim();
            const country = parts[3]?.trim();

            if (isNaN(latitude) || isNaN(longitude) || !name || !country) continue;

            citiesData.push({ latitude, longitude, name, country });
        }

        populateCityDropdown();
    } catch (error) {
        console.error('Error processing cities data:', error);
        document.getElementById('app-container').innerHTML = 
            `<p class="error">Failed to load cities data: ${error.message}. Please try refreshing the page.</p>`;
    }
}

// Populate city dropdown
function populateCityDropdown() {
    const appContainer = document.getElementById('app-container');

    // Inject dropdown UI if not already present
    if (!document.querySelector('.city-selector')) {
        appContainer.innerHTML = `
            <h1>European Weather Dashboard</h1>
            <div class="city-selector">
                <label for="city-select">Select a city:</label>
                <select id="city-select">
                    <option value="">-- Select a city --</option>
                </select>
            </div>
            <div id="weather-container" class="weather-container">
                <p class="initial-message">Select a city to see the current weather</p>
            </div>
        `;
    }

    const dropdown = document.getElementById('city-select'); 

    // Sort cities alphabetically
    citiesData.sort((a, b) => a.name.localeCompare(b.name));

    // Add cities to dropdown
    citiesData.forEach(city => {
        const option = document.createElement('option');
        option.value = `${city.latitude},${city.longitude}`;
        option.textContent = `${city.name}, ${city.country}`;
        dropdown.appendChild(option);
    });

    // Add event listener to dropdown
    dropdown.addEventListener('change', function() {
        if (!this.value) {
            document.getElementById('weather-container').innerHTML = 
                '<p class="initial-message">Select a city to see the current weather</p>';
            return;
        }

        const [lat, lon] = this.value.split(',');
        const selectedCityObj = citiesData.find(city =>
            city.latitude.toFixed(4) === parseFloat(lat).toFixed(4) &&
            city.longitude.toFixed(4) === parseFloat(lon).toFixed(4)
        );

        if (selectedCityObj) {
            selectedCity = selectedCityObj;
            fetchWeatherData(selectedCityObj);
        } else {
            document.getElementById('weather-container').innerHTML = 
                '<p class="error">City data not found. Please try another city.</p>';
        }
    });
}

// Fetch weather data from OpenWeatherMap
function fetchWeatherData(city) {
    const apiKey = '720efd5825ee2e5b5bb91db0beefc37e'; 
    document.getElementById('weather-container').innerHTML = 
        `<div class="loading">Loading weather data for ${city.name}...</div>`;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Weather API error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data, city);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-container').innerHTML = `
                <p class="error">Failed to load weather data: ${error.message}.<br>
                Please try again later or check if the API key is valid.</p>`;
        });
}

// Render weather data
function displayWeatherData(data, city) {
    const weatherContainer = document.getElementById('weather-container');
    const weather = data.weather[0];
    const temp = data.main.temp;
    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;
    const sunriseTime = new Date(data.sys.sunrise * 1000);
    const sunsetTime = new Date(data.sys.sunset * 1000);

    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const isDaytime = isItDaytime(data.sys.sunrise, data.sys.sunset, data.dt);
    const iconClass = getWeatherIconClass(weather.main, isDaytime);

    weatherContainer.innerHTML = `
        <div class="weather-card ${isDaytime ? 'day' : 'night'}">
            <h2>${city.name}, ${city.country}</h2>
            <div class="weather-icon ${iconClass}"></div>
            <div class="weather-main">${weather.main}</div>
            <div class="weather-description">${weather.description}</div>
            <div class="temperature">${Math.round(temp)}°C</div>
            <div class="weather-details">
                <div class="detail"><span class="label">Feels like</span><span class="value">${Math.round(feelsLike)}°C</span></div>
                <div class="detail"><span class="label">Humidity</span><span class="value">${humidity}%</span></div>
                <div class="detail"><span class="label">Wind</span><span class="value">${windSpeed} m/s</span></div>
                <div class="detail"><span class="label">Pressure</span><span class="value">${pressure} hPa</span></div>
            </div>
            <div class="sun-times">
                <div>Sunrise: ${formatTime(sunriseTime)}</div>
                <div>Sunset: ${formatTime(sunsetTime)}</div>
            </div>
        </div>
    `;
}

// Check if current time is day or night
function isItDaytime(sunrise, sunset, current) {
    return current >= sunrise && current < sunset;
}

// Return CSS class for weather icon
function getWeatherIconClass(weatherMain, isDaytime) {
    const iconMap = {
        'Clear': isDaytime ? 'icon-clear-day' : 'icon-clear-night',
        'Clouds': isDaytime ? 'icon-cloudy-day' : 'icon-cloudy-night',
        'Rain': 'icon-rainy',
        'Drizzle': 'icon-rainy',
        'Thunderstorm': 'icon-stormy',
        'Snow': 'icon-snowy',
        'Mist': 'icon-foggy',
        'Fog': 'icon-foggy',
        'Haze': 'icon-foggy',
        'Smoke': 'icon-foggy',
        'Dust': 'icon-foggy',
        'Sand': 'icon-foggy',
        'Ash': 'icon-foggy',
        'Squall': 'icon-stormy',
        'Tornado': 'icon-stormy'
    };
    return iconMap[weatherMain] || (isDaytime ? 'icon-clear-day' : 'icon-clear-night');
}