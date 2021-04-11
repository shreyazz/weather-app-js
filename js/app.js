// Author : SHREYAS PAHUNE

// used OpenWeather API
const api = {
  key: "1cd9ae3100baf9a6272ae1c0cfbc985e",
  base: "https://api.openweathermap.org/data/2.5/",
};

const timeApi = {
  key: "OU43GURKHMYF",
  base: "http://api.timezonedb.com/v2.1/get-time-zone?",
};

const search = document.getElementById("search");

// adding event listener for Enter key
search.addEventListener("keypress", (evt) => {
  if (evt.keyCode == 13) {
    results(search.value);

    document.querySelector(".place").innerText = search.value;
  }
});


// Fetching API
function results(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

// Changing the DOM accordingly
function displayResults(weather) {
  if (weather.cod == 404) {
    let place = document.querySelector(".place");
    place.innerText = "Invalid City";
  }
  else{
    console.log(weather);
    let place = document.querySelector(".place");
    place.innerText = `${weather.name}, ${weather.sys.country}`;
    let temp = document.querySelector(".tempMain");
    temp.innerText = `${weather.main.temp}°C`;
    let disc = document.querySelector(".weatherDisc");
    disc.innerText = `${weather.weather[0].main}`;
    let feels = document.querySelector(".feels");
    feels.innerText = `Feels like: ${weather.main.feels_like}°C`;
    let humid = document.querySelector(".humidity");
    humid.innerText = `Humidity: ${weather.main.humidity}%`;
    let wind = document.querySelector(".wind");
    wind.innerText = `Wind Speed:  ${weather.wind.speed} meter/sec`;
    let dayOrNight = weather.weather[0].icon;
    // console.log(dayOrNight);
    let decideBackground = dayOrNight.includes("n"); //to check if the icon has n = night or d = day to change background accordingly
    let main = document.querySelector(".main");
  
    // to change the background according to day/night
    if (decideBackground == false) {
      main.classList.remove("night");
      main.classList.add("day");
    } else {
      main.classList.remove("day");
      main.classList.add("night");
    }
    const lon = weather.coord.lon;
    const lat = weather.coord.lat;
  
    fetch(
      `${timeApi.base}key=${timeApi.key}&format=json&by=position&lat=${lat}&lng=${lon}`
    )
      .then((timeobj) => {
        return timeobj.json();
      })
      .then(displayTime);
  
    function displayTime(timeobj) {
      let time = timeobj.formatted;
      const timeDisp = time.substr(11, 20);
      let localtime = document.querySelector(".localtime");
      localtime.innerText = "Local Time: " + timeDisp;
    }
  }
 
}

// setting the time and date
var clock = setInterval(clocktiming, 1000);
function clocktiming() {
  var d = new Date();
  var localtime = d.toLocaleTimeString();
  document.querySelector(".time").innerText = localtime;
}
var d = new Date();
var date = d.getDate();
var month = d.getMonth();
const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octobber",
  "November",
  "December",
];
var year = d.getFullYear();
var day = d.getDay();
var weekList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
document.querySelector(
  ".date"
).innerText = ` ${weekList[day]}, ${date} ${monthList[month]}   ${year}  `;

// search border toggle
search.addEventListener("click", () => {
  search.classList.toggle("open");
});

// for more information display toggle
document.querySelector(".morebutton").addEventListener("click", () => {
  document.querySelector(".moreInfo").classList.toggle("moreInfoOpen");
});
