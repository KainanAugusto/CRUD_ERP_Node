const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
const mdlLogin = require("../model/mdlLogin");

const Login = async (req, res, next) => { 
  const username = req.body.username;
  const password = req.body.password;

  const getUserData = await mdlLogin.GetCredencial(username);  
  const user = getUserData[0];
 

  if (!user) {
    return res.status(404).json({ message: "Nome de usuário inválido!" });    
  }
 
  
  if (bCrypt.compareSync(password, user.password)) {
    //auth ok
    const token = jwt.sign({ username }, process.env.SECRET_API, {
      expiresIn: 600, // expires in 10min
    });
    return res.json({ auth: true, token: token });
  }

  res.status(200).json({ message: "Login inválido!" });
};

function AutenticaJWT(req, res, next) {
  const type = req.headers.authorization?.split(' ') ?? [];
  const token = type[1];

  if (!token)
    return res
      .status(200)
      .json({ auth: false, message: "Não foi informado o token JWT" });


  jwt.verify(token, process.env.SECRET_API, function (err, decoded) {
    if (err)
      return res
        .status(200)
        .json({ auth: false, message: "JWT inválido ou expirado" });

    req.userId = decoded.id;
    next();
  });
}

const Logout = (req, res, next) => {
  res.json({ auth: false, token: null });
};

module.exports = {
  Login,
  Logout,
  AutenticaJWT,
};
