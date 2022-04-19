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
        weatherSearch(data[0].lat, data[0].lon) 
    })
}

function weatherSearch(lat, lon) {
    //http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey  //reaplacing {lat} and {lon}. don't need limit bc it's optional
    fetch(url).then(function (response) {  //fetch returns blur
        return response.json()  //turn it into string
    }).then(function(data) {  //the data we want.  data=response.json()
        console.log(data)        
    })
}


var cityHistory = $('#cityHistory')



buttonEl.on("click", searchHandler)

