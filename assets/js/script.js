var API_key = '327acbd7d79e6254e6714764cab1a033';
var weatherBtn = document.getElementById("get-weather");
weatherBtn.addEventListener("click",function(){
    var city_name = document.getElementById("city_name").value
    console.log(city_name);
    getCoordinates(city_name)
})

function getCoordinates(city_name){
    var callFiveDayAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=imperial`;
    console.log(callFiveDayAPI);
    fetch(callFiveDayAPI)
    .then(function(response){
        if (response.ok){
            response.json()
            .then(function(data){
                console.log(data)
                console.log(data.coord);
                var latitude = data.coord.lat;
                var longitude = data.coord.lon;
                getWeatherOneDay(latitude,longitude)
                }
            ) 
            } else {
                console.log("error")
            }
    
    }) 
}
function getWeatherOneDay(latitude,longitude){
    var oneCallAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_key}&units=imperial`;
    console.log(oneCallAPI);
    fetch(oneCallAPI)
    .then(function(response){
        if (response.ok){
            response.json()
            .then(function(data){
                console.log(data);
                }
            ) 
            } else {
                console.log("error");
            }
})
}



