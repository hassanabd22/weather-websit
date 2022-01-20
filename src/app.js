const path = require('path');
const express = require('express');
const hbs = require('hbs');
// import geocode function 
const geocode = require('./utils/geocode');
// import forcast function
const forcast = require('./utils/forecast');

const app = express();

const puplicPath    = path.join(__dirname, '../puplic');
const viewsPath     = path.join(__dirname, '../templates/views');
const partialsPath  = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(puplicPath));

app.get('', (req, res) => {
    res.render('index', {
        title:'Home page',
        name: "Hassan Abd"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name: "Hassan Abd"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'help',
        masg: "Send your proplem for me",
        name: "Hassan Abd"
    })
})

app.get('/weather', ( req, res ) => {
    if (!req.query.address) {
        return res.send({
            error:'Please provide an address'
        })
    }
    geocode(req.query.address, ( error , {latitude, longitude, location} = {} ) => {
        if(error) {
                return res.send({error})
        }
        forcast(latitude, longitude, (error,forcastData) => {
                if (error) {
                    return res.send({error})     
                }
                res.send({
                    forecast: forcastData,
                    location: location,
                    address: req.query.address
                })
        });
});
    
})

app.get('/help/*', ( req, res ) => {
    res.render('page404', {
        error:'Help article is not fond',
        title:' 404 Page',
        name: "Hassan Abd"
    })
})

app.get('*', ( req, res ) => {
    res.render('page404', {
        error:'Page is Not fond',
        title:' 404 Page',
        name: "Hassan Abd"
    })
})

app.listen(3000, () => {
    console.log('The mesege is send')
})