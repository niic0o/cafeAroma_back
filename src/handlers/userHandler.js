// se encarga de recibir los request y contestar por response
// cuando userRouter reciba una peticion, me invocará para que maneje el flujo de los datos y de una resupuesta
// importo al controlador para delegar las tareas de manipulacion de datos
const userController = require("../controllers/userController");
const validateUser = require("../middlewares/validateUser");
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
    //control de valicacion de datos recibidos
    const oneUser = {
      dni,
      nombre,
      apellido,
      username,
      password,
      email,
      provincia,
      ciudad,
      domicilio,
    } = req.body;
    const { error } = validateUser.createUserValidation.validate(oneUser);
    if (error) {
      // Si hay un error en la validación, responde con un código de estado 400 y el mensaje de error
      return res.status(400).send({ error: error.details[0].message });
    }
    //doble verificacion y control de otros errores.
    try {
    const response = userController.createUserController(oneUser);
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
    const { id } = req.params;
        //control de valicacion de datos recibidos
        const oneUser = {
          dni,
          nombre,
          apellido,
          username,
          password,
          email,
          provincia,
          ciudad,
          domicilio,
        } = req.body;
    const { error } = validateUser.updateUserValidation.validate(oneUser);    
    if (error) {
      // Si hay un error en la validación, responde con un código de estado 400 y el mensaje de error
      return res.status(400).send({ error: error.details[0].message });
    }
    //doble verificacion y control de otros errores.
    try {
    const response = userController.updateUserController(id, oneUser);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, 404);
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
  const username = req.query;
  const { error } = validateUser.getUserByUsernameValidation.validate(username);
  if(error){
    return res.status(400).send({ error: error.details[0].message });
  }
  try {
    const {username} = req.query; // para la linea siguiente necesito enviar 'string' no 'object'
    const response = userController.getUserByUsernameController(username);
    res.status(200);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
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
