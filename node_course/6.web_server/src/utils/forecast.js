const request = require('request');

const WeatherStackBaseURL = 'http://api.weatherstack.com/';
const WeatherStackAPIAccessKey = '7998dc5a8f2e286bbd4aa1775eeec939';

// /**Get Weather Forecast from Lat/Long pair. */
const forecast = (latitude, longitude, callback) => {
    let foreCastOptions = {
        url: WeatherStackBaseURL + 'current?access_key='+WeatherStackAPIAccessKey+'&query='+latitude+','+longitude,
        json: true
    }

    request(foreCastOptions, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather stack service!', undefined);
        }
        else if (body.error) {
            callback('Unable to find location. ', undefined);
        }
        else {
            const data = body.current;
            let foreCastString = data.weather_descriptions[0]+'. It is '+data.temperature+' degrees out. But it feels like '+data.feelslike+' degrees. The Humidity is ' +data.humidity+ '%.'
            callback(undefined, foreCastString);
        }
    });
}

module.exports = forecast;