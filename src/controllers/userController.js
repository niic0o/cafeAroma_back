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
    throw { message: 'El username debe contener carácteres y el campo no debe estar vacío.',
  statusCode: 400};
  }
  const usersByName = users.filter((user) => user.username === username);
  // Verifica si se encontró algún usuario
  if (usersByName.length === 0) {
    throw { message: 'No se encontró ningún usuario con ese username.',
  statusCode: 404 };
  }
  return usersByName;
};

const createUserController = (name, username, email) => {
  if (!name || !username || !email) {
    throw new Error("Faltan campos obligatorios o los datos son inválidos");
  }
  const id = users.length + 1; //id is Number
  const newUser = { id, name, username, email };
  users.push(newUser);
  console.log(users);
  return newUser;
};

/*
edita un usuario por su id
primero verifica que sea objeto y no nulo
caso contrario devuelve un error 500
*/
const updateUserController = (id, name, username, email) => {
  const oldUser = userController.getOneUserController(Number(id)); //trae un usuario por id
  const newUser = { name, username, email };
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
const deleteUserController = (id) => {
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

const userController = {
  createUserController,
  getAllUsersController,
  getUserByUsernameController,
  getOneUserController,
  updateUserController,
  deleteUserController,
};

module.exports = userController;
