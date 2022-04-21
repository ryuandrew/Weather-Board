var buttonEl = $('button')
var apiKey = "1ba93ee591e8244059fe71a8970006b7"

function searchHandler() {
    // console.log($(this))
    var inputEl = $('input').val()
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputEl + "&appid=" + apiKey  //replacing {city name} and {api key}. don't need limit bc it's optional
    fetch(url).then(function (response) {  //fetch returns blur
        return response.json()  //turn it into string
    }).then(function(data) {  //the data we want.  data=response.json()
        console.log(data)
        weatherSearch(data[0].lat, data[0].lon, inputEl)

        //local storage append line 35
    })
}

function weatherSearch(lat, lon, city) {
    //http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial" //reaplacing {lat} and {lon}. don't need limit bc it's optional
    fetch(url).then(function (response) {  //fetch returns blur
        return response.json()  //turn it into string
    }).then(function(data) {  //the data we want.  data=response.json()
        console.log(data)
        var currWeather = $('#currWeather')
        //city name, date, icon, temp, humidity, uv index
        var cityName = $('<h1>')
        var date = $('<h2>')
        var temp = $('<h3>')
        var humidity = $('<p>')
        var uvIndex = $('<p>')
        var icon = $('<img>')
        cityName.text(city)
        date.text(moment.unix(data.current.dt).format("DD/MM/YYYY"))
        temp.html("temp: " + data.current.temp.toFixed(0) + "&#176 F")
        humidity.text("humidity: " + data.current.humidity)
        uvIndex.text("UV Index: " + data.current.uvi)
        icon.attr("src", `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`)
        // append
        // icon.class()
        currWeather.append(cityName, date, temp, humidity, uvIndex, icon)
        fiveDay(data.daily)
    })
}

function fiveDay(data) {
    for(var i = 0; i < 5; i++){
        var container = $('<div>')
        container.addClass('col-2')
        var fiveDayWeather = $('#fiveDay')
        //city name, date, icon, temp, humidity, uv index
        var date = $('<p>')
        var temp = $('<p>')
        var humidity = $('<p>')
        var uvIndex = $('<p>')
        var icon = $('<img>')
        date.text(moment.unix(data[i].dt).format("DD/MM/YYYY"))
        temp.html("tmp: " + data[i].temp.day.toFixed(0) + "&#176 F")
        humidity.text("humidity: " + data[i].humidity)
        uvIndex.text("UV Index: " + data[i].uvi)
        icon.attr("src", `http://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png`)
        // append
        // icon.class()
        container.append(date, temp, humidity, uvIndex, icon)
        fiveDayWeather.append(container)
    }
}


var cityHistory = $('#cityHistory')




buttonEl.on("click", searchHandler)

