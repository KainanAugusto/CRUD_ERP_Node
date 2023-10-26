const Pool = require('pg').Pool
//@ Eu posso substituir as configurações abaixo por valores do arquivo .env
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dw3',
  password: 'postgres',
  port: process.env.DB_PORT,

})

module.exports = {
    query: (text, params) => pool.query(text, params),
  };