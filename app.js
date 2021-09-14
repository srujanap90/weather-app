let weather = {
    apiKey: "721be42ae538fc2055c02041a25b00cd",

    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
        )
        .then((response) => {
            if(!response.ok) {
                alert("No weather data available.");
                throw new Error("No data found.");
            }

            return response.json();
        })

        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, feels_like } = data.main;
        const { speed } = data.wind;
        const { sunrise, sunset } = data.sys;

        fahrenheit = ((temp * 1.8) + 32).toFixed(2);
        feelsLike_fah = ((feels_like * 1.8) + 32).toFixed(2);

        const sunrise_ms = sunrise * 1000;
        const sunrise_date = new Date(sunrise_ms);
        const sunrise_dateFormat = sunrise_date.toLocaleTimeString()

        const sunset_ms = sunset * 1000;
        const sunset_date = new Date(sunset_ms);
        const sunset_dateFormat = sunset_date.toLocaleTimeString()

        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = fahrenheit + " °F | " + temp + " °C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".feels-like").innerText = "Feels Like: " + feelsLike_fah + " °F | " + feels_like + " °C";

        document.querySelector(".sunrise").innerText = "Sunrise: " + sunrise_dateFormat;
        document.querySelector(".sunset").innerText = "Sunset: " + sunset_dateFormat;

        // document.body.style.backgroundImage =
        // "url('https://source.unsplash.com/1600x900/?weather";

        document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1000x900/?" + description + "')";

        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },

};


document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if(event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("New York City");