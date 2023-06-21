
const Agendamento = require("../database/agendamento");
const { Router } = require("express");
const Medico = require("../database/medico");
const Paciente = require("../database/paciente");

const router = Router();

// GET - Obter todos os agendamentos
router.get("/agendamentos", async (req, res) => {
    try {
        const listaAgendamentos = await Agendamento.findAll({
            include: [
                { model: Medico, as: 'medico', attributes: ['nome'] },
                { model: Paciente, as: 'paciente', attributes: ['nome'] },
            ]
        });

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
    const { datetimeInic, datetimeFim, observacoes, medicoId, pacienteId } = req.body;

    const medico = await Medico.findByPk(medicoId);
    const paciente = await Paciente.findByPk(pacienteId);

    if (!medico || !paciente) {
        res.status(404).send("Erro 404: Médico ou paciente não encontrado(s)!");
        return;
    }

    try {
        const novoAgendamento = await Agendamento.create(
            { datetimeInic, datetimeFim, observacoes, medicoId, pacienteId }
        );

        res.status(201).json(novoAgendamento);
    } catch (err) {
        res.status(500).send(`Um erro interno aconteceu: ${err.message}`);
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
