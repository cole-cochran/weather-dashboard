var API_key = '327acbd7d79e6254e6714764cab1a033';
var previousSearch = JSON.parse(localStorage.getItem("WeatherAPI")) || []
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
                previousSearch.push(city_name)
                localStorage.setItem("WeatherAPI", JSON.stringify(previousSearch))
                console.log(data.coord);
                displayPreviousSearch();
                var latitude = data.coord.lat;
                var longitude = data.coord.lon;
                getWeatherOneDay(latitude,longitude)
                var htmlCode = `
                <div class="container">
                <h2>City: ${data.name}</h2>
                <h3>Description:${data.weather[0].main}
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
                </h3>

                </div>
                `
                document.getElementById("current-weather").innerHTML=htmlCode
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
            var htmlCode = '';
            var forecast = data.daily;
            for (let i=1 ; i<6; i++){
                htmlCode += `<div class="cards">
                <h5> Temp: ${forecast[i].temp.min}</h5>
                </div>`
            }  
            document.getElementById("five-day-forecast").innerHTML=htmlCode;
        }
            ) 
            } else {
                console.log("error");
            }
})
}
function displayPreviousSearch(){
    var previousSearch = JSON.parse(localStorage.getItem("WeatherAPI")) || []
    var htmlCode = '';
    for (let i=0; i<previousSearch.length; i++)
    {
        htmlCode+=`<li><button class="btn btn-secondary">${previousSearch[i]}</button></li>`
    }
    document.getElementById("previous-search").innerHTML=htmlCode;
}
displayPreviousSearch();

