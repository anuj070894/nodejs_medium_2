const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Test');
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
// const user = new User({
// 	name: "Anuj"
// });

// const todo = new Todo({
// 	text: 5,
// 	completed: false
// });

// todo.save()
// 	.then((result) => {
// 		if (!result) {
// 			return console.log('Unable to save the record');
// 		}
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log('Some error occurred');
// 	});

// user.save()
// 	.then((result) => {
// 		if (!result) {
// 			return console.log('Unable to save the record');
// 		}
// 		console.log(result);
// 	})
// 	.catch((e) => {
// 		console.log('Some error occurred');
// 	});

