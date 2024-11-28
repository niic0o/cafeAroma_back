// se encarga de recibir los request y contestar por response
// cuando userRouter reciba una peticion, me invocará para que maneje el flujo de los datos y de una resupuesta

//funciones de usuario
const getAllUsersHandler = (req, res) => {
  res.send("Estos son los usuarios");
};

const getOneUserHandler = (req, res) => {
  res.send(`Este es el detalle de un solo usuario con id: ${req.params.id}`);
};

const createUserHandler = (req, res) => {
  res.send("Creando un usuario");
};

const updateUserHandler = (req, res) => {
  res.send(`Modificando un solo usuario con id: ${req.params.id}`);
};

const deleteUserHandler = (req, res) => {
  res.send(`Eliminando un solo usuario con id: ${req.params.id}`);
};

const getUserByUsername = (req, res) => {
  res.send(
    `Este es el detalle de un solo usuario con user: ${req.params.user}`
  );
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
