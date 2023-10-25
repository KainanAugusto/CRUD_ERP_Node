const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");
const appContasAPagar = require("../apps/contas_a_pagar/controller/ctl_contas_a_pagar");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

// Rota de Contas a Pagar
routerApp.get("/getAllContasAPagar", appContasAPagar.getAllContasAPagar);
routerApp.post("/getContaAPagarById", appContasAPagar.getContaAPagarById);
routerApp.post("/insertContaAPagar", appContasAPagar.insertContaAPagar);
routerApp.post("/updateContaAPagar", appContasAPagar.updateContaAPagar);
routerApp.post("/deleteContaAPagar", appContasAPagar.deleteContaAPagar);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;
