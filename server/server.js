const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // We are telling the mongoose that we are using the global promise

mongoose.connect('mongodb://localhost:27017/TodoApp')
	.then(() => {
		console.log('Connected to database successfully...');
	}, (e) => {
		console.log('Error connecting to database...', e);
	});

const Todo = mongoose.model('Todo', {
	text: {
		type: String,
		trim: true,
		minlength: 1,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
});

const User = mongoose.model('User', new mongoose.Schema({
	name: {
		type: String,
		required: true, // meaniing that the attribute should be there. Otherwise, a vlidationerror will be thrown
		minlength: 1,
		trim: true
	}
}));

const user = new User({
	name: "Anuj"
});

const todo = new Todo({
	text: 5,
	completed: false
});

todo.save()
	.then((result) => {
		if (!result) {
			return console.log('Unable to save the record');
		}
		console.log(result);
	})
	.catch((e) => {
		console.log('Some error occurred');
	});

user.save()
	.then((result) => {
		if (!result) {
			return console.log('Unable to save the record');
		}
		console.log(result);
	})
	.catch((e) => {
		console.log('Some error occurred');
	});

