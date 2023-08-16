var searchInput = document.querySelector('#search');
var submitBtn = document.querySelector('#submitSearch');
var historyBox = document.querySelector('#history');
var curCity = document.querySelector('#curCity');
var curIcon = document.querySelector('#icon');
var curTempBox = document.querySelector('#curTemp');
var curWind = document.querySelector('#curWind');
var curHumid = document.querySelector('#curHumid');
var forecastCont = document.querySelector('#forecastCont');
var data;
var searchHistory = [];
var hisBox = document.querySelector('#hisBox');
var clrHistory = document.querySelector('#clrHistory');

console.log(searchHistory.length);

function renderWeather (city) {
    var weatherSearch = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=a74f5b2196a4b1636be2b2efc00ce135&units=imperial'
    
    fetch(weatherSearch)
    .then(function (res) {
        if (!res.ok) throw new Error('There was an error!')
        
        return res.json();
        })
        .then(function (data) {
            curCity.textContent = city;
            //this for loop cycles through five days worth of forecasts
            for (var i = 0; i < data.list.length; i += 7) {
                var mainData = data.list[i];
                var weatherData = data.list[i].weather[0];
                
                createWeatherCard(mainData, weatherData);
            };
            
            curCity.textContent = city;
            console.log(data.list[0]);
        })
        .catch(function (error) {
            console.error(error);
        });
        
};
    
