const Pool = require('pg').Pool
//@ Eu posso substituir as configurações abaixo por valores do arquivo .env
const pool = new Pool({
  user: 'postgres',
  host: '10.131.130.172',
  database: 'dw3',
  password: '',
  port: 5432,
})

module.exports = {
    query: (text, params) => pool.query(text, params),
  };