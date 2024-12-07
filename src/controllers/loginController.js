const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/usersModel');
require('dotenv').config();

const secretKey = process.env.SECRETKEY;

const login = async (email, password) => {
    try {
      const userToLogin = await users.findOne({ email });
      if (!userToLogin) {
        throw {
            message: 'Usuario no encontrado',
            statusCode: 404
        };
      }
      const checkUser = await bcrypt.compare(password, userToLogin.password);
      if (!checkUser) {
        throw {
            message: 'Contraseña incorrecta',
            statusCode: 401
        };
      }  
      // Generar el token
      const token = jwt.sign({ id: userToLogin._id, categoria: userToLogin.categoria }, secretKey, { expiresIn: '1h' });
      return { token };
    } catch (error) {
      throw {
        message: "No se pudo generar el token por un problema interno",
        statusCode: 500
    };
    }
  };

const loginController = {
    login,   
};

module.exports = loginController; 