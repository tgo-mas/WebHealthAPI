
const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Agendamento = connection.define("agendamento", {
    datetimeInic: {
        type: DataTypes.DATE,
        allowNull: false
    },
    datetimeFim: {
        type: DataTypes.DATE,
        allowNull: false
    },
    observacoes: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

const Medico = require("./medico");
const Paciente = require("./paciente");

// Relacionamento: Agendamento possui um médico e um paciente. (N:1 e N:1)
Agendamento.hasOne(Medico);
Agendamento.hasOne(Paciente);

