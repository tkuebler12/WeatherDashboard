$(document).ready(function(){
    $("#searchButton").on("click", function(){
        var userInput = $("#userInput").val();
        console.log(userInput);
        getWeather(userInput);
        $(".history").on("click", "li", function(){
            getWeather($(this).text());
        })

    })
    function makeRow(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".history").append(li);
    }
    function getWeather(userInput) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ userInput + "&appid=7084016eb10114101ccb5ab1cc67be9e&units=imperial";
        $.ajax({
            url: queryURL,
            method:"GET"
        }).then(function(response) {
            if (searchHistory.indexOf(userInput) === -1) {
                searchHistory.push(userInput);
                window.localStorage.setItem("history", JSON.stringify(searchHistory));
                makeRow(userInput);
            }
            var date = new Date().toLocaleDateString("en-US").split(":");
            $(".city").html("<h1>" + response.name + "-" + date + " Weather Details</h1>");
            $(".temperature").text("Temperature: " + (response.main.temp));
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".wind").text("Wind " + response.wind.speed);
            // $(".uvIndex").text("UV Index " + response.uvIndex);
            $(".date").text("Date: " + response.date);
            console.log(response);
            var image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            var div = $("<div>");
            div.append(image);
            var results = $("#results");
            results.html("<img src='http://openweathermap.org/img/w/'>");
            results.append(image);
            getFiveDayForecast(userInput);
            getUVIndex(response.coord.lat, response.coord.lon);

        });
    }
    function getFiveDayForecast(userInput) {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=7084016eb10114101ccb5ab1cc67be9e&units=imperial";
        $.ajax({
            url: queryURL,
            method:"GET"
        }).then(function(response) {
            $(".forecast").html("<h4>Five Day Forecast</h4>").append("<div class=\"row\">");
            // var forecast = $("<h4>Five Day Forecast</h4>");
            // $(".forecast").text(forecast);
            console.log(response); 
            for (var i = 0; i < response.list.length; i++){
                if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                    var col = $("<div>").addClass("col-md-2");
                    var card = $("<div>").addClass("card bg-primary text-white");
                    var body = $("<div>").addClass("card-body p-2");
                    var title = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocaleDateString());
                    var image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                    var p1 = $("<p>").addClass("card-text").text("temp: " + response.list[i].main.temp_max + "F");
                    var p2 = $("<p>").addClass("card-text").text("humidity: " + response.list[i].main.humidity + "%");
                    col.append(card.append(body.append(title, image, p1, p2)));
                    $(".forecast .row").append(col);
                }
            }
        });
    }
function getUVIndex(lat, lon) {
    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=7084016eb10114101ccb5ab1cc67be9e";
    $.ajax({
        url: queryURL,
        method:"GET"
    }).then(function(response) {
        $(".uvIndex").html("<p></p>").append("<div class=\row\>");
        var uv = $("<p>").html("UV Index: ");
        var btn = $("<span>").addClass("btn btn-sm").html(response.value);
        $(".uvIndex").append(uv.append(btn));
    })
}
var searchHistory = JSON.parse(window.localStorage.getItem("history")) || [];
if (searchHistory > 0) {
    getWeather(searchHistory[searchHistory.length - 1])
}
for (var i = 0; i < searchHistory.length; i++) {
    makeRow(searchHistory[i])
}
})
