const express = require("express");
const router = express.Router();
const person = require('./controllers/people')

router.post('/persons',person.postPerson);
router.get('/persons/:id',person.getPerson)
router.get('/persons',person.getPersons)
router.patch('/persons/:id',person.updatePerson)
router.delete('/persons/:id',person.deletePerson)

module.exports = router