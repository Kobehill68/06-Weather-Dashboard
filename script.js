var cityToSearch = "";
var loadLastCity = "";
var apiKey = "&appid=5c02bbe1f140c217ecb0d045ebc0dbb5";

cityHist= [];

init();


function init() {
    pullCityFromStore();

    if(loadLastCity) {
        cityToSearch = cityHist[cityHist.length - 1].location;
        sCityWeather();
        sCityForecast();
        loadLastCity = false;
    }

}


function sCityWeather() {
    var baseURl =  "https://api.openweathermap.org/data/2.5/weather?q=";
    var lURL = cityToSearch;
    var locaUnits = "&units=imperial";
    var queryURl = baseURl + lURL  + locaUnits + apiKey;

    $.ajax({
        url: queryURl,
        method: "GET",
    }).then(function (response){
        var cName = response.name;
        var cDate = moment.unix(response.dt).format("MM/DD/YYYY");
        var cIcon = response.weather[0].icon
        var cIconUrl = "https://api.openweathermap.org/img/w/" + cIcon + ".png";
        var cTemp = response.main.temp;
        var cHumid = response.main.humidity;
        var cWindS = response.wind.speed
        var cLat = response.coord.lat;
        var cLon = response.coord.lon;

        getCityWeather(cName, cDate, cTemp, cHumid, cWindS, cIconUrl);
        uvInd(cLat, cLon);

    });

}



function uvInd(lat, lon) {
    queryURl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=5c02bbe1f140c217ecb0d045ebc0dbb5";

    $.ajax({
        url: queryURl,
        method: "GET",
    }).then( function(response){
        UVScale(response.value);
    });


}




function UVScale(indVal) {
    if(indVal > 0 && indVal < 2.5){
        uvSpan = "green";
    } else if(indVal > 2.5 && indVal < 5){
        uvSpan = "yellow"
    } else if ( indVal > 5 && indVal < 7){
        uvSpan = "orange"
    } else if ( indVal > 7 && indVal < 11){
        uvSpan = "red"
    }
    var uvSpan = $("<span>").attr("class", uvSpan).text(indVal);
    var uvIndH5 = $("<h5>").attr("class", " card-text city-card-text").attr("id", "uv-index").text("UV Index: ").append(uvSpan);
    $(".city-card-text").append(uvIndH5);
}




function sCityForecast() {
    var baseURl = "https://api.openweathermap.org/data/2.5/forecast?q="
    var localUrl = cityToSearch
    var localUnits = "&units=imperial";
    var queryURl = baseURl + localUrl + localUnits + apiKey 

    $.ajax({
        url: queryURl,
        method: "GET",
    }).then(function(reponse) {

       for(var i = 0; i < reponse.list.length; i++){
          if(reponse.list[i].dt_txt[12] === "2"){
            var forecasD = moment.unix(reponse.list[i].dt).format("MM/DD/YYYY");
            var forecasTemp = reponse.list[i].main.temp;
            var forecasHum = reponse.list[i].main.humidity;
            var forecastIcon = reponse.list[i].weather[0].icon;
            var forecastIUrl = "https://api.openweathermap.org/img/w/" + forecastIcon + ".png";

            getCityForecast(forecasD, forecasTemp, forecasHum, forecastIUrl);
          }
       } 
    });
}




function getCityWeather(cName, cDate, cTemp, cHumid, cWindS, cIconUrl) {
    $("#city-summ").empty();
    $("#forcast-deck").empty();
    var card = $("<div>").attr("class", "card city-card");
    var cardB = $("<div>").attr("class", "card-body city-card-body");
    var cardC = $("<h3>").attr("class", "card-title city-card-title").text(cName + " (" + cDate + ")");
    $("<img>").attr("class", "icon").attr("src", cIconUrl).attr("alt", "Weather Icon").appendTo(cardC);
    var cardTemp = $("<h5>").attr("class", "card-text city-card-text").text("Temperature: " + cTemp + " °F");
    var cardHum = $("<h5>").attr("class", "card-text city-card-text").text("Humidity: " + cHumid + " %");
    var cardWSpeed = $("<h5>").attr("class", "card-text city-card-text").text("Wind Speed: " + cWindS + "MPH");

    $(cardB).append(cardC, cardTemp, cardHum, cardWSpeed);
    $(card).append(cardB);
    $("#city-summ").append(card);

} 





function getCityForecast(forcasD, forcasTemp, forcasHum, forcastIUrl) {
    var card = $("<div>").attr("class", "card bg-light forecast-card");
    var cardBod = $("<div>").attr("class", "card-body forecast-card-body");
    $("<h6>").attr("class","card-title forecast-card-title").text(forcasD).appendTo(cardBod);
    $("<img>").attr("class", "icon").attr("src", forcastIUrl).attr("alt", "Weather Icon").appendTo(cardBod);
    $("<p>").attr("class", "Card-text forecast-card-text").text("Temp: " + forcasTemp + " °F").appendTo(cardBod);
    $("<p>").attr("class", "Card-text forecast-card-text").text("Humidity: " + forcasHum + " %").appendTo(cardBod);
    $(card).append(cardBod);
    $("#forcast-deck").append(card);
}


function getCityHist() {
    $("#search-list").empty();
    for(var i = 0; i < cityHist.length; i++){
      var histBtn = $("<button>").attr("class", "button history-button").text(cityHist[i]);
      $("#search-list").prepend(histBtn);  
    }
}

function pullCityFromStore() {
    storedCityhist = JSON.parse(localStorage.getItem("cityHist"));
    if(storedCityhist !== null){
        cityHist = storedCityhist;
        loadLastCity = true
        getCityHist();
    }

}



function putCityToStore() {
    if(cityHist.includes(cityToSearch)){
        return
    } else{
        cityHist.push(cityToSearch);
        localStorage.setItem("cityHist", JSON.stringify(cityHist));
        getCityHist();
        location.reload();
    }
}


$("#search-button").click(function(event){
    event.preventDefault();
    cityToSearch = $("#search-form").val().trim();
    $("#search-form").val("");

    if(cityToSearch === ""){
        return;
    }
    putCityToStore();
    sCityWeather();
    sCityForecast();
});

$(".history-button").click(function(event){
    event.preventDefault();
    cityToSearch = $(this).text().trim();
    sCityWeather();
    sCityForecast();
})
