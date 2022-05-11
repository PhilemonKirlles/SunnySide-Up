
//urls seperated out by type of weather data
var apiCurrent = "https://api.weatherbit.io/v2.0/current?postal_code=06282&key=633d8e359dcd43f1afbf0304c7e3bd28";

var apiAirQual = "https://api.weatherbit.io/v2.0/airquality?postal_code=06282&key=633d8e359dcd43f1afbf0304c7e3bd28";

var apiAlerts = "https://api.weatherbit.io/v2.0/alerts?postal_code=06282&key=633d8e359dcd43f1afbf0304c7e3bd28";


//three fecth commands to handle the three urls. Will be adding NOAA api soon.
var currentWeather;

fetch(apiCurrent, {
    method: "POST", body: JSON.stringify(currentWeather)
}).then(response => response.json()).then(json => console.log(json));

var airQual;
fetch(apiCurrent, {
    method: "POST", body: JSON.stringify(airQual)
}).then(response => response.json()).then(json => console.log(json));


// fetch(apiCurrent, {
//     method: "POST", body: JSON.stringify(currentWeather)
// }).then(response => response.json()).then(json => console.log(json));

function fetchData() {

    fetch(apiCurrent).then(response => {
        // console.log(response);
        if(!response.ok){
            throw Error("ERROR");
        }
        return response.json();
    }).then(data => {
        var airTemp = data.data.map(current => {
            return ` ${current.app_temp}`;
        }).join("");


        document.querySelector("#air-temp").insertAdjacentHTML("afterbegin","Air Temperature: " + ((airTemp * 1.8) + 32));
        var weatherCond = data.data.map(current => {
            return `${current.weather.description}`;
        }).join("");
        console.log(data.data);
        
        document.querySelector("#weather-condition").insertAdjacentHTML("afterbegin", "Weather Conditions: ", weatherCond);


        var windSpeed = data.data.map(current => {
            return `${current.wind_spd}`;
        }).join("");

        document.querySelector("#wind-speed").insertAdjacentHTML("afterbegin", "Wind Speed: " + windSpeed);
        
    }).catch(error => {
        console.log(error);  
    });

}

fetchData();



// var airQual;
// fetch(apiCurrent, {
//     method: "POST", body: JSON.stringify(airQual)
// }).then(response => response.json()).then(json => console.log(json));

// var weatherAlerts;
// fetch(apiCurrent, {
//     method: "POST", body: JSON.stringify(weatherAlerts)
// }).then(response => response.json()).then(json => console.log(json));
var weatherAlerts;
fetch(apiCurrent, {
    method: "POST", body: JSON.stringify(weatherAlerts)
}).then(response => response.json()).then(json => console.log(json));
// begin google maps place api
// 
// 
// 
// 
fetch(apiPlaces, {
    method: "POST", body: JSON.stringify(currentWeather)
}).then(response => response.json()).then(json => console.log(json));
