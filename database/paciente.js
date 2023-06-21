
const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Paciente = connection.define("paciente", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nome: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    rg: {
        type: DataTypes.STRING(12),
        allowNull: false,
        unique: true
    },
    dataNasc: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

module.exports = Paciente;
