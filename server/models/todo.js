const {sequelize} = require('../db/database');


const Todo = sequelize.define('Todo', {
    title: {
        type: Sequelize.String,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    description: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            notNull: true,
        }
    },
    done: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = {Todo};