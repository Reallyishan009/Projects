document.addEventListener("DOMContentLoaded", function () {
    let city = "Lucknow";

    const form = document.querySelector("form");
    const searchField = document.querySelector(".searchField");
    const tempField = document.querySelector(".temp");
    const locationField = document.querySelector(".city");
    const timeField = document.querySelector(".time");
    const weatherIcon = document.querySelector(".weather-icon");
    const conditionField = document.querySelector(".weather_condition span");

    if (!form || !searchField || !tempField || !locationField || !timeField || !weatherIcon || !conditionField) {
        console.error("One or more elements not found. Check your HTML.");
        return;
    }

    form.addEventListener("submit", search);

    function search(e) {
        e.preventDefault();
        city = searchField.value.trim(); // Trim spaces
        if (city) {
            fetchData(city);
        }
    }

    async function fetchData(city) {
        try {
            let url = `https://api.weatherapi.com/v1/current.json?key=1ac3a1d92ee949c686155837250303&q=${city}&aqi=no`;
            let response = await fetch(url);

            if (!response.ok) {
                throw new Error("City not found or API limit exceeded");
            }

            let data = await response.json();

            let currentTemp = data.current.temp_c;
            let currentCity = data.location.name;
            let currentTimeandDate = formatDateTime(data.location.localtime);
            let weatherCondition = data.current.condition.text;
            let iconUrl = data.current.condition.icon;

            updateDOM(currentTemp, currentCity, currentTimeandDate, weatherCondition, iconUrl);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch weather data. Please check the city name.");
        }
    }

    function updateDOM(currentTemp, currentCity, currentTimeandDate, weatherCondition, iconUrl) {
        tempField.innerText = `${currentTemp}°C`;
        locationField.innerText = currentCity;
        timeField.innerText = currentTimeandDate;
        conditionField.innerText = weatherCondition;
        weatherIcon.src = "https:" + iconUrl; // WeatherAPI returns relative URLs, so add "https:"
    }

    function formatDateTime(dateTimeString) {
        let dateTime = new Date(dateTimeString);
        return dateTime.toLocaleString("en-US", { weekday: "long", hour: "numeric", minute: "numeric", hour12: true });
    }

    // Fetch default city's weather on page load
    fetchData(city);
});
