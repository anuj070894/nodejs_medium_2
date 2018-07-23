const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('../server');
const {Todo} = require('../models/todo');
const todos = [
	{
		"text": "Todo1",
		"_id": new ObjectID()
	}, {
		"text": "Todo2",
		"_id": new ObjectID()
	}, {
		"text": "Todo3",
		"_id": new ObjectID()
	}
];

beforeEach((done) => {

	Todo.remove({})
		.then(() => {
			return Todo.insertMany(todos);
		})
		.then(() => {
			done();
		}); // removing all the data to give a fresh start
});

describe('TodoApp Api Tests', () => {
	describe('GET /todos', () => {
		it('should get all the todos', (done) => {
			request(app)
				.get('/todos')
				.expect(200)
				.expect((res) => {
					expect(res.body.results.length).toBe(3);
				})
				.end(done);
		});
	});

	describe('POST /todos', () => {
		it('should create a new todo', (done) => {
			const text = 'This is a test todo';
			request(app)
				.post('/todos')
				.send({
					text
				})
				.expect(200)
				.expect((res) => {
					expect(res.body.result.text).toBe(text);
				})
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					Todo.find({text})
						.then((results) => {
							if (!results) {
								return done('No result found');
							}
							expect(results.length).toBe(1);
							expect(results[0].text).toBe(text);
							done();
						});
				})
		});

		it('should not create a new todo with invalid body data', (done) => {
			const text = 'This is a test todo';
			request(app)
				.post('/todos')
				.send()
				.expect(404)
				.end((err, res) => {
					if (err) {
						return done(err);
					}
					Todo.find()
						.then((results) => {
							if (!results) {
								return done('No result found');
							}
							expect(results.length).toBe(3);
							done();
						});
				})
		});
	});

	describe('GET /todos/:id', () => {
		it('shooud return a valid todo', (done) => {
			const id = todos[0]._id;
			const text = todos[0].text;
			request(app)
				.get(`/todos/${id}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.result.text).toBe(text);
				})
				.end((err, result) => {
					if (err) {
						return done(err);
					}
					Todo.findById(id)
						.then((result) => {
							if (!result) {
								return done(err);
							}
							expect(result.text).toBe(text);
							done();
						})
						.catch((e) => {
							done(e);
						});
				});
		});

		it('should return 404 if the id is not valid', (done) => {
			const id = 123;
			const text = todos[0].text;
			request(app)
				.get(`/todos/${id}`)
				.expect(400)
				.end(done);
		});

		it('should return 404 if the record is not found', (done) => {
			const id = '5b558284986aada89ed7976e';
			const text = todos[0].text;
			request(app)
				.get(`/todos/${id}`)
				.expect(404)
				.end(done);
		});
	});

	describe('DELETE /todos/:id', () => {
		it('shooud remove a todo', (done) => {
			const id = todos[0]._id.toHexString();
			request(app)
				.delete(`/todos/${id}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.result._id).toBe(id);
				})
				.end((err, result) => {
					if (err) {
						return done(err);
					}
					Todo.findById(id)
						.then((result) => {
							expect(result).toNotExist();
							done();
						})
						.catch((e) => {
							done(e);
						});
				});
		});

		it('should return 404 if the id is not found', (done) => {
			const id = 123;
			const text = todos[0].text;
			request(app)
				.delete(`/todos/${id}`)
				.expect(400)
				.end(done);
		});

		it('should return 404 if the record is not found', (done) => {
			const id = '5b558284986aada89ed7976a';
			const text = todos[0].text;
			request(app)
				.delete(`/todos/${id}`)
				.expect(404)
				.end(done);
		});
	});
});
