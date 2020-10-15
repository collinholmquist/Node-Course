const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//define paths
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //default folder is views, but we can change the path name if we want. 
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve.  html, css, images, client-side js.  
app.use(express.static(publicDirPath)) //includes all static assets.  (all html)
//the public directory is the only folder set up to exposed by the web server.  Thus all browser-side css/js will be here too.  

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Collin Holmquist'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Collin Holmquist'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'please email if you have a question',
        title: 'help page',
        name: 'Collin Holmquist'
    })
})

/*app.get('', (req, res) => { //req is info coming into the server, the other is the methods that customize what we send back to the user
    res.send('<h1>Weather</h1>') //what is sent back 
})  */ //get method takes the route (partial url) and a function.  Describes what we want to do when someone visits the route. 


app.get('/weather', (req, res) => {
    
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location}= {})=>{
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            return res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

        

        //geocode address, then if no error, use forecast and then return forecase 

        
    
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Collin Holmquist',
        errorMessage: 'Page Not Found'
    })
})


app.listen(3000, ()=> {
    console.log("server is up on Port 3000")
}) //what port to listen for request from 