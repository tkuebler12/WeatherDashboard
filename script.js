$(document).ready(function(){
    $("#searchButton").on("click", function(){
        var userInput = $("#userInput").val();
        console.log(userInput);
        getWeather(userInput);
    })
    function getWeather(userInput) {

        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ userInput + "&appid=7084016eb10114101ccb5ab1cc67be9e";
        $.ajax({
            url: queryURL,
            method:"GET"
        }).then(function(response) {
            var date = new Date().toLocaleDateString("en-US").split(":");
            $(".city").html("<h1>" + response.name + "-" + date + " Weather Details</h1>");
            $(".temperature").text("Temperature: " + response.main.temp);
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".wind").text("Wind " + response.wind.speed);
            $(".uvIndex").text("UV Index " + response.uvIndex);
            $(".date").text("Date: " + response.date);
            console.log(response);
            var image = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            var div = $("<div>");
            div.append(image);
            var results = $("#results");
            results.html("<img src='http://openweathermap.org/img/w/'>");
            results.append(image);
        });
    }

})
