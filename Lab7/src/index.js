const express = require('express');
const app = express()
const bcrypt = require('bcryptjs')

const port = process.env.PORT || 3000
const router = require('./routes')
const Person = require('./models/person')

require('./db/mongoose')

app.use(express.json()); //parsea a json
app.use(router);
app.listen(port, function(){
	console.log('Server up and running on port: ' + port)
})


