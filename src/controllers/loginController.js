const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../models/usersModel");
require("dotenv").config();

const secretKey = process.env.SECRETKEY;

const login = async (email, password) => {
  try {
    const userToLogin = await users.findOne({ email });
    //si el email no existe
    if (!userToLogin) {
      throw {
        message: "Usuario no encontrado",
        statusCode: 404,
      };
    }
    // si existe pero esta eliminado
    if (userToLogin.eliminado === "SI") {
      throw {
        message:
          "Usuario eliminado. Por favor, contacta a un administrador para ser reactivado.",
        statusCode: 403,
      };
    }
    // si no pone bien la contraseña
    const checkUser = await bcrypt.compare(password, userToLogin.password);
    if (!checkUser) {
      throw {
        message: "Contraseña incorrecta",
        statusCode: 401,
      };
    }
    // Generar el token
    const token = jwt.sign(
      { id: userToLogin._id, categoria: userToLogin.categoria },
      secretKey,
      { expiresIn: "1h" }
    );
    return { token };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    } else {
      // si hubo un error de implementacion o conexion a mongodb
      throw {
        message: "No se pudo generar el token por un problema interno",
        statusCode: 500,
      };
    }
  }
};

// Controller
const changePassword = async (changing) => {
  const { userId, oldPassword, newPassword } = changing;
  try {
    const user = await users.findById(userId);
    if (!user) {
      throw {
        message: "Usuario no encontrado",
        statusCode: 404,
      };
    }

    // Verificar la contraseña actual
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw {
        message: "La contraseña actual es incorrecta",
        statusCode: 401,
      };
    }

    // Hashear la nueva contraseña
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña en la base de datos
    user.password = hashedNewPassword;
    await user.save();

    return {
      message: "Contraseña cambiada exitosamente",
    };
  } catch (error) {
    throw {
      message: "Error al cambiar la contraseña",
      statusCode: 500,
    };
  }
};

const loginController = {
  login,
  changePassword,
};

module.exports = loginController;
