// cuando un handler me pida que manipule datos, me los pasa.
// tomo decisiones y envio al modelo logico db para que se conecte con la bdd fisica
// le devuelvo el proceso al handler para que responda la solicitud http
const users = require("../db/dataBase");

const getAllUsersController = () => {
  console.log(users);
  if (users.length === 0) {
    throw new Error("No se encontró usuarios registrados");
  }
  return users;
};

/*
Uso find para obtener el primer objeto que cumpla con la condicion
*/
const getOneUserController = (id) => {
  //recordar que params envia 'string' hay que parsear a Number
  const userById = users.find((user) => user.id === Number(id));
  if (!userById) {
    throw new Error("No se encontró el usuario con el ID proporcionado");
  }
  return userById;
};
/*
creo un arreglo filtrando los usurios de mismo username
sugerencia, el username deberia ser un valor unico en la bdd
*/
const getUserByUsernameController = (username) => {
  // Verifica si el username es válido
  if (typeof username !== "string" || username.trim() === "") {
    //como tengo dos tipos de errores throw un objeto al catch con la propiedad que necesita.
    throw {
      message:
        "El username debe contener carácteres y el campo no debe estar vacío.",
      statusCode: 400,
    };
  }
  const usersByName = users.filter((user) => user.username === username);
  // Verifica si se encontró algún usuario
  if (usersByName.length === 0) {
    throw {
      message: "No se encontró ningún usuario con ese username.",
      statusCode: 404,
    };
  }
  return usersByName;
};

const createUserController = (oneUser) => {
  if (!oneUser) {
    throw new Error("Faltan campos obligatorios o los datos son inválidos");
  }
  const id = users.length + 1; //id is Number
  const newUser = { id, ...oneUser };
  users.push(newUser);
  console.log(users);
  return newUser;
};

/*
edita un usuario por su id
primero verifica que sea objeto y no nulo
caso contrario devuelve un error 500
*/
const updateUserController = (id, newUser) => {
  const oldUser = userController.getOneUserController(Number(id)); //trae un usuario por id
  if (typeof oldUser === "object" && oldUser !== null) {
    Object.assign(oldUser, newUser);
    return newUser;
  } else {
    throw new Error(
      "Faltan campos obligatorios para la actualización o son inválidos"
    );
  }
};

/*
Eeliminación fisica del usuario de la base de datos
habría que considerar una eliminacion logica
*/
const physicalDeleteUserController = (id) => {
  const index = users.findIndex((user) => user.id === Number(id));
  let deletingUser = null;
  //si findIndex no encuentra el elemento retorna -1
  if (index !== -1) {
    [deletingUser] = users.splice(index, 1);
    return deletingUser;
  } else {
    throw new Error("El usuario que se intenta eliminar no existe");
  }
};

const setLikeAdminController = (id) => {
  // Trae un usuario por id
  const theClient = userController.getOneUserController(Number(id));

  // Verifica si el cliente existe
  if (
    typeof theClient === "object" &&
    theClient !== null &&
    theClient.categoria === "cliente"
  ) {
    const newCategoria = "admin";

    // Actualiza la categoría
    theClient.categoria = newCategoria;

    // Guarda los cambios en la base de datos
    const theAdmin = userController.updateUserController(id, theClient);

    // Devuelve el usuario actualizado
    return theAdmin;
  } else {
    throw new Error(
      "No se pudó realizar la operación, el usuario ya es admin o no existe en la base de datos"
    );
  }
};

const setLikeClientController = (id) => {
  const theAdmin = userController.getOneUserController(Number(id));
  if (
    typeof theAdmin === "object" &&
    theAdmin!== null &&
    theAdmin.categoria === "admin"
  ) {
    const newCategoria = "cliente";
    theAdmin.categoria = newCategoria;
    const theClient = userController.updateUserController(id, theAdmin);
    return theClient;
  } else {
    throw new Error(
      "No se pudó realizar la operación, el usuario ya es un cliente o no existe en la base de datos"
    );
  }
};

const deleteUserController = (id) => {
  const toDelete = userController.getOneUserController(Number(id));
  if (
    typeof toDelete === "object" &&
    toDelete!== null &&
    toDelete.eliminado === "NO"
  ) {
    const eliminado = "SI";
    toDelete.eliminado = eliminado;
    const deleted = userController.updateUserController(id, toDelete);
    return deleted;
  } else {
    throw new Error(
      "No se pudó realizar la operación, el usuario no existe"
    );
  }
};

const resetUserController = (id) => {
  const toReset = userController.getOneUserController(Number(id));
  if (
    typeof toReset === "object" &&
    toReset!== null &&
    toReset.eliminado === "SI"
  ) {
    const eliminado = "NO";
    toReset.eliminado = eliminado;
    const restore = userController.updateUserController(id, toReset);
    return restore;
  } else {
    throw new Error(
      "No se pudó realizar la operación, algo salio mal o el usuario no se encuentra eliminado"
    );
  }
};

const userController = {
  createUserController,
  getAllUsersController,
  getUserByUsernameController,
  getOneUserController,
  updateUserController,
  physicalDeleteUserController,
  setLikeAdminController,
  setLikeClientController,
  deleteUserController,
  resetUserController,
};

module.exports = userController;
