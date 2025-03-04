// Task 1: Select all the required elements from the DOM and store them in variables.
// Task 2: Create a function fetchData that will fetch the data from the weather API.
// Task 3: Create a function search that will take the input value from the form and call the fetchData function.
// Task 4: Add an event listener to the form that will call the search function when the form is submitted.
// Task 5: Create a function updateDOM that will update the DOM with the fetched data.
// Task 6: Call the fetchData function with a default city name.

document.addEventListener('DOMContentLoaded',function(){
 const form = document.querySelector('form');
 const searchField = document.querySelector('.searchField');

 const tempfield = document.querySelector(".temp");



form.addEventListener('submit',search);

function search(e){
    e.preventDefault();
    city = searchField.value;
    fetchData(city);
}

async function fetchData(city){
    let url = `https://api.weatherapi.com/v1/current.json?key=1ac3a1d92ee949c686155837250303&q=${city}&aqi=no`;
    
    let response = await fetch(url);
    let data = await response.jason();

    let currentTemp = data.current.temp_c;

    updateDOM(currentTemp);
}

function updateDOM(currentTemp){
    tempfield.innerText = `${currentTemp}°C`;

}

fetchData(city);

});