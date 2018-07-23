const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {User} = require('./models/user');
const {Todo} = require('./models/todo');

const app = express();

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	process.env.port = 3000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
	process.env.port = 3000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

const port = process.env.PORT;

const {mongoose} = require('./db/mongoose');
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

app.patch('/todos/:id', (req, res) => {
	const id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(400).send();
	}

	const body = _.pick(req.body, ['text', 'completed']);

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime(); // if we get a flag for whether it is completed, then we should update the completedAt time
	} else {
		body.completedAt = null; // otherwise set it to defaults
		body.completed = false;
	}

	Todo.findByIdAndUpdate(id, {
			$set: body // this is an object. it updates all the attributes in the body accordingly
		}, {
			new: true
		})
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
