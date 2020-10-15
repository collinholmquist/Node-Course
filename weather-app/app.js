const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')


/* const url = 'http://api.weatherstack.com/current?access_key=67f74bc2fe03c5cba06c301209d24365&query=37.8267,-122.4233&units=f'

request({ url: url, json: true}, (error, response) => {

    if(error){ //either error or response will have a value.  the other will be undefined
        console.log("There was an error in reaching the weathe service")
    } else if (response.body.error) {
        console.log("unable to find location")
    } else {
        console.log('It is currently ' + response.body.current.weather_descriptions + ' and ' 
                    + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike)
    }
})
*/

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const inputLocation = process.argv[2]


console.log(inputLocation)

if(inputLocation.length > 0) {
    geocode(inputLocation, (error, {longitude, latitude, location} = {})=>{
        if(error){
            return console.log(error)
        }
        
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return console.log(error)
            }
    
            console.log(location)
            console.log(forecastData)
      })
    
    })
} 


