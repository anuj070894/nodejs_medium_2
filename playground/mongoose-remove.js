const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

Todo.remove({})
.then((result) => {
	console.log("Delete All: ", result); // { n: 3, ok: 1 }
})
.catch((e) => {
	console.log(e);
});

Todo.findOneAndRemove({
	_id: "5b55a4c21a4e48bcd9199621"
})
.then((result) => {
	console.log("FindOneandRemove: ", result); // actual record, otherwise null
})
.catch((e) => {
	console.log(e);
});

Todo.findByIdAndRemove("5b558284986aada89ed7976f")
.then((result) => {
	console.log("FindByIdAndRemove: ", result); // actual record, otherwise null in case of no records found
})
.catch((e) => {
	console.log(e);
});
