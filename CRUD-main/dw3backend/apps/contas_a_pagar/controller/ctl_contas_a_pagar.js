const mdl_contas_a_pagar = require("../model/mdl_contas_a_pagar");

const getAllContasAPagar = (req, res) =>
    (async () => {
        let registro = await mdl_contas_a_pagar.getAllContasAPagar();
        res.json({ status: "ok", "registro": registro });
    })();

const getContaAPagarById = (req, res) =>
    (async () => {
        
        console.log(req.body , 'getContaAPagarById');
       const contaID = parseInt(req.body.contaID);
        let registro = await mdl_contas_a_pagar.getContaAPagarById(contaID);

        res.json({ status: "ok", "registro": registro });
    })();

const insertContaAPagar = (request, res) =>
    (async () => {
        const contaREG = request.body;
        let { msg, linhasAfetadas } = await mdl_contas_a_pagar.insertContaAPagar(contaREG);
        res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();

    const updateContaAPagar = async (request, res) => {
        try {
            console.log(request.body);
            const contaREG = request.body;
            const { msg, linhasAfetadas } = await mdl_contas_a_pagar.updateContaAPagar(contaREG);
            res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
        } catch (error) {
            console.log("Erro ao atualizar a conta a pagar:", error);
            res.json({ status: 'erro', mensagem: 'Erro não identificado', detalhes: error.message });
        }
    };
    

const deleteContaAPagar = (request, res) =>
    (async () => {

        console.log('Entrei no backcontroller deleteContaAPagar');
        console.log('Dados recebidos:', request.body);

        const contaREG = request.body;
        let { msg, linhasAfetadas } = await mdl_contas_a_pagar.deleteContaAPagar(contaREG);
        res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
    })();

module.exports = {
    getAllContasAPagar,
    getContaAPagarById,
    insertContaAPagar,
    updateContaAPagar,
    deleteContaAPagar
};