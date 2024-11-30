// se encarga de recibir los request y contestar por response
// cuando userRouter reciba una peticion, me invocará para que maneje el flujo de los datos y de una resupuesta
// importo al controlador para delegar las tareas de manipulacion de datos
const userController = require("../controllers/userController");
//funciones de usuario
const getAllUsersHandler = (req, res) => {
  const response = userController.getAllUsersController();
  res.send(response);
};

const getOneUserHandler = (req, res) => {
  const { id } = req.params;
  console.log(`Se solicito datos del usuario: ${id}`);
  //recordar que params envia 'string' hay que parsear a Number
  const response = userController.getOneUserController(Number(id));
  res.send(response);
};

const createUserHandler = (req, res) => {
  const { name, username, email } = req.body;
  const response = userController.createUserController(name, username, email);
  res.status(201); //codigo de usuario creado correctamente
  res.send(response); //si agrego mensaje a send debo parsear el objeto
};

/*
edita un usuario por su id
response devuelve el nuevo usuario, o 500 si no encontro al usuario por su id
*/
const updateUserHandler = (req, res) => {
  const { id } = req.params;
  const { name, username, email } = req.body;
  const response = userController.updateUserController(
    Number(id),
    name,
    username,
    email
  );
  if (response === 500) {
    res.status(500);
    res.send("La operacion falló");
  } else {
    res.send(response);
  }
};

const deleteUserHandler = (req, res) => {
  res.send(`Eliminando un solo usuario con id: ${req.params.id}`);
};

const getUserByUsername = (req, res) => {
  const { username } = req.query;
  if (username) {
    const response = userController.getUserByUsernameController(username);
    res.status(200);
    res.send(response);
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
