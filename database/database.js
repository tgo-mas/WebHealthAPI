
const { Sequelize } = require("sequelize");

// Connection obj
const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
);

// Authenticate function
async function authenticate(connection) {
    try {
        await connection.authenticate();
        console.log("Conexão estabelecida com sucesso!");
    } catch (err) {
        console.log(`Um erro aconteceu: ${err.message}`);
    }
}

module.exports = { authenticate, connection };
