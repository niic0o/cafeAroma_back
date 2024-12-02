// se encarga de recibir los request y contestar por response
// cuando userRouter reciba una peticion, me invocará para que maneje el flujo de los datos y de una resupuesta
// importo al controlador para delegar las tareas de manipulacion de datos
const userController = require("../controllers/userController");
//funciones de usuario

/*
Funcion para el manejo de errores
res: respuesta al cliente,
error: contiene la excepcion del controlador
statusCode: recibe int con el codigo de estado
*/
const sendErrorResponse = (res, error, statusCode) => {
  res.status(statusCode).send({ Error: error.message });
};

const getAllUsersHandler = (req, res) => {
  try {
    const response = userController.getAllUsersController();
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, 404);
  }
};

const getOneUserHandler = (req, res) => {
  try {
    const { id } = req.params;
    const response = userController.getOneUserController(id);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, 404);
  }
};

const createUserHandler = (req, res) => {
  try {
    const { name, username, email } = req.body;
    const response = userController.createUserController(name, username, email);
    res.status(201); //codigo de usuario creado correctamente
    res.send(response); //si agrego mensaje a send debo parsear el objeto
  } catch (error) {
    sendErrorResponse(res, error, 400);
  }
};

/*
edita un usuario por su id
response devuelve el nuevo usuario, o 500 si no encontro al usuario por su id
*/
const updateUserHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email } = req.body;
    const response = userController.updateUserController(
      id,
      name,
      username,
      email
    );
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, 400);
  }
};

const deleteUserHandler = (req, res) => {
  try {
    const { id } = req.params;
    const response = userController.deleteUserController(id);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, 404);
  }
};

const getUserByUsername = (req, res) => {
  try {
    const { username } = req.query;
    const response = userController.getUserByUsernameController(username);
    res.status(200);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode );
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
