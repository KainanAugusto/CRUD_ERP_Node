// HTTP client lib
const axios = require("axios");
const moment = require("moment");

//@ Abre o formulário de contas a pagar

const getAllContasAPagar = async (req, res) => {
    try {
      const resp = await axios.get(process.env.SERVIDOR_DW3 + "/getAllContasAPagar", {});
      res.render("contas_a_pagar/view_manutencao", {
        title: "Manutenção de Contas a Pagar",
        data: resp.data,
        userName: req.session.userName,
      });
    } catch (error) {
      console.error("[ctlContasAPagar|getAllContasAPagar] Error:", error);
    }
  };

// @ Validate form data before insert or update
const validateForm = (form) => {
  if (!form.data_vencimento) {
    form.data_vencimento = null;
  }
  if (!form.data_pagamento) {
    form.data_pagamento = null;
  }
  return form;
};

// @ Insert new conta_a_pagar
const insertContaAPagar = async (req, res) => {
  try {
    const validatedForm = validateForm(req.body);
    const resp = await axios.post(
      process.env.SERVIDOR_DW3 + "/insertContaAPagar",
      validatedForm,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + req.session.token,
        },
      }
    );
    if (resp.data.status === "ok") {
      res.redirect("/contas_a_pagar");
    } else {
      res.render("contas_a_pagar/view_cadContasAPagar", {
        title: "Inserir Conta a Pagar",
        data: validatedForm,
        userName: req.session.userName,
      });
    }
  } catch (error) {
    console.error("[ctlContasAPagar|insertContaAPagar] Error:", error);
  }
};

// @ Update conta_a_pagar by ID
const updateContaAPagar = async (req, res) => {
  try {
    const validatedForm = validateForm(req.body);
    const resp = await axios.post(
      process.env.SERVIDOR_DW3 + "/updateContaAPagar",
      validatedForm,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + req.session.token,
        },
      }
    );
    if (resp.data.status === "ok") {
      res.redirect("/contas_a_pagar");
    } else {
      res.status(400).json({ status: "error" });
    }
  } catch (error) {
    console.error("[ctlContasAPagar|updateContaAPagar] Error:", error);
  }
};

// @ Delete conta_a_pagar by ID
const deleteContaAPagar = async (req, res) => {
  try {
    const resp = await axios.post(
      process.env.SERVIDOR_DW3 + "/deleteContaAPagar",
      { id: req.body.id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + req.session.token,
        },
      }
    );
    if (resp.data.status === "ok") {
      res.json({ status: "ok" });
    } else {
      res.json({ status: "error" });
    }
  } catch (error) {
    console.error("[ctlContasAPagar|deleteContaAPagar] Error:", error);
  }
};

module.exports = {
  getAllContasAPagar,
  insertContaAPagar,
  updateContaAPagar,
  deleteContaAPagar
};
