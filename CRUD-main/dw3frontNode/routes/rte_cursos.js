var express = require('express');
var cursosApp = require("../app/cursos/controller/ctlCursos")

////var login = require("../controllers/login/login")
var router = express.Router();
//const passport = require('passport');



//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
  // Verificar se existe uma sessão válida.
  isLogged = req.session.isLogged;

  if (!isLogged) {
    return res.redirect("/Login");  // Use 'return' para garantir que a execução pare aqui.
  }
  next();
};

/* GET métodos */
router.get('/', authenticationMiddleware, cursosApp.getAllCursos);
router.get('/', authenticationMiddleware, cursosApp.openCursosInsert);
router.get('/openCursosUpdate/:id', authenticationMiddleware, cursosApp.openCursosUpdate);

/* POST métodos */
router.post('/insertCursos', authenticationMiddleware, cursosApp.insertCursos);
router.post('/getDados', authenticationMiddleware, cursosApp.getDados);
router.post('/updateCursos', authenticationMiddleware, cursosApp.updateCursos);
router.post('/deleteCursos', authenticationMiddleware, cursosApp.deleteCursos);




module.exports = router;