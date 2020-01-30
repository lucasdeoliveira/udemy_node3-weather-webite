const path = require('path')
const express = require('express')
const hbs = require('hbs')

//loading utils for geocode and weather forecast
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//setting up express
const app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setting HandleBars (hbs) with Express
app.set('view engine', 'hbs')        // setting hbs as the main handlebar template engine
app.set('views', viewsPath)          // re-setting the views directory to templates (for custom views location ;)
hbs.registerPartials(partialsPath)  // setting the partials directory for hbs usage

// loading and setting static files (html, js, img files, etc)
app.use(express.static(publicPath))


//setting up routes and variables:
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Luke'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        image: 'img/robot.png',
        title: 'About me',
        name: 'Luke'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Luke',
        helpmsg: 'Do you really feel you need help? Sure!?'
    })
})

app.get('/products', (req, res) => {

    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'Provide a product name for search'
        })
    }

    res.send({

        products: []
    })

})

//combine apps to get weather from addr
app.get('/weather', (req, res) => {

    if (!req.query.addr) {
        return res.send({
            error: 'Provide a valid address for weather forecast'
        })
    }
    console.log(req.query.addr);

    //get geocode from address and forecast weather:
    geocode(req.query.addr, (geo_error, { lati, long, location } = {}) => {

        //issues on geocoding
        if (geo_error) {
            return res.send({
                error: geo_error
            })
        }

        forecast(lati, long, (forecast_error, { forecastText } = {}) => {

            //issues while forecasting
            if (forecast_error) {
                return res.send({
                    error: forecast_error
                })
            }

            res.send({
                title: 'Weather Forecast',
                name: 'Luke',
                forecast: { location, forecastText }
            })
        })
    })
})

// 404's mgmt: 
// redirect to 404 for anything else not considered on the routes.
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Could not find any Help article',
        name: 'Luke'
    })
})

// redirect to 404 for anything else not considered on the routes.
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'nothing found buddy...',
        name: 'Luke'
    })
})

// startup web server on port 3000
app.listen(port, () => {
    console.log('Server started! port: '+port)
})