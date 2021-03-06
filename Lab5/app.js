//Lizzie M. Guajardo Mozo
//A00818258
//Lab 5

const credentials = require('./credentials.js')
const request = require ('request')

const cityStr = 'Monterrey'

//"Despejado durante el día. Actualmente esta a 4°C. Hay 80% de posibilidad de lluvia."

const coordinatesWeather = function(latitude,longitude,callback){
	//  https://api.darksky.net/forecast/[key]/[latitude],[longitude]
	const url = 'https://api.darksky.net/forecast/'+credentials.DARK_SKY_SECRET_KEY
	+'/'+latitude+','+longitude+'?lang=es&units=si'
	request({url:url, json:true}, function(error,response){
		if(error){//no se puede acceder a la liga
			callback('Service unavailabe', undefined)
		}
		else if(response.statusCode == 403){//For invalid key
			callback('Not Authorized - Invalid Token', undefined)
		}
		else if(response.statusCode == 400){//For invalid coordinates
			callback(response.body.error, undefined)
		}
		else{
			const data = response.body
			const info = {
				summary: data.hourly.summary,	
				temperature: data.currently.temperature,		
				//multiplicado por 100 para mostrar número como porcentaje	
				rainProb: (data.currently.precipProbability)*100
			}
			callback(undefined,(info.summary+' Actualmente esta a '+info.temperature+'°C. Hay '+info.rainProb
			+'% de posibilidad de lluvia.'))
		}
	})
}



const cityWeather = function(city,callback){
	//https://api.mapbox.com/geocoding/v5/mapbox.places/[City].json?access_token=[token]
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+city+'.json?access_token='
	+credentials.MAPBOX_TOKEN

	request({url:url, json:true}, function(error,response){
		if(error){//no se puede acceder a la liga
			callback('Service unavailabe', undefined)
		}
		else if(response.body.message == 'Not Authorized - Invalid Token' || response.body.message == 'Not Found'){//Key incorrecta
			callback(response.body.message, undefined)
		}
		else if(response.body.features == ''){//Ciudad sin información
			callback('City not found', undefined)
		}
		else{
			const data = response.body
			const info = 
			{
				longitude : data.features[0].geometry.coordinates[0],
				latitude : data.features[0].geometry.coordinates[1]
			}
			callback(undefined, city)

			coordinatesWeather(info.latitude,info.longitude,function(error,response){
			if(error){
				callback(undefined, error)
			}else{
				callback(undefined, response)
			}
		})
	}

})
}

cityWeather(cityStr,function(error,response){
	if(error){
		console.log(error)
	}else{
		console.log(response)
	}
})	