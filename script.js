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




function UVScale() {

}




function sCityForecast() {

}




function getCityWeather() {

} 





function getCityForecast() {

}


function getCityHist() {

}



function pullCityFromStor() {

}


function putCityToStor() {

}






