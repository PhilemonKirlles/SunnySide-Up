
//apiCurrent supplys all the current weather information needed
//var apiCurrent = "https://api.weatherbit.io/v2.0/current?postal_code=06282&key=23f4eb9104a3417ebae0fd654b5b8faa";

//var apiAirQual = "https://api.weatherbit.io/v2.0/airquality?postal_code=06282&key=633d8e359dcd43f1afbf0304c7e3bd28";

//var apiAlerts = "https://api.weatherbit.io/v2.0/alerts?postal_code=90210&key=23f4eb9104a3417ebae0fd654b5b8faa";

// array to store search history
var searchHistory = [];


document.querySelector('#search-form').addEventListener
    ('submit', getZipCode);
var searchForm = document.getElementById('search-form');

document.querySelector('#display-footer-btn').addEventListener('click', displayFooter);
var footerDisplay = 0;
function displayFooter() {
    var footerNav = document.getElementById('footer-nav');
    if (footerDisplay == 0) {
        footerNav.classList.remove("hide");
        footerDisplay = 1;
    } else {
        footerNav.classList.add("hide");
        footerDisplay = 0;
    }

    }
    

function getZipCode(event){

    
    //get zip from input
    var zip = document.querySelector('.input').value;
    document.querySelector('.input').value = "";
    console.log(zip);

    if (isNaN(zip) || !((/^[0-9]{5}$/.test(zip)))){
        var errorMsg = document.createElement('div');
        errorMsg.classList.add("error");
        errorMsg.innerText = "Please enter a 5 digit zip code!";
        searchForm.appendChild(errorMsg);
        zip = "";
    } 

    

    //make request
    fetch("https://api.weatherbit.io/v2.0/current?postal_code=" + zip + "&key=23f4eb9104a3417ebae0fd654b5b8faa")
    .then(response => response.json())
    .then(data => {

        console.log(data);
        var airTemp = data.data.map(current => {
            return ` ${current.app_temp}`;
        }).join("");
        document.querySelector("#air-temp").insertAdjacentHTML("afterbegin","Air Temperature: " + (Math.floor((airTemp * 1.8) + 32)) + " F");


        var weatherCond = data.data.map(current => {
            return `${current.weather.description}`;            
        }).join("");
       // console.log(data.data);        
        document.querySelector("#weather-condition").insertAdjacentHTML("afterbegin", "Weather Conditions: " + weatherCond);

        var windSpeed = data.data.map(current => {
            return `${current.wind_spd}`;
        }).join("");
        var windDirection = data.data.map(current => {
            return `${current.wind_cdir}`;
        }).join("");
        document.querySelector("#wind-speed").insertAdjacentHTML("afterbegin", "Wind Speed: " + windSpeed + " mph " + windDirection);

        var uvIndex = data.data.map(current => {
            return `${current.uv}`;
        }).join("");
        document.querySelector("#UV-index").insertAdjacentHTML("afterbegin", "UV Index: " + uvIndex);

        var airQuality = data.data.map(current => {
            return `${current.aqi}`;
        }).join("");
        document.querySelector("#pollution").insertAdjacentHTML("afterbegin", "Air Quality: " + airQuality);

        var cityName = data.data.map(current => {
            return `${current.city_name}`;
        }).join("");
        document.querySelector(".city-name").insertAdjacentText("afterbegin","Current weather for "  + cityName);

       //console.log(cityName);
       // save search history
        saveStoreArray(zip, cityName);
        
    });

    fetch("https://api.weatherbit.io/v2.0/alerts?postal_code=" + zip + "&key=23f4eb9104a3417ebae0fd654b5b8faa")
    .then(response => {
        if(!response.ok) {
            throw Error("ERROR");
        }

        return response.json();
    })
    .then(data => {
        console.log(data);

        var weatherAlerts = data.alerts
        .map(alerts => {
            return `<p> ${alerts.description}</p>`;
        })
        .join("");

        if(Object.keys(data.alerts).length) {
            document.querySelector(".alert-text").insertAdjacentHTML("afterbegin", "Current Alerts: " + weatherAlerts);
            
        }else {
            weatherAlerts = "No weather worries today!";
            document.querySelector(".alert-text").insertAdjacentHTML("afterbegin", weatherAlerts);
            
        }
        
    })
    .catch(error => {
        console.log(error);
    });

    var submitBtn = document.querySelector("#search-form");

    function reload() {

    reload = location.reload();
   
    };

    submitBtn.addEventListener("click", reload, false);  

    
    event.preventDefault();
    
    
     
} //end get zip code function



// functions to save and load search history
function saveStoreArray(zip, cityName) {
    
    searchHistory.push({city: cityName, zipCode: zip});
    console.log(searchHistory);
    localStorage.setItem("history", JSON.stringify(searchHistory));
    if (searchHistory.length > 4) {
        searchHistory.shift();
    }
}

var historyEl = document.getElementById('history-ul');
  function loadHistory() {
    var savedSearch = localStorage.getItem("history");

    if (!savedSearch) { // if no saved searches then do nothing
      return false;
    }

    console.log("Saved locations found!");
  
    // parse into array of objects
    searchHistory = JSON.parse(savedSearch);
    console.log(savedSearch);
    // loop through array 
    for (var i = 0; i < searchHistory.length; i++) {
      // create list elements in footer
      var listItem = document.createElement("li");
      var cityHistory = searchHistory[i].city;
      var zipHistory = searchHistory[i].zipCode;
      listItem.innerText = cityHistory + " (" + zipHistory + ")";
      historyEl.appendChild(listItem);
        // add to searchHistory array
        //searchHistory.push(savedSearch[i]);
    }
  };


loadHistory();