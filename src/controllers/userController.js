// cuando un handler me pida que manipule datos, me los pasa.
// tomo decisiones y envio al modelo logico db para que se conecte con la bdd fisica
// le devuelvo el proceso al handler para que responda la solicitud http
const users = require("../models/usersModel");
const bcrypt = require("bcryptjs");
/*
esto es diseñado para reducir repeticion de codigo ya que cada funcion puede encontrarse con la bdd no activa
*/
const throwError500 = (error) => {
  throw {
    message:
      "Ups, se desenchufó un cable o la base de datos no funciona " +
      error.message,
    statusCode: 500, //error del servidor
  };
};

const getAllUsersController = async () => {
  try {
    const allUsers = await users.find({ eliminado: "NO" });
    if (allUsers.length === 0) {
      throw {
        message: "No se encontró usuarios registrados",
        statusCode: 404, // not found
      };
    }
    return allUsers;
  } catch (error) {
    throwError500(error);
  }
};

const getDeletedUsersController = async () => {
  try {
    // Buscar solo usuarios que estén eliminados
    const deletedUsers = await users.find({ eliminado: "SI" });

    if (deletedUsers.length === 0) {
      throw {
        message: "No se encontró usuarios eliminados",
        statusCode: 404, // not found
      };
    };
    return deletedUsers;
  } catch (error) {
    throwError500(error);
  }
};

/*
Uso find para obtener el primer objeto que cumpla con la condicion
*/
const getOneUserController = async (id) => {
  try {
    //recordar que params envia 'string' hay que parsear a Number
    const userById = await users.findById(id);
    if (!userById) {
      throw {
        message: "No se encontró el usuario con el ID proporcionado",
        statusCode: 404,
      };
    }
    return userById;
  } catch (error) {
    throwError500(error);
  }
};
/*
creo un arreglo filtrando los usurios de mismo username
*/
const getUserByUsernameController = async (username) => {
  // Verifica si el username es válido
  if (typeof username !== "string" || username.trim() === "") {
    //como tengo dos tipos de errores throw un objeto al catch con la propiedad que necesita.
    throw {
      message:
        "El username debe contener carácteres y el campo no debe estar vacío.",
      statusCode: 400, //bad request
    };
  }
  try {
    const usersByName = await users.find({ username });
    // Verifica si se encontró algún usuario
    if (usersByName.length === 0) {
      throw {
        message: "No se encontró ningún usuario con ese username.",
        statusCode: 404, //not found
      };
    }
    return usersByName;
  } catch (error) {
    throwError500(error);
  }
};

const createUserController = async (oneUser) => {
  if (!oneUser) {
    throw {
      message: "Hubo un error con los datos enviados, intente otra vez",
      statusCode: 400, //bad request
    };
  }
  try {
    const { password } = oneUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    oneUser.password = hashedPassword;
    const newUser = new users(oneUser);
    const savedUser = await newUser.save(); // Intentar guardar el nuevo usuario
    return savedUser;
  } catch (error) {
    // Manejo de errores de Mongoose
    if (error.name === "ValidationError") {
      throw {
        message: "Error de validación en la base de datos: " + error.message,
        statusCode: 400, // Bad Request
      };
    } else if (error.code === 11000) {
      // Código de error para violación de unicidad
      throw {
        message: "El usuario ya existe. Por favor, elige otro.",
        statusCode: 409, // Conflict
      };
    }
    throwError500(error);
  }
};

/*
edita un usuario por su id
primero verifica que sea objeto y no nulo
caso contrario devuelve un error 500
*/

const updateUserController = async (id, newUser ) => {
  if (!newUser ) {
    throw {
      message: "Hubo un error con los datos enviados, intente otra vez",
      statusCode: 400, // bad request
    };
  }
  try {
    const updatedUser = await users.findByIdAndUpdate(id, newUser , { new: true });
    // Verificar si el usuario fue encontrado y actualizado
    if (!updatedUser ) {
      throw {
        message: "Usuario no encontrado",
        statusCode: 404, // not found
      };
    }
    return updatedUser ;
  } catch (error) {
    throwError500(error);
  }
};

/*
Eeliminación fisica del usuario de la base de datos
habría que considerar una eliminacion logica
*/
const physicalDeleteUserController = async (id) => {
  try {
    const deletedUser = await users.findByIdAndDelete(id); // Elimina por ID

    if (!deletedUser) {
      throw {
        message: "Usuario no encontrado",
        statusCode: 404, // Not Found
      };
    }

    return deletedUser;
  } catch (error) {
    throwError500(error);
  }
};

const setLikeAdminController = async (id) => {
  try {
    // Intenta actualizar la categoría del usuario a "admin"
    const updatedUser = await userController.updateUserController(id, {
      categoria: "admin",
    });

    // Verifica si se encontró y actualizó el usuario
    if (!updatedUser) {
      throw {
        message:
          "No se pudo realizar la operación, el usuario no existe o ya es admin",
        statusCode: 400,
      };
    }

    // Devuelve el usuario actualizado
    return updatedUser;
  } catch (error) {
    throwError500(error);
  }
};

const setLikeClientController = async (id) => {
  try {
    // Intenta actualizar la categoría del usuario a "cliente"
    const updatedUser = await userController.updateUserController(id, {
      categoria: "cliente",
    });

    // Verifica si se encontró y actualizó el usuario
    if (!updatedUser) {
      throw {
        message:
          "No se pudo realizar la operación, el usuario no existe o ya es cliente",
        statusCode: 400,
      };
    }

    // Devuelve el usuario actualizado
    return updatedUser;
  } catch (error) {
    throwError500(error);
  }
};

const deleteUserController = async (id) => {
  try {
    const updatedUser = await userController.updateUserController(id, {
      eliminado: "SI",
    });
    if (!updatedUser) {
      throw {
        message: "No se pudo realizar la operación, el usuario no existe",
        statusCode: 404,
      };
    }
    return updatedUser;
  } catch (error) {
    throwError500(error);
  }
};

const resetUserController = async (id) => {
  try {
    const updatedUser = await userController.updateUserController(id, {
      eliminado: "NO",
    });
    if (!updatedUser) {
      throw {
        message: "No se pudo realizar la operación, el usuario no existe",
        statusCode: 404,
      };
    }
    return updatedUser;
  } catch (error) {
    throwError500(error);
  }
};

const userController = {
  createUserController,
  getAllUsersController,
  getDeletedUsersController,
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
