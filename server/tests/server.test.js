const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todo');

beforeEach((done) => {
	Todo.remove({})
		.then(() => {
			done(); // it runs before each test. and it runs the tests only when the done is called
		}); // removing all the data to give a fresh start
});

describe('TodoApp Api Tests', () => {
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
					Todo.find()
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
								console.log(results, 1);
								return done('No result found');
							}
							expect(results.length).toBe(0);
							done();
						});
				})
		});
	});
});
