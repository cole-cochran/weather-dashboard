var API_key = "327acbd7d79e6254e6714764cab1a033";
var oneCallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API_key}`;
var callFiveDayAPI = `api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_key}`;

var part ='hourly'
var city_name = 'chicago'

function getCoordinates(){
    console.log(callFiveDayAPI);
    fetch(callFiveDayAPI)
    .then(function(response){
        if (response.ok){
            response.json()
            .then(function(data){
                console.log(data.city.coord);
                latitude = data.city.coord.lat;
                logitude = data.city.coord.long;
                }
            ) 
            } else {
                console.log("error")
            }
    
    }) 
}
function getWeatherOneDay(oneCallAPI){
    console.log(oneCallAPI);
    fetch(oneCallAPI)
    .then(function(response){
        if (response.ok){
            response.json()
            .then(function(data){
                console.log(data.city.coord);
                latitude = data.city.coord.lat;
                logitude = data.city.coord.long;
                getWeatherOneDay();
                }
            ) 
            } else {
                console.log("error");
            }
})
}
getCoordinates();


