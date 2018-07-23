const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

Todo.find({
	_id: "5b558284986aada89ed7976f"
})
.then((result) => {
	console.log("Find: ", result); // [] in case of no records found
})
.catch((e) => {
	console.log(e);
});

Todo.findOne({
	_id: "5b558284986aada89ed7976e"
})
.then((result) => {
	console.log("FindOne: ", result); // null in case of no records found
})
.catch((e) => {
	console.log(e);
});

Todo.findById("5b558284986aada89ed7976f")
.then((result) => {
	console.log("FindById: ", result); // null in case of no records found
})
.catch((e) => {
	console.log(e);
});
