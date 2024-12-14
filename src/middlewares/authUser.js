/*
authenticate:
Esta funcion, para autenticar solicita que se envie la cabecera de la
solicitud HTTP con el token, si el usuario no consiguio ese token mediante
un legitimo inicio de sesion será rechazado.

authorize:
el token cuenta con un id de usuario y su categoria.
esta funcion solicita roles y compara con el token para ver si el usuario
esta autorizado a acceder a una ruta especifica.
*/

const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1]; // Obtener el token del header

  if (!token) {
    return res.status(401).send({ error: "No ha iniciado sesión" });
  }

  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: "Invalid token: Inicie sesión nuevamente" });
    }
    req.user = decoded; //guardar datos del usuario
    next(); // Continuar al siguiente middleware o ruta
  });
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.categoria)) {
      return res.status(403).send({ error: "Acceso denegado" });
    }
    next(); // El usuario tiene el rol adecuado, continuar
  };
};

const get = async (req, res) => {
  const token = req.body.token;
  const userData = jwt.decode(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: "Invalid token: Inicie sesión nuevamente" });
    }
  });
  try {
    const response = await userController.getOneUserController(userData._id);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

/*
const getPayload = async (req, res) => {
  const token = "12";
console.log(token);
  if (!token) {
    return res.status(401).send({ error: "No ha iniciado sesión" });
  }
 
  res.status(200).send(token);
};
*/
const authUser = {
  authenticate,
  authorize,
  //getPayload,
  get,
};

module.exports = authUser;
