const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todo');

var testTodo = {
    title: 'Test',
    description: 'It is for test'
}
beforeEach((done) => {
    Todo.destroy({
        where: {},
        truncate: true
    }).then(() => {
        return Todo.create(testTodo);
    }).then(() => done());
});

describe('GET /todo/api/v1.0/tasks', () => {
    it('should return all todos', (done) => {
        request(app)
            .get('/todo/api/v1.0/tasks')
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(1);
            })
            .end(done);
    });
});

describe('POST /todo/api/v1.0/tasks', () => {
    it('should create a new todo', (done) => {
        var todo = {
            title: 'Hello',
            description: 'Hello World'
        }
        request(app)
            .post('/todo/api/v1.0/tasks')
            .send(todo)
            .expect(200)
            .expect((res) => {
                expect(res.body[1].dataValues.title).toBe(todo.title);
            })
            .end(done);
    });
    it('should return 400 if data is invalid', (done) => {
        request(app)
            .post('/todo/api/v1.0/tasks')
            .expect(400)
            .expect((res) => {
                expect(res.body).toBe([]);
            })
            .end(done);
    });
}); 