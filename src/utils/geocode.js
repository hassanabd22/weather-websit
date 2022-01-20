const request = require('postman-request');

// declear afunction take addres 
const geocode = (address , callback) => {
    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiaGFzc2FuLWFiZCIsImEiOiJja3d0aDd4NjQxY3BqMm5ydGMxYTdrOWZ1In0.JwBX_5h3XReXyMTiHBXnnQ&language=en&limit=1';
    request({url:url,json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to loction services', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find loction. Try anther search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}



module.exports = geocode;
