const axios = require('axios');

// @ Abre o formulário de manutenção de contas a pagar
const getAllContasAPagar = async (req, res) => {
  const userName = req.session.userName;
  try {
    const resp = await axios.get(process.env.SERVIDOR_DW3 + '/GetAllContasAPagar', {});
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
  if (regFormPar.contaId === '') {
    regFormPar.contaId = 0;
  } else {
    regFormPar.contaId = parseInt(regFormPar.contaId);
  }

  regFormPar.ativo = regFormPar.ativo === 'true';
  regFormPar.deleted = regFormPar.deleted === 'true';

  return regFormPar;
}

// @ Abre formulário de atualização de contas a pagar
const openContaAPagarUpdate = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;
  try {
    if (req.method === 'GET') {
      const id = req.params.id;
      parseInt(id);
      res.render('contas_a_pagar/view_cadConta', {
        title: 'Atualização de Contas a Pagar',
        oper: 'u',
        idBusca: id,
        userName: userName,
      });
    }
  } catch (error) {
    console.log('[ctlContasAPagar.js|openContasAPagarUpdate] Try Catch: Erro não identificado', error);
  }
};

// @ Realiza inserção de contas a pagar
const insertContaAPagar = async (req, res) => {
  const token = req.session.token;
  try {
    if (req.method === 'POST') {
      const regPost = validateForm(req.body);
      regPost.contaId = 0;
      const resp = await axios.post(
        process.env.SERVIDOR_DW3 + '/InsertContasAPagar',
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
      const regPost = validateForm(req.body);
      const resp = await axios.post(
        process.env.SERVIDOR_DW3 + '/UpdateContasAPagar',
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
  }
};

// @ Realiza remoção soft de contas a pagar
const deleteContaAPagar = async (req, res) => {
  const token = req.session.token;
  try {
    if (req.method === 'POST') {
      const regPost = validateForm(req.body);
      regPost.contaId = parseInt(regPost.contaId);
      const resp = await axios.post(
        process.env.SERVIDOR_DW3 + '/DeleteContasAPagar',
        {
          contaId: regPost.contaId,
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
  insertContaAPagar,
  updateContaAPagar,
  deleteContaAPagar,
};