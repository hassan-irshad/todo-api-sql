const Sequelize = require('sequelize');
const {sequelize} = require('../db/database');


const Todo = sequelize.define('Todo', {
    title: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        }
    },
    description: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    done: {
        type: Sequelize.BOOLEAN
    }
});

// Todo.sync({force: true}).then(() => {
//     // Table created
//     return Todo.create({
//       title: 'John',
//       description: 'Hancock'
//     });
//   });

module.exports = {Todo};