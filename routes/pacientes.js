
const Paciente = require("../database/paciente");

const { Router } = require("express");

const router = Router();

// GET - Obter todos os pacientes
router.get("/pacientes", async (req, res) => {
    const listaPacientes = await Paciente.findAll();
    res.json(listaPacientes);
});

// GET - Obter um paciente
router.get("/pacientes/:id", async (req, res) => {
    const paciente = await Paciente.findByPk(req.params.id);

    if (paciente) {
        res.json(paciente);
    } else {
        res.status(404).send("Paciente não encontrado.");
    }
});

// POST - Cadastrar novo paciente
router.post("/pacientes", async (req, res) => {
    console.log(req.body);
    const { email, nome, telefone, endereco, cpf, rg, dataNasc } = req.body;

    try {
        const novoPaciente = await Paciente.create(
            { email, nome, telefone, endereco, cpf, rg, dataNasc }
        );

        res.status(201).json(novoPaciente);
    } catch (err) {
        console.error(err);
        res.status(500).send(`Um erro aconteceu: ${err.message}`);
    }
});

// PUT - Atualizar um paciente
router.put("/pacientes/:id", async (req, res) => {

    const { email, nome, telefone, endereco, cpf, rg, dataNasc } = req.body;
    const { id } = req.params;

    try {
        const paciente = await Paciente.findOne({ where: { id } });

        if (paciente) {
            await paciente.update({ email, nome, telefone, endereco, cpf, rg, dataNasc });

            res.status(200).json({ message: "Paciente editado com sucesso!" });
        }else{
            res.status(404).send("Paciente não encontrado.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(`Um erro inesperado aconteceu: ${err.message}`);
    }
});

// DELETE - Excluir um paciente
router.delete("/pacientes/:id", async (req, res) => {

    const { id } = req.params;

    const paciente = await Paciente.findByPk(id);

    try{
        if(paciente){
            await paciente.destroy();
            res.status(200).json({  message: "Paciente removido." });
        }else{
            res.status(400).json({ message: "Paciente não encontrado!"})
        }
    }catch(err){
        console.error(err);
        res.status(500).send(`Um erro inesperado aconteceu: ${err.message}`);
    }

}); 

module.exports = router;
