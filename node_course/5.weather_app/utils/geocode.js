const request = require('request');

const MapBoxBaseURL = 'https://api.mapbox.com/';
const MapBoxPublicToken = 'pk.eyJ1IjoiZGVlcGFrbGF4a2FyIiwiYSI6ImNrcTUwZjd4MjFkeXYyb3FyamRiam5ldmoifQ.2ovTBZlIQDEyfhinX925gw';

/**Get Geocoding(Lat/Long pair) from address. */
const geocode = (address, callback) => {
    let geoCodeOptions = {
        url: MapBoxBaseURL+'geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+MapBoxPublicToken,
        json: true
    }

    request(geoCodeOptions, (error, { body }) => {
        if (error) {
            callback('Unable to connect to mapbox location service!', undefined);
        }
        else if (body.features.length == 0) {
            callback('Unable to find location. Try another search.', undefined);
        }
        else {
            const data = body.features[0];
            callback(undefined, {
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
            });
        }
    });
}

module.exports = geocode;