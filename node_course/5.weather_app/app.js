const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address) {
    console.log('Please provide address.');
}
else {
    /**Using default value of object {}, when error happens and we cannot destructure latitude, longitude, location properties of object. */
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return console.log(error);
        }

        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return console.log(error);
            }
            console.log(location);
            console.log(foreCastData);
        });
    });
}