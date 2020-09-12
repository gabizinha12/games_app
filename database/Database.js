const Sequelize = require("sequelize")

const connection = new Sequelize('game_app', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
