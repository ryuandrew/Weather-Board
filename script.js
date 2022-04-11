var buttonEl = $('button')
var apiKey = "1ba93ee591e8244059fe71a8970006b7"

function searchHandler() {
    var inputEl = $('input').val()
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputEl + "&appid=" + apiKey
    fetch(url).then(function (response) {  //fetch returns blur
        return response.json()  //turn it into string
    }).then(function(data) {  //the data we want.  data=response.json()
        // console.log(data)
        weatherSearch(data[0].lat, data[0].lon) 
    })
}


function weatherSearch(lat, lon) {
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
    fetch(url).then(function (response) {  //fetch returns blur
        return response.json()  //turn it into string
    }).then(function(data) {  //the data we want.  data=response.json()
        console.log(data)
        
    })
}


buttonEl.on("click", searchHandler)

