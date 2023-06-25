
const Agendamento = require("../database/agendamento");
const { Router } = require("express");
const Medico = require("../database/medico");
const Paciente = require("../database/paciente");
const { checkHorario } = require("../service/horario");
const { QueryTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const router = Router();

// GET - Obter todos os agendamentos
router.get("/agendamentos", async (req, res) => {
    const { data, status, medico, paciente } = req.query;
    let listaAgendamentos = [];

    try {
        if (data) {
            listaAgendamentos = await sequelize.query(
                `SELECT * FROM agendamentos a
                WHERE CAST(a.datetimeInic AS DATE) = '${data}'`,
                {
                    model: Agendamento,
                    type: QueryTypes.SELECT
                }
            );
        } else if (status) {
            listaAgendamentos = await Agendamento.findAll({
                where: {
                    status: status
                }
            });
        } else if (medico) {
            listaAgendamentos = await sequelize.query(
                `SELECT * FROM agendamentos a 
                    JOIN medicos m ON (a.medicoId = m.id)
                    WHERE m.nome LIKE '%${medico}%'`,
                {
                    model: Agendamento,
                    type: QueryTypes.SELECT
                }
            );
        } else if (paciente) {
            listaAgendamentos = await sequelize.query(
                `SELECT * FROM agendamentos a 
                    JOIN pacientes p ON (a.medicoId = p.id)
                    WHERE p.nome LIKE '%${paciente}%'`,
                {
                    model: Agendamento,
                    type: QueryTypes.SELECT
                }
            );
        } else {
            listaAgendamentos = await Agendamento.findAll({
                include: [
                    { model: Medico, as: 'medico', attributes: ['nome'] },
                    { model: Paciente, as: 'paciente', attributes: ['nome'] },
                ]
            });
        }

        res.json(listaAgendamentos);
    } catch (err) {
        res.status(500).send(`Um erro interno aconteceu: ${err.message}`);
    }
});

// GET - Obter um agendamento pelo ID
router.get("/agendamentos/:id", async (req, res) => {
    try {
        const agendamento = await Agendamento.findByPk(req.params.id, {
            include: [
                { model: Medico, as: 'medico', attributes: ['nome'] },
                { model: Paciente, as: 'paciente', attributes: ['nome'] },
            ]
        });

        if (agendamento) {
            res.json(agendamento);
        } else {
            res.status(404).send("Erro 404: agendamento não encontrado!");
        }
    } catch (err) {
        res.status(500).send(`Um erro interno aconteceu: ${err.message}`);
    }
});

// POST - Cadastrar um agendamento
router.post("/agendamentos", async (req, res) => {
    const agend = req.body;

    const medico = await Medico.findByPk(agend.medicoId);
    const paciente = await Paciente.findByPk(agend.pacienteId);

    if (!medico || !paciente) {
        res.status(404).send("Erro 404: Médico ou paciente não encontrado(s)!");
        return;
    }

    const agendsMedico = await Agendamento.findAll({
        where: {
            medicoId: agend.medicoId
        }
    });

    const agendsPaciente = await Agendamento.findAll({
        where: {
            pacienteId: agend.pacienteId
        }
    });

    console.log(agendsMedico);
    console.log(agendsPaciente);

    if (checkHorario(agendsMedico, agend)) {
        res.status(401).json({ message: "O médico escolhido está ocupado no horário solicitado." });
    } else if (checkHorario(agendsPaciente, agend)) {
        res.status(401).json({ message: "O paciente escolhido está ocupado no horário solicitado." });
    } else {
        try {
            const novoAgendamento = await Agendamento.create(agend);

            res.status(201).json(novoAgendamento);
        } catch (err) {
            res.status(500).send(`Um erro interno aconteceu: ${err.message}`);
        }
    }
});

// PUT - Editar um Agendamento
router.put("/agendamentos/:id", async (req, res) => {
    const { datetimeInic, datetimeFim, observacoes, medicoId, pacienteId } = req.body;
    const { id } = req.params;

    try {
        const agendamento = await Agendamento.findByPk(id);

        if (agendamento) {
            await agendamento.update(id, {
                datetimeInic,
                datetimeFim,
                observacoes,
                medicoId,
                pacienteId
            });

            res.send("Agendamento editado com sucesso!");
        } else {
            res.status(404).send("Erro 404: Agendamento não encontrado!")
        }
    } catch (err) {
        res.status(500).send(`Um erro interno aconteceu: ${err.message}`);
    }
});

// DELETE - Excluir um agendamento
router.delete("/agendamentos/:id", async (req, res) => {
    const { id } = req.params;
    const agendamento = await Agendamento.findByPk(id);

    try {
        if (agendamento) {
            await agendamento.destroy();
            res.send("Agendamento excluído com sucesso!");
        } else {
            res.status(404).send("Erro 404: Agendamento não encontrado!");
        }
    } catch (err) {
        res.status(500).send(`Um erro interno aconteceu: ${err.message}`);
    }
});

module.exports = router;
