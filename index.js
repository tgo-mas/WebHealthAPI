const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
require("dotenv").config();
const Paciente = require("./database/paciente");
const Medico = require("./database/medico");
const Agendamento = require("./database/agendamento");

// App Config
const app = express();
app.use(express.json()); // Habilitar JSON
app.use(morgan("dev"));

// Access Config
app.use(cors({ origin: "http://localhost:3000"}));

const rotasPacientes = require("./routes/pacientes");

app.use(rotasPacientes);

// Database Config
const { connection, authenticate } = require("./database/database");
authenticate(connection);

// Connection sync
connection.sync({ force: process.env.DB_FORCE });

// const force = process.env.DB_FORCE;
// if(force){
//     connection.sync({ force: true });
// }else{
//     connection.sync();
// }

// Ativar escuta na porta 3001
app.listen(3001, () => {
    console.log("Servidor rodando em http://localhost:3001");
});