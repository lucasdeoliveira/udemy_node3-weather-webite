const request = require('request')

const forecast = (latitude,longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/e111e1c8d68fcd0d2b6e381a254f2d7a/'+ encodeURIComponent(latitude) 
                        +',' + encodeURIComponent(longitude)+'?units=si'
    
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else if ( body.error) {
            callback('Unable to get forecast for location from with  latitude: ' + latitude + ' , longitude: '+longitude, undefined)
        } else {
            callback(undefined, { 
                                    temperature:        body.currently.temperature,
                                    precipProbability:  body.currently.precipProbability,
                                    precipIntensity:    body.currently.precipIntensity,
                                    summary:            body.currently.summary,
                                    forecastText:       body.daily.data[0].summary+ 'It is currently '+body.currently.summary+ ', temperature is '+ body.currently.temperature+ 'C and there\'s a ' +  body.currently.precipProbability + '% chance of rain (' +body.currently.precipIntensity+ 'mm of volume)'
                                })
        }
    })
}

module.exports = forecast