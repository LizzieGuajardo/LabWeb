//Lizzie M. Guajardo Mozo
//A00818258
//Lab 4

const credentials = require('./credentials.js')
const request = require ('request')

const cityStr = 'Austin'

//"Despejado durante el día. Actualmente esta a 4°C. Hay 80% de posibilidad de lluvia."

const coordinatesWeather = function(latitude,longitude){
	//  https://api.darksky.net/forecast/[key]/[latitude],[longitude]
	const url = 'https://api.darksky.net/forecast/'+credentials.DARK_SKY_SECRET_KEY
	+'/'+latitude+','+longitude+'?lang=es&units=si'
	request({url:url, json:true}, function(error,response){
	const data = response.body
	const info = {
		summary: data.hourly.summary,	
		temperature: data.currently.temperature,		
		//multiplicado por 100 para mostrar número como porcentaje	
		rainProb: (data.currently.precipProbability)*100
	}
	console.log(info.summary+' Actualmente esta a '+info.temperature+'°C. Hay '+info.rainProb
	+'% de posibilidad de lluvia.')
})
}



const cityWeather = function(city){
	//https://api.mapbox.com/geocoding/v5/mapbox.places/[City].json?access_token=[token]
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+city+'.json?access_token='
	+credentials.MAPBOX_TOKEN
	request({url:url, json:true}, function(error,response){
	const data = response.body
	const info = {
		longitude : data.features[0].geometry.coordinates[0],
		latitude : data.features[0].geometry.coordinates[1]
	}
	console.log(city)
	coordinatesWeather(info.latitude,info.longitude)
})
}

cityWeather(cityStr)	

