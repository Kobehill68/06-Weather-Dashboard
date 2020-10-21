var cityToSearch = "";
var loadLastCity = "";
var apiKey = "&APPID=549bf1423006452f81dc918ddda35db0";

cityHist= [];

init();


function init() {
    pullCityFromStor();

    if(loadLastCity) {
        cityToSearch = cityHist[cityHist.length - 1].location;
        sCityWeather();
        sCityForecast();
        loadLastCity = false;
    }

}


function sCityWeather() {
    var bURl =  "http://api.openweathermap.org/data/2.5/weather?q=";
    var lURL = cityToSearch;
    var locaUnits = "&Units=imperial";
    var queryURl = bURl + lURL  + locaUnits + apiKey;

    $.ajax({
        url: queryURl,
        method: "GET",
    }).then(function (response){
        var cName = response.name;
        var cDate = monent.unix(response.dt).format("MM/DD/YYYY");
        var cIcon = response.weather[0].icon
        var cIconUrl = "http://api.openweathermap.org/img/w/" + cIcon + ".png";
        var cTemp = response.main.temp;
        var cHumid = response.main.humidity;
        var cWindS = response.main.speed
        var cLat = response.coord.lat;
        var cLon = response.coord.lon;

        getCityWeather(cName, cDate, cTemp, cHumid, cWindS, cIconUrl);
        uvInd(cLat, cLon);

    });

}



function uvInd(lat, lon) {
    queryURl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=549bf1423006452f81dc918ddda35db0";
    $.ajax({
        url: queryURl,
        method: "GET"
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
    var uvIndH5 = $("<h5>").attr("class", "city-card-text").attr("id", "uv-index").text("UV Index: ").append(uvSpan);
    $(".city-card-text").append(uvIndH5);
}




function sCityForecast() {
    var bURl = ""
    var localUrl = cityToSearch
    var localUnits = "&units=imperial";
    var queryURl = bURl + localUrl + localUnits + apiKey 

    $.ajax({
        url: queryURl,
        method: "GET"
    }).then(function(reponse){
       for(var i = 0; i < reponse.list.length; i++){
          if(reponse.list[i].dt_txt[12] === "2"){
            var forcasD = moment.unix(reponse.list[i].dt).format("MM/DD/YYYY");
            var forcasTemp = reponse.list[i].main.temp;
            var forcasHum = reponse.list[i].main.humidity;
            var forcasIcon = reponse.list[i].weather[0].icon;
            var forcastIUrl = "http:/openweathermap.org/img/w/" + forcasIcon + ".png";

            getCityForecast(forcasD, forcasTemp, forcasHum, forcastIUrl);
          }
       } 
    });
}




function getCityWeather(cName, cDate, cTemp, cHumid, cWindS, cIconUrl) {
    $("#city-summ").empty();
    $("forcast-deck").empty();
    var card = $("<div>").attr("class", "card city-card");
    var cardB = $("<div>").attr("class", "card-body city-card-body");
    var cardC = $("<h3>").attr("class", "card-title city-card-title").text(cName + " (" + cDate + ")");
    $("<img>").attr("class", "icon").attr("src", cIconUrl).attr("alt", "Weather Icon").appendTO(cardC);
    var cardTemp = $("<h5>").attr("class", "card-text city-card-text").text("Temperature: " + cTemp + " °F");
    var cardHum = $("<h5>").attr("class", "card-text city-card-text").text("Humidity: " + cHumid + " %");
    var cardWSpeed = $("<h5>").attr("class", "card-text city-card-text").text("Wind Speed: " + cWindS + "MPH");

    $(cardB).append(cardC, cardTemp, cardHum, cardWSpeed);
    $(card).append(cardB);
    $("#city-summ").append(card);

} 





function getCityForecast(forcasD, forcasTemp, forcasHum, forcastIUrl) {
    var card = $();
    var cardBod = $();
    $();
    $();
    $();
    $();
    $();
    $();
    

}


function getCityHist() {

}


function putCityToStor() {

}

function pullCityFromStor() {

}


$("#search-button").click(function(event){
    event.preventDefault();
    cityToSearch = $("#search-form").val().trim();
    $("#search-form").val("");

    if(cityToSearch === ""){
        return;
    }
    putCityToStor();
    sCityWeather();
    sCityForecast();
});






