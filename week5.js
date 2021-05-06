// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

// API Key: b968a00a6b1e4d4f99c12038213004
// https://api.weatherapi.com/v1/forecast.json?key=b968a00a6b1e4d4f99c12038213004&q=Chicago&days=3

window.addEventListener('DOMContentLoaded', async function() {
    // Get a reference to the "get weather" button
    let getWeatherButton = document.querySelector(`.get-weather`)
    
    // When the "get weather" button is clicked:
    getWeatherButton.addEventListener(`click`, async function(event) {
        
      // - Ignore the default behavior of the button
    event.preventDefault()
  
      // - Get a reference to the element containing the user-entered location
    let inputLocationElement = document.querySelector(`#location`)
  
      // - Get the user-entered location from the element's value
    let inputLocation = inputLocationElement.value
    //console.log(inputLocation)
      
      // - Get a reference to the element containing the user-entered days 
    let inputDaysElement = document.querySelector(`#days`)
  
      // - Get the user-entered days from the element's value
    let inputDays = inputDaysElement.value

      // - Check to see if the user entered anything; if so:
    if  (inputLocation.length > 0) {
  
        // - Construct a URL to call the WeatherAPI.com API
        let url = `https://api.weatherapi.com/v1/forecast.json?key=b968a00a6b1e4d4f99c12038213004&q=${inputLocation}&days=${inputDays}`
  
        // - Fetch the url, wait for a response, store the response in memory
        let response = await fetch (url)
  
        // - Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()
  
        // - Write the json-formatted data to the JavaScript console
  
        // console.log(json)
        // - Store the interpreted location, current weather conditions, the forecast as three separate variables
        let region = json.location.region
        // console.log(region)
    
        let city = json.location.name
        // console.log(city)
    
        let location = `${city}, ${region}`
        // console.log(location)
    
        let temp = json.current.temp_f
        let condition = json.current.condition.text
        // let currentWeather = `${temp} and ${condition}`
       
        // console.log(currentWeather)
    
        // Store a reference to the "current" element
        let currentElement = document.querySelector(`.current`)
        // console.log(json.forecast.forecastday)

        // Fill the current element with the location and current weather conditions and add for loop
        
        currentElement.innerHTML = `
        <div class="text-center space-y-2">
        <div class="font-bold text-3xl">Current Weather for ${location}</div>
        <div class="font-bold">
          <img src="https://cdn.weatherapi.com/weather/64x64/day/116.png" class="inline-block">
          <span class="temperature">${temp}</span>° 
          and
          <span class="conditions">${condition}</span>

        </div>
      </div>`
      
      let forecastElement = document.querySelector(`.forecast`)
      forecastElement.innerHTML = `
      <div class="text-center space-y-8">
      <div class="font-bold text-3xl">${inputDays} Day Forecast</div>
      </div>`
                  
        for (i = 0; i < json.forecast.forecastday.length; i++) {
            let date = json.forecast.forecastday[i].date
            let tempMax = json.forecast.forecastday[i].day.maxtemp_f
            let tempMin = json.forecast.forecastday[i].day.mintemp_f
            let forecastCondition = json.forecast.forecastday[i].day.condition.text
            let forecastImage = json.forecast.forecastday[i].day.condition.icon
                   
        forecastElement.insertAdjacentHTML(`beforeend`, `
        
      <div class="text-center space-y-8">
      
      <div>
        <img src="https:${forecastImage}" class="mx-auto">
        <h1 class="text-2xl text-bold text-gray-500">${date}</h1>
        <h2 class="text-xl">${tempMax}° – ${tempMin}°</h2>
        <p class="text-gray-500">${forecastCondition}</h1>
      </div>

    </div>
  </div>
  </div>
      `)
        }
       }
     
      
      })
  })