// se encarga de recibir los request y contestar por response
// cuando userRouter reciba una peticion, me invocará para que maneje el flujo de los datos y de una resupuesta
// importo al controlador para delegar las tareas de manipulacion de datos.
// importo a un middleware para delegar las tareas de validacion de datos.
const userController = require("../controllers/userController");
const validateUser = require("../middlewares/validateUser");
//funciones de usuario

/*
sendErrorResponse es una funcion para el manejo de errores
res: respuesta al cliente,
error: contiene la excepcion del controlador
statusCode: recibe int con el codigo de estado
*/
const sendErrorResponse = (res, error, statusCode) => {
  res.status(statusCode).send({ Error: error.message });
};

const getAllUsersHandler = async (req, res) => {
  try {
    const response = await userController.getAllUsersController();
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const getDeletedUsersHandler = async (req, res) => {
  try {
    const response = await userController.getDeletedUsersController();
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const getOneUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userController.getOneUserController(id);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const getUserByUsername = async (req, res) => {
  const username = req.query.username;
  const { error } = validateUser.getUserByUsernameValidation.validate({username});
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  try {
    const { username } = req.query; // para la linea siguiente necesito enviar 'string' no 'object'
    const response = await userController.getUserByUsernameController(username);
    res.status(200);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const createUserHandler = async (req, res) => {
  //control de valicacion de datos recibidos
  const oneUser = ({
    dni,
    nombre,
    apellido,
    username,
    password,
    email,
    provincia,
    ciudad,
    domicilio,
  } = req.body);
  const { error } = validateUser.createUserValidation.validate(oneUser);
  if (error) {
    // Si hay un error en la validación, responde con un código de estado 400 y el mensaje de error
    return res.status(400).send({ error: error.details[0].message });
  }
  //doble verificacion y control de otros errores.
  try {
    const response = await userController.createUserController(oneUser);
    res.status(201); //codigo de usuario creado correctamente
    res.send(response); //si agrego mensaje a send debo parsear el objeto
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

/*
edita un usuario por su id
response devuelve el nuevo usuario, o 500 si no encontro al usuario por su id
*/
const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  //control de valicacion de datos recibidos
  const oneUser = ({
    dni,
    nombre,
    apellido,
    username,
    email,
    provincia,
    ciudad,
    domicilio,
  } = req.body);
  const { error } = validateUser.updateUserValidation.validate(oneUser);
  if (error) {
    // Si hay un error en la validación, responde con un código de estado 400 y el mensaje de error
    return res.status(400).send({ error: error.details[0].message });
  }
  //doble verificacion y control de otros errores.
  try {
    const response = await userController.updateUserController(id, oneUser);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const physicalDeleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userController.physicalDeleteUserController(id);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const setLikeAdminHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userController.setLikeAdminController(id);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const setLikeClientHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userController.setLikeClientController(id);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userController.deleteUserController(id);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const resetUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userController.resetUserController(id);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const userHandler = {
  getAllUsersHandler,
  getDeletedUsersHandler,
  getOneUserHandler,
  createUserHandler,
  updateUserHandler,
  physicalDeleteUserHandler,
  getUserByUsername,
  setLikeAdminHandler,
  setLikeClientHandler,
  deleteUserHandler,
  resetUserHandler,
};

module.exports = userHandler;
