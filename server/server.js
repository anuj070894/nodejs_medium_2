const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// three cases -
/**
 * 1. find works fine but the no results are returned
 * 2. find works and results are fetched successfully
 * 3. find fails
 */
app.get('/todos', (req, res) => {
	Todo.find()
		.then((results) => {
			console.log(results);
			if (!results) {
				return res.status(404).send();
			}
			res.send({results});
		})
		.catch((e) => {
			res.status(404).send();
		});
});

app.get('/todos/:id', (req, res) => {
	const id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(400).send();
	}

	Todo.findById(id)
		.then((result) => {
			if (!result) {
				return res.status(404).send();
			}
			res.send({result});
		})
		.catch((e) => {
			res.status(404).send();
		});
});

app.post('/todos', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	});
	todo.save()
		.then((result) => {
			res.send({result}); // {result: record} .. that is being saved into the database
		}, (e) => {
			res.status(404).send();
			// console.log('Error in saving the record - POST - TODOs ', e);
		});
});

app.delete('/todos/:id', (req, res) => {
	const id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(400).send();
	}

	Todo.findByIdAndRemove(id)
		.then((result) => {
			if (!result) {
				return res.status(404).send();
			}
			res.send({result});
		})
		.catch((e) => {
			res.status(400).send();
		});
});

app.listen(port, () => {
	console.log('Listening on port ', port);
});

module.exports = {
	app
};
