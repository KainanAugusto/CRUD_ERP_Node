// HTTP client lib
const axios = require("axios");

//@ Abre o formulário de contas a pagar
const getAllContasAPagar = (req, res) =>
    (async () => {
        userName = req.session.userName;
        try {
            resp = await axios.get(process.env.SERVIDOR_DW3)
        }
    })();