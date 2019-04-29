const mongoose = require('mongoose');

const Person = mongoose.model('Person',{
	name:{
		type: String,
		required: true
	},
	age:{
		type: Number,
		required: true
	},
	born:{
		type: Number,
		required: true
	},
	timeline:{
		type: String,
	},
	alliegance:{
		type: [String]
	},
	playedBy:{
		type: String,
		required: true
	},
	titles:{
		type: [String]
	},
	father:{
		type: String,
		required: true
	},
	mother:{
		type: String,
		required: true
	},
	spouse:{
		type: String
	}
}); 

module.exports = Person