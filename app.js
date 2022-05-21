if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("serviceWorker.js").then(registration => {

    }).catch(error => {

    });
}

const api = {
    key: "e7053aa75d1c3c8f01872ce292dd358c",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.searchbox-input');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {

    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults).catch(err => {
        displayError(err);
    });
}

function displayError(err) {
    let message = document.querySelector('.error');
    if (err.message === "Failed to fetch") {
        message.innerHTML = `Please check your internet connection and try again!`
        setTimeout(function(){ 
            message.innerHTML = "";
         }, 2000);
    } else if (err.message === "city not found") {
        message.innerHTML = `City not found!`
        setTimeout(function(){ 
            message.innerHTML = "";
         }, 2000);
    }

    //Reset all values

    let city = document.querySelector('.location .city');
    city.innerHTML = "";

    let date = document.querySelector('.location .date');
    date.innerHTML = "";

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `<i class="fas fa-arrow-up"></i>`;

    let feels_like = document.querySelector('.current .feels');
    feels_like.innerHTML = "";

    let weather_desc = document.querySelector('.current .weather');
    weather_desc.innerHTML = "";

    let hiLow = document.querySelector('.hi-low');
    hiLow.innerHTML = `<i class="blank">Input a City in the Search Box and Hit Enter!</i>`;
}


function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png">`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let feels_like = document.querySelector('.current .feels');
    feels_like.innerHTML = `Feels Like : ${Math.round(weather.main.feels_like)}<span>°C</span>`;

    let weather_desc = document.querySelector('.current .weather');
    weather_desc.innerHTML = `${weather.weather[0].main}`;

    let hiLow = document.querySelector('.hi-low');
    hiLow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
}
