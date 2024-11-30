// cuando un handler me pida que manipule datos, me los pasa.
// tomo decisiones y envio al modelo logico db para que se conecte con la bdd fisica
// le devuelvo el proceso al handler para que responda la solicitud http
const users = require('../db/dataBase');

const createUserController = (name, username, email) => {
    const id = users.length + 1;
    const newUser = {id, name, username, email};
    users.push(newUser);
    console.log(users);
    return newUser;
};

userController = {
    createUserController,
};

module.exports = userController;