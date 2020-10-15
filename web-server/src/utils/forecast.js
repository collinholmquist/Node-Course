const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=67f74bc2fe03c5cba06c301209d24365&query=' + encodeURIComponent(long) + ',' + encodeURIComponent(lat) + '&units=f'

    request({ url, json: true}, (error, {body}) => {

        if(error){ //either error or response will have a value.  the other will be undefined
            callback('unable to connect', undefined)
        } else if (body.error) {
            callback('unable to find weather data', undefined)
        } else {
            callback(undefined, {
                current: body.current.weather_descriptions[0],
                currentTemp: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast


