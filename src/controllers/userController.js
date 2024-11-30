// cuando un handler me pida que manipule datos, me los pasa.
// tomo decisiones y envio al modelo logico db para que se conecte con la bdd fisica
// le devuelvo el proceso al handler para que responda la solicitud http
const users = require("../db/dataBase");

const getAllUsersController = () => {
  return users;
};

/*
Uso find para obtener el primer objeto que cumpla con la condicion
*/
const getOneUserController = (id) => {
  const userById = users.find((user) => user.id === id);
  return userById;
};
/*
creo un arreglo filtrando los usurios de mismo username
sugerencia, el username deberia ser un valor unico en la bdd
*/
const getUserByUsernameController = (username) => {
  const usersByName = users.filter((user) => user.username === username);
  return usersByName;
};

const createUserController = (name, username, email) => {
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
  const oldUser = userController.getOneUserController(id); //trae un usuario por id
  const newUser = { name, username, email };
  if (typeof oldUser === 'object' && oldUser !== null) {
    Object.assign(oldUser, newUser);
    return newUser;
  } else {
    return 500;
  }
};

userController = {
  createUserController,
  getAllUsersController,
  getUserByUsernameController,
  getOneUserController,
  updateUserController,
};

module.exports = userController;
