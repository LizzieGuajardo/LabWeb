const mongoose = require('mongoose');
const validator = require('validator');
const connectionURL = 'mongodb+srv://admin:trufa@cluster0-x0pdv.mongodb.net/Lab7?retryWrites=true'

mongoose.connect(connectionURL,{
	useNewUrlParse: true,
	useCreateIndex: true
})

