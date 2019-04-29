const Person = require('../models/person')

//CREATE
//POST /persons

const postPerson = function(req,res){
	const person = new Person(req.body)
	person.save().then(function(){
		return res.send(person);
	}).catch(function(error){	
		return res.status(400).send(error);
	})
}

//READ
//GET  /persons/:id
const getPerson = 
	function(req,res){
		const _id = req.params.id;
		Person.findById(_id).then(function(person){
			if(!person){
				return res.status(404).send()
			}
			return res.send(person)
		}).catch(function(error){
			return res.status(500).send(error)
		})
	}

//GET  /persons
const getPersons =
	function(req,res){
		Person.find({}).then(function(persons){
			res.send(persons)
		}).catch(function(error){
			res.status(500).send(error)
		})
	}

//UPDATE
//PATCH /persons/:id
const updatePerson =
	function(req,res){
		const _id = req.params.id;
		Person.findByIdAndUpdate(_id,req.body).then(function(person){
			if(!person){
				return res.status(404).send()
			}
			return res.send(person)
		}).catch(function(error){
			return res.status(500).send(error)
		})
	}

//DELETE
//DELETE /persons/:id
const deletePerson =
	function(req,res){
		const _id = req.params.id;
		Person.findByIdAndDelete(_id).then(function(person){
			if(!person){
				return res.status(404).send()
			}
			return res.send(person)
		}).catch(function(error){
			return res.status(500).send(error)
		})
	}
	
module.exports = {
	postPerson:postPerson,
	getPerson:getPerson,
	getPersons:getPersons,
	updatePerson:updatePerson,
	deletePerson:deletePerson
}
