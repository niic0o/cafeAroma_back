// se encarga de recibir los request y contestar por response
// cuando userRouter reciba una peticion, me invocará para que maneje el flujo de los datos y de una resupuesta
// importo al controlador para delegar las tareas de manipulacion de datos
const userController = require('../controllers/userController');
//funciones de usuario
const getAllUsersHandler = (req, res) => {
  res.send("Estos son los usuarios");
};

const getOneUserHandler = (req, res) => {
  const {id} = req.params;
  console.log(`Se solicito datos del usuario: ${id}`);
  res.send(`Este es el detalle de un solo usuario con id: ${id}`);
};

const createUserHandler = (req, res) => {
  const {name, username, email} = req.body;
  const response = userController.createUserController(name, username, email);
  res.status(201); //codigo de usuario creado correctamente
  res.send(response); //si agrego mensaje a send debo parsear el objeto
};

const updateUserHandler = (req, res) => {
  res.send(`Modificando un solo usuario con id: ${req.params.id}`);
};

const deleteUserHandler = (req, res) => {
  res.send(`Eliminando un solo usuario con id: ${req.params.id}`);
};

const getUserByUsername = (req, res) => {
  const {username} = req.query
  if (username) {
    res.send(`El usuario ${username} fue encontrado con exito`);
  } else {
    res.send("No se encontro ningun usuario con ese username");
  }
};

const userHandler = {
  getAllUsersHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserByUsername,
};

module.exports = userHandler;
