// TODO: Call the Weather API when the form is submitted
// http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=358d43158baa20b3d61e184f3003c1c8
// http://api.openweathermap.org/data/2.5/weather?q=berlin,germany&APPID=6d36f45235e2f21e22ca59d7829001df

// TODO: Create a function to get the weather info

const formInput = document.querySelector(".d-flex");
const geoButton = document.querySelector(".bi-geo-alt");

const fetchWeather = (searchStringName) => {
  // TODO: Replace the following line with the correct url
  // TODO: prevent default behavior of the form
  // const altKey = "358d43158baa20b3d61e184f3003c1c8";
  const apiKey = "6d36f45235e2f21e22ca59d7829001df";
  const baseURL = "http://api.openweathermap.org/";

  const url = `${baseURL}data/2.5/weather?q=${searchStringName}&APPID=${apiKey}`;
  console.log(url);

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      // console.log(data.sys.country);
      // TODO: Insert the weather info in the DOM (description, date, temperature...)
      const city = data.name;
      const country = data.sys.country;
      const temp = Math.floor(data.main.temp - 273.15); // default is kelvin. convert to C

      const date = new Date(data.dt * 1000); // convert to unix timestamp in millisecond
      const options = {
        weekday: 'long', // Display the full weekday name
        year: 'numeric', // Display the full year
        month: 'long', // Display the full month name
        day: 'numeric', // Display the day of the month
        hour: 'numeric', // Display the hour (in 12-hour format)
        minute: 'numeric', // Display the minute
        // second: 'numeric', // Display the second
        hour12: true // Use 12-hour clock
      };
      const formattedDate = date.toLocaleString('en-US', options);

      const weatherDetails = data.weather; // weather is an array, need to iterate
      weatherDetails.forEach((weather) => {
        const weatherDescription = weather.description;
        const weatherIcon = `https://openweathermap.org/img/w/${weather.icon}.png`;

        // city and country
        const locationELement = document.querySelector("#city");
        locationELement.innerHTML = `${city},${country}`;

        // date
        const dateElement = document.querySelector("#date");
        dateElement.innerHTML = formattedDate;

        // weather description
        const descriptionElement = document.querySelector("#description");
        descriptionElement.innerHTML = weatherDescription;

        // background image
        const bodyElement = document.querySelector(".img--card");
        if (weatherDescription === "clear sky") {
          bodyElement.style.backgroundImage = "url('images/clear-sky.jpg')";
        } else if (weatherDescription === "few clouds" || weatherDescription === "scattered clouds" || weatherDescription === "broken clouds" || weatherDescription === "overcast clouds") {
          bodyElement.style.backgroundImage = "url('images/clouds.jpg')";
        } else if (weatherDescription === "shower rain" || weatherDescription === "rain" || weatherDescription === "light rain") {
          bodyElement.style.backgroundImage = "url('images/rain.jpg')";
        } else if (weatherDescription === "thunderstorm") {
          bodyElement.style.backgroundImage = "url('images/thunderstorm.jpg')";
        } else if (weatherDescription === "snow") {
          bodyElement.style.backgroundImage = "url('images/snow.jpg')";
        } else if (weatherDescription === "mist") {
          bodyElement.style.backgroundImage = "url('images/mist.jpg')";
        } else {
          bodyElement.style.backgroundImage = "url('images/earth.jpg')";
        }

        // weather icon
        const iconElement = document.querySelector("#icon");
        iconElement.src = weatherIcon;

        // temperature
        const temperatureID = document.querySelector("#temperature");
        temperatureID.innerHTML = `${temp}°C`;
      });
    });
};

// geolocation
const getCurrentLocationWeather = () => {
  // Retreive currect location weahter using browser native function
  navigator.geolocation.getCurrentPosition((data) => {
    const geoLatitude = data.coords.latitude;
    const geoLongitude = data.coords.longitude;

    const geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLatitude}&lon=${geoLongitude}&appid=6d36f45235e2f21e22ca59d7829001df`;

    fetch(geoUrl)
      .then(response => response.json())
      .then((geodata) => {
        const city = geodata.name;
        const country = geodata.sys.country;
        const temp = Math.floor(geodata.main.temp - 273.15); // default is kelvin. convert to C

        const date = new Date(geodata.dt * 1000); // convert to unix timestamp in millisecond
        const options = {
          weekday: 'long', // Display the full weekday name
          year: 'numeric', // Display the full year
          month: 'long', // Display the full month name
          day: 'numeric', // Display the day of the month
          hour: 'numeric', // Display the hour (in 12-hour format)
          minute: 'numeric', // Display the minute
          // second: 'numeric', // Display the second
          hour12: true // Use 12-hour clock
        };
        const formattedDate = date.toLocaleString('en-US', options);

        const weatherDetails = geodata.weather; // weather is an array, need to iterate
        weatherDetails.forEach((weather) => {
          const weatherDescription = weather.description;
          const weatherIcon = `https://openweathermap.org/img/w/${weather.icon}.png`;

          // background image
          const bodyElement = document.querySelector(".img--card");
          if (weatherDescription === "clear sky") {
            bodyElement.style.backgroundImage = "url('images/clear-sky.jpg')";
          } else if (weatherDescription === "few clouds" || weatherDescription === "scattered clouds" || weatherDescription === "broken clouds" || weatherDescription === "overcast clouds") {
            bodyElement.style.backgroundImage = "url('images/clouds.jpg')";
          } else if (weatherDescription === "shower rain" || weatherDescription === "rain" || weatherDescription === "light rain") {
            bodyElement.style.backgroundImage = "url('images/rain.jpg')";
          } else if (weatherDescription === "thunderstorm") {
            bodyElement.style.backgroundImage = "url('images/thunderstorm.jpg')";
          } else if (weatherDescription === "snow") {
            bodyElement.style.backgroundImage = "url('images/snow.jpg')";
          } else if (weatherDescription === "mist") {
            bodyElement.style.backgroundImage = "url('images/mist.jpg')";
          } else {
            bodyElement.style.backgroundImage = "url('images/earth.jpg')";
          }


          // city and country
          const locationELement = document.querySelector("#city");
          locationELement.innerHTML = `${city},${country}`;

          // date
          const dateElement = document.querySelector("#date");
          dateElement.innerHTML = formattedDate;

          // weather description
          const descriptionElement = document.querySelector("#description");
          descriptionElement.innerHTML = weatherDescription;

          // weather icon
          const iconElement = document.querySelector("#icon");
          iconElement.src = weatherIcon;

          // temperature
          const temperatureID = document.querySelector("#temperature");
          temperatureID.innerHTML = `${temp}°C`;
        });
      });
  });
};

// TODO: Add an event listener to the form
// TODO: On submit, in the callback, call the getWeatherInfo function

// fetch when clicked
formInput.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchStringName = document.querySelector("#input").value;
  fetchWeather(searchStringName);
  document.querySelector("#input").value = "";
});

// fetch every kestroke
formInput.addEventListener("keyup", () => {
  const searchStringName = document.querySelector("#input").value;
  fetchWeather(searchStringName);
});

// fetch currentLocation weather
geoButton.addEventListener("click", (event) => {
  event.preventDefault();
  getCurrentLocationWeather();
});
