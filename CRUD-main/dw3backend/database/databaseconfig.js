const Pool = require('pg').Pool
//@ Eu posso substituir as configurações abaixo por valores do arquivo .env
const pool = new Pool({
  user: 'dev',
  host: 'localhost',
  database: 'dw3',
  password: '@uth_f0r_D3v@',
  port: 2050,
})

module.exports = {
    query: (text, params) => pool.query(text, params),
  };