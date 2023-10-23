var express = require('express');
var contasAPApp = require("../app/contas_a_pagar/controller/ctl_contas_a_pagar");

var router = express.Router();

//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    console.log('Middleware de autenticação chamado');

    isLogged = req.session.isLogged;

    if (!isLogged) {
        res.redirect('/login');
    }
    next();
}

// GET methods
router.get('/', authenticationMiddleware, contasAPApp.getAllContasAPagar);
router.get('/openContaInsert', authenticationMiddleware, contasAPApp.openContaAPagarInsert);
router.get('/openContaUpdate/:id', authenticationMiddleware, contasAPApp.openContaAPagarUpdate);

// POST methods
router.post('/insertContaAPagar', authenticationMiddleware, contasAPApp.insertContaAPagar);
router.post('/getDados', authenticationMiddleware, contasAPApp.getDados);
router.post('/deleteContaApagar', authenticationMiddleware, contasAPApp.deleteContaAPagar);
router.post('/viewContasAPagar', authenticationMiddleware, contasAPApp.openContaAPagarInsert);

module.exports = router;
