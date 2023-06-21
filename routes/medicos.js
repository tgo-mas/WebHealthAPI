
const Medico = require("../database/medico");

const { Router } = require("express");

const router = Router();

//GET - Obter todos os médicos
router.get("/medicos", async (req, res) => {
    const listaMedicos = await Medico.findAll();
    res.json(listaMedicos);
});

//GET - Obter um médico pelo ID
router.get("/medicos/:id", async (req, res) => {
    const medico = await Medico.findByPk(req.params.id);

    if (medico) {
        res.json(medico);
    } else {
        res.status(404).send("Erro 404: Médico não encontrado.");
    }
});

//POST - Cadastrar um médico
router.post("/medicos", async (req, res) => {
    const { nome, email, telefone, especialidade } = req.body;

    try {
        const novoMedico = await Medico.create(
            { nome, email, telefone, especialidade }
        );

        res.status(201).json(novoMedico);
    } catch (err) {
        res.status(500).send(`Erro interno: ${err.message}`);
    }
});

//PUT - Editar um médico
router.put("/medicos/:id", async (req, res) => {
    const { nome, email, telefone, especialidade } = req.body;
    const { id } = req.params;

    try {
        const medico = await Medico.findByPk(id);

        if (medico) {
            await medico.update({ nome, email, telefone, especialidade });

            res.json("Médico editado com sucesso!");
        } else {
            res.status(404).send("Erro 404: Médico não encontrado!");
        }
    } catch (err) {
        res.status(500).send(`Um erro interno aconteceu: ${err.message}`);
    }
});

// DELETE - Excluir um médico
router.delete("/medicos/:id", async (req, res) => {
    const { id } = req.params;

    const medico = await Medico.findByPk(id);

    try {
        if (medico) {
            await medico.destroy();
            res.json("Médico removido com sucesso!");
        } else {
            res.status(404).send(`Erro 404: Médico não encontrado.`);
        }
    } catch (err) {
        res.status(500).send(`Erro interno: ${err.message}`);
    }
});

module.exports = router;
