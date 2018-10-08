const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todo');

var testTodo = {
    id: '50',
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
                expect(res.body.title).toBe(todo.title);
                expect(res.body.description).toBe(todo.description);
            })
            .end(done);
    });
    it('should return 400 if data is invalid', (done) => {
        request(app)
            .post('/todo/api/v1.0/tasks')
            .send({title: '', description: 'Hello'})
            .expect(400)
            .end(done);
    });
}); 

describe('GET /todo/api/v1.0/tasks/:id', () => {
    it('should return todo of given Id', (done) => {
        request(app)
            .get(`/todo/api/v1.0/tasks/${testTodo.id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.title).toBe(testTodo.title);
                expect(res.body.description).toBe(testTodo.description);
            })
            .end(done);
    });
    it('should return 400 with invalid id', (done) => {
        var id = 'njkdnsankcndvn';
        request(app)
            .get(`/todo/api/v1.0/tasks/${id}`)
            .expect(400)
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        var id = '100';
        request(app)
            .get(`/todo/api/v1.0/tasks/${id}`)
            .expect(404)
            .end(done);
    });
});
describe('PUT /todo/api/v1.0/tasks/:id', () => {
    it('should update todo', (done) => {
        var id = 50;
        var todo  = {
            title: 'Yoga',
            description: 'sfskl',
            done: true
        }
        request(app)
            .put(`/todo/api/v1.0/tasks/${id}`)
            .send(todo, {where: {id}})
            .expect(200)
            .expect((res) => {
                expect(res.body.title).toBe(todo.title);
                expect(res.body.description).toBe(todo.description);
            })
            .end(done);
    });
    it('should return 400 with invalid id', (done) => {
        var id = 'njkdnsankcndvn';
        request(app)
            .put(`/todo/api/v1.0/tasks/${id}`)
            .expect(400)
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        var id = '100';
        request(app)
            .put(`/todo/api/v1.0/tasks/${id}`)
            .expect(404)
            .end(done);
    });
});
describe('DELETE /todo/api/v1.0/tasks/:id', () => {
    it('should remove the todo', (done) => {
        request(app)
            .delete(`/todo/api/v1.0/tasks/${testTodo.id}`)
            .expect(200)
            .end(done);
    });
    it('should return 400 with invalid id', (done) => {
        var id = 'njkdnsankcndvn';
        request(app)
            .delete(`/todo/api/v1.0/tasks/${id}`)
            .expect(400)
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        var id = '100';
        request(app)
            .delete(`/todo/api/v1.0/tasks/${id}`)
            .expect(404)
            .end(done);
    });

});