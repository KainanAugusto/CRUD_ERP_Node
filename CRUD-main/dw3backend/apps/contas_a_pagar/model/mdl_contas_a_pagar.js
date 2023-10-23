const db = require("../../../database/databaseconfig");

const getAllContasAPagar = async () => {
    return (
        await db.query(
            "SELECT * FROM contas_a_pagar " +
            "WHERE deleted = false ORDER BY id ASC;"
        )
    ).rows;
};

const getContaAPagarById = async (contaIDPar) => {
    return (
        await db.query(
            "SELECT id, descricao, valor, data_vencimento, data_pagamento, deleted " +
            "FROM public.contas_a_pagar " +
            "WHERE id = $1 " +
            "AND deleted = false;",
            [contaIDPar]
        )
    ).rows;
};

const insertContaAPagar = async (contaREGPar) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                "INSERT INTO public.contas_a_pagar values (default, $1, $2, $3, $4, $5);",
                [
                    contaREGPar.descricao,
                    contaREGPar.valor,
                    contaREGPar.data_vencimento,
                    contaREGPar.data_pagamento,
                    contaREGPar.deleted,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = " [mdl_contas_a_pagar|insertContaAPagar] " + error;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};


const updateContaAPagar = async (contaREGPar) => {
    let linhasAfetadas;
    let msg = "ok";
    console.log("ID para atualizar:", contaREGPar.id);

    try {
        linhasAfetadas = (
            await db.query(
                " UPDATE public.contas_a_pagar SET" +
                " descricao=$2, " +
                " valor=$3, " +
                " data_vencimento=$4," +
                " data_pagamento=$5," +
                " deleted=$6" +
                " WHERE id = $1;",
                [
                    contaREGPar.id,
                    contaREGPar.descricao,
                    contaREGPar.valor,
                    contaREGPar.data_vencimento,
                    contaREGPar.data_pagamento,
                    contaREGPar.deleted,
                ]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdl_contas_a_pagar|updateContaAPagar] " + error.detail;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

const deleteContaAPagar = async (contaREGPar) => {
    let linhasAfetadas;
    let msg = "ok";

    try {
        linhasAfetadas = (
            await db.query(
                " UPDATE contas_a_pagar" +
                " SET deleted = true " +
                " WHERE id = $1",
                [contaREGPar.id]
            )
        ).rowCount;
    } catch (error) {
        msg = "[mdl_contas_a_pagar|deleteContaAPagar] " + error.detail;
        linhasAfetadas = -1;
    }
    return { msg, linhasAfetadas };
};

module.exports = {
    getAllContasAPagar,
    getContaAPagarById,
    insertContaAPagar,
    updateContaAPagar,
    deleteContaAPagar
};