
const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Medico = connection.define("medico", {
    nome: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(),
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING(12),
        allowNull: false
    },
    especialidade: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});

module.exports = Medico;
