const path = require('path'); //Core node module. No need to install
const express = require('express'); //Third party package. Needs installation
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

/**For local run, use port 3000. Otherwise on heroku deployments get the port from env variable. */
const port = process.env.PORT || 3000

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handle bars engine and views location
app.set('view engine', 'hbs'); /**Set value for the view engine config option. */
app.set('views', viewsPath); /**Set path for the views. If not set up it looks for views directory. We have changed the default folder name to templates for our handlebars templates to live. */
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

//Route handlers
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Deepak Laxkar'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Deepak Laxkar'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Some helpful text',
        title: 'Help',
        name: 'Deepak Laxkar'
    });
});

//Route handler fetches the weather and sends it back to the browser.
app.get('/weather', (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.send({
            error: 'You must provide a address'
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send({
                address,
                forecast: foreCastData,
                location
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deepak Laxkar',
        errorMessage: 'Help article not found.'
    });
});

/**Match anything that hasn't above. This is our 404 page for displaying errors. */
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deepak Laxkar',
        errorMessage: 'Page not found!'
    });
});

app.listen(port, () => {
    console.log('Server is up on port '+port);
});