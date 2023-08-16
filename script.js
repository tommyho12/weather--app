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
    
function createWeatherCard (mainData, weatherData) { 
    function dateSplit () {
        var roughDate = mainData.dt_txt.split(' ');
        date = roughDate[0];
    };

    dateSplit();

    console.log(date);
    var icon = weatherData.icon;
    var tempNum = mainData.main.temp;
    var windNum = mainData.wind.speed;
    var humNum = mainData.main.humidity;

    var cardEl = document.createElement('div');
    cardEl.setAttribute('class', 'tile is-child box has-background-grey-light');
    cardEl.setAttribute('id', 'weatherBox');
    
    var title = document.createElement('p');
    title.setAttribute('class', 'title');
    title.textContent = date;

    var imgEl = document.createElement('img');
    imgEl.setAttribute('src', "https://openweathermap.org/img/wn/" + mainData.weather[0].icon + "@2x.png");
    imgEl.setAttribute('alt', 'weather icon');

    var conditions = document.createElement('ul');

    var tempEl = document.createElement('li');
    tempEl.setAttribute('class', 'has-text-link has-text-weight-bold');
    tempEl.textContent = `Temp: ${tempNum}Â°F`;

    var windEl = document.createElement('li');
    windEl.setAttribute('class', 'has-text-link has-text-weight-bold');
    windEl.textContent = `Wind: ${windNum}mph`;

    var humEl = document.createElement('li');
    humEl.setAttribute('class', 'has-text-link has-text-weight-bold');
    humEl.textContent = `Humidity: ${humNum}%`;

    conditions.append(tempEl, windEl, humEl);
    cardEl.append(title, imgEl, conditions);
    forecastCont.append(cardEl);
};

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    submitInput = document.querySelector('#search').value
    
    if (submitInput === '') {
        return
    };
    
    console.log(submitInput);
    renderWeather(submitInput)
    document.querySelector('#search').value = '';
});