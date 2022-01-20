const request = require('postman-request');

const forcast = (latitude,longitude , callback) => { // + latitude + ',' + longitude + '&units=f'
    let url = 'http://api.weatherstack.com/current?access_key=34bdfd38916b13c50b06fed227fa68db&query=' + latitude + ',' + longitude + '';
    request({ url:url ,json:true}, (error , response) => {
        if (error) {
            callback('Unable to connect to weather services',undefined)
        } else if (response.body.error) {
            callback('Unable to find loction. Try anther search.',undefined)
        } else {
            callback(undefined, `${response.body.current.temperature} deagre`)
          
        }
    })
}

module.exports = forcast;