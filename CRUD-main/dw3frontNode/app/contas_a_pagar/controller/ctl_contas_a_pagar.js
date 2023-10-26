const axios = require('axios');


// @ Abre o formulário de manutenção de contas a pagar
const getAllContasAPagar = async (req, res) => {
  const token = req.cookies.token;  
  const userName = req.session.userName;
  try {
    const resp = await axios.get(process.env.SERVIDOR_DW3 + '/getAllContasAPagar', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },

    });
    res.render('contas_a_pagar/view_manutencao', {
      title: 'Manutenção de Contas a Pagar',
      data: resp.data,
      userName: userName,
    });
  } catch (error) {
    console.log('[ctlContasAPagar.js|getAllContasAPagar] Try Catch: Erro de requisição');
  }
};

// @ Abre formulário de cadastro de contas a pagar
const openContaAPagarInsert = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;
  try {
    if (req.method === 'GET') {
      res.render('contas_a_pagar/view_cadConta', {
        title: 'Cadastro de Contas a Pagar',
        oper: 'c',
        userName: userName,
      });
    }
  } catch (error) {
    console.log('[ctlContasAPagar.js|openContasAPagarInsert] Try Catch: Erro não identificado', error);
  }
};

// @ Função para validar campos no formulário
function validateForm(regFormPar) {
  //const validado = validaForm(contaData);

  console.log('Conta ID em validateForm = ', regFormPar.contaID);

  if (regFormPar.contaid === undefined) {
    regFormPar.contaid = 0;
  } else {
    regFormPar.contaid = parseInt(regFormPar.contaid);
  }


  return regFormPar;
}

//@ Abre formulário de cadastro de contas
const openContaAPagarUpdate = (req, res) =>

  (async () => {
    var oper = "";
    userName = req.session.userName;
    token = req.session.token;
    try {
      if (req.method === "GET") {
        oper = "u";
        const id = req.params.id;
        parseInt(id);
        res.render("contas_a_pagar/view_cadConta", {
          title: "Atualização de conta existente!",
          oper: oper,
          idBusca: id,
          userName: userName
        });
      }
    } catch (erro) {
      console.log(
        "[ctl_contas_a_pagar.js|openContaAPagarUpdate] Try Catch: Erro não identificado",
        erro
      );
    }
  })();


// @ Realiza inserção de contas a pagar
const insertContaAPagar = async (req, res) => {
  const token = req.session.token;
  try {
    if (req.method === 'POST') {
      const regPost = validateForm(req.body);
      regPost.contaID = 0;
      const resp = await axios.post(
        process.env.SERVIDOR_DW3 + '/insertContaAPagar',
        regPost,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );

      if (resp.data.status === 'ok') {
        res.json({ status: 'ok', mensagem: 'Conta a pagar inserida com sucesso!' });
      } else {
        res.json({ status: 'erro', mensagem: 'Erro ao inserir conta a pagar!' });
      }
    }
  } catch (error) {
    console.log('[ctlContasAPagar.js|insertContasAPagar] Try Catch: Erro não identificado', error);
  }
};

// @ Realiza atualização de contas a pagar
const updateContaAPagar = async (req, res) => {
  const token = req.session.token;
  try {
    if (req.method === 'POST') {
      const regPost = req.body;
      const resp = await axios.post(
        process.env.SERVIDOR_DW3 + '/updateContaAPagar',
        regPost,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );

      if (resp.data.status === 'ok') {
        res.json({ status: 'ok', mensagem: 'Conta a pagar atualizada com sucesso!' });
      } else {
        res.json({ status: 'erro', mensagem: 'Erro ao atualizar conta a pagar!' });
      }
    }
  } catch (error) {
    console.log('[ctlContasAPagar.js|updateContasAPagar] Try Catch: Erro não identificado', error);
    // Enviar a mensagem de erro para o cliente
    res.json({ status: 'erro', mensagem: 'Erro não identificado', detalhes: error.message });
  }
};


//@ Recupera os dados das contas
const getDados = (req, res) =>
  (async () => {
    const contaID = parseInt(req.body.idBusca);
    const token = req.session.token;

    console.log("[ctl_contas_a_pagar.js|getDados] valor id :", contaID);

    try {
      const resp = await axios.post(
        process.env.SERVIDOR_DW3 + "/getContaAPagarById",
        {
          contaID: contaID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resp && resp.data && resp.data.status === "ok") {
        res.json({ status: "ok", registro: resp.data.registro[0] });
      } else {
        res.json({ status: "erro", mensagem: "Resposta inesperada do servidor." });
      }

    } catch (error) {
      console.log(
        "[ctl_contas_a_pagar.js|getDados] Try Catch: Erro não identificado",
        error  // Corrigido para 'error'
      );
      res.json({ status: "erro", mensagem: "Erro interno do servidor." });
    }

  })();


// @ Realiza remoção soft de contas a pagar
const deleteContaAPagar = async (req, res) => {
  const token = req.session.token;
  try {
    console.log('Entrei no frontcontroller deleteContaAPagar');

    if (req.method === 'POST') {
      const regPost = validateForm(req.body);
      regPost.contaID = parseInt(regPost.contaID);
      console.log('Dados enviados:', regPost);
      const resp = await axios.post(
        process.env.SERVIDOR_DW3 + '/deleteContaAPagar',
        {
          contaID: regPost.contaID,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );

      if (resp.data.status === 'ok') {
        res.json({ status: 'ok', mensagem: 'Conta a pagar removida com sucesso!' });
      } else {
        res.json({ status: 'erro', mensagem: 'Erro ao remover conta a pagar!' });
      }
    }
  } catch (error) {
    console.log('[ctlContasAPagar.js|deleteContasAPagar] Try Catch: Erro não identificado', error);
  }
};

module.exports = {
  getAllContasAPagar,
  openContaAPagarInsert,
  openContaAPagarUpdate,
  getDados,
  insertContaAPagar,
  updateContaAPagar,
  deleteContaAPagar,
};