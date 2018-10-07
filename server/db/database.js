const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://hassan:5110@localhost:5432/todoApi');



module.exports = {sequelize};
