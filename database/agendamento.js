
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
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pendente'
    }
});

const Medico = require("./medico");
const Paciente = require("./paciente");

// Relacionamento: Agendamento possui um médico e um paciente. (N:1 e N:1)
Medico.hasMany(Agendamento, { foreignKey: 'medicoId', as: 'agendamento'});
Agendamento.belongsTo(Medico, { foreignKey: 'medicoId', as: 'medico'});
Paciente.hasMany(Agendamento, {foreignKey: 'pacienteId', as: 'agendamento'});
Agendamento.belongsTo(Paciente, { foreignKey: 'pacienteId', as: 'paciente'});

module.exports = Agendamento;
