const express = require('express');
const bodyParser = require('body-parser');

const {Todo} = require('./models/todo');

var app = express();

app.use(bodyParser.json());

app.get('/todo/api/v1.0/tasks', (req, res) => {
    Todo.findAll({where: {}}).then((todo) => {
        res.status(200).send(todo);
    }).catch((e) => {
        res.status(404).send();
    });
}); 

app.post('/todo/api/v1.0/tasks', (req, res) => {
    Todo.create({
        title: req.body.title,
        description: req.body.description,
        done: req.body.done
    }).then((todo) => {
        res.status(200).send(todo);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.get('/todo/api/v1.0/tasks/:id', (req, res) => {
    var id = req.params.id;

    Todo.findById(id).then((todo) => {
        if(!todo) {
            res.status(404).send();
        }

        res.status(200).send(todo);
    }).catch((e) => {
        res.status(400).send();
    });
});

app.put('/todo/api/v1.0/tasks/:id', (req, res) => {
    var id = req.params.id;
    Todo.update({
        title: req.body.title,
        description: req.body.description,
        done: req.body.done
    }, {where: {id}}).then((todo) => {
        if(todo == 0) {
            res.status(404).send();
        }
        
      return Todo.findById(id).then((todo) => {
            res.status(200).send(todo);
        })

    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(5000, () => {
    console.log('Listneing on port 5000');
});

module.exports = {app};
