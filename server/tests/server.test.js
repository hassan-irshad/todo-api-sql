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