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
    }).then()

}



function uvInd() {

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






