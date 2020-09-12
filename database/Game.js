const Sequelize = require("sequelize");
const connection = require("./Database");


const Game = connection.define('game',  {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    preco: {
        type: Sequelize.DataTypes.DECIMAL(12,2),
        allowNull: false
    },
})


Game.sync({force: false});
module.exports = Game;