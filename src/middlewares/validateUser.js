/*
Este middleware debe ser utilizado antes de enviar el contenido de req.body o params o query al controlador
Se encarga de verificar que los datos recibidos sean consistentes con lo solicitado por
la base de datos, caso contrario arroja una excepcion con un mensaje
*/
/*
joi.object espera metodos para ser validados
string min max required son las reglas de validacion
messages es una regla que reibe una clave que al ser true
retorna un mensaje de error personalizado
usar .trim() en string para evitar que lleguen espacios en blanco al inicio y final
*/
const joi = require("joi");

const loginValidation = joi.object({
  email: joi.string().email().min(4).max(100).required().messages({
    "string.base": "El campo correo electrónico debe ser un texto.",
    "string.empty": "El campo correo electrónico es requerido.",
    "string.min":
      "El campo correo electrónico debe tener al menos {#limit} caracteres.",
    "string.max":
      "El campo correo electrónico no debe tener más de {#limit} caracteres.",
    "string.email":
      "El campo correo electrónico debe ser un correo electrónico válido.",
    "any.required": "El campo correo electrónico es requerido.",
  }),

  password: joi
    .string()
    .min(6)
    .max(16)
    .trim()
    .required()
    .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/) // Al menos un número y un carácter especial
    .messages({
      "string.base": "El campo contraseña debe ser un texto.",
      "string.empty": "El campo contraseña es requerido.",
      "string.min":
        "El campo contraseña debe tener al menos {#limit} caracteres.",
      "string.max":
        "El campo contraseña no debe tener más de {#limit} caracteres.",
      "string.pattern.base":
        "La contraseña debe contener al menos un número y un carácter especial.",
      "any.required": "El campo contraseña es requerido.",
    }),
});

const createUserValidation = joi.object({
  nombre: joi
    .string()
    .min(3)
    .max(50)
    .trim()
    .required()
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/) // Permitir letras con tildes y espacios
    .messages({
      "string.base": "El campo nombre debe ser un texto.",
      "string.empty": "El campo nombre es requerido.",
      "string.min": "El campo nombre debe tener al menos {#limit} caracteres.",
      "string.max": "El campo nombre no debe tener más de {#limit} caracteres.",
      "string.pattern.base":
        "El campo nombre debe contener solo letras (incluyendo tildes) y espacios.",
      "any.required": "El campo nombre es requerido.",
    }),

  apellido: joi
    .string()
    .min(3)
    .max(30)
    .trim()
    .required()
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/) // Permitir letras con tildes y espacios
    .messages({
      "string.base": "El campo apellido debe ser un texto.",
      "string.empty": "El campo apellido es requerido.",
      "string.min":
        "El campo apellido debe tener al menos {#limit} caracteres.",
      "string.max":
        "El campo apellido no debe tener más de {#limit} caracteres.",
      "string.pattern.base":
        "El campo apellido debe contener solo letras (incluyendo tildes) y espacios.",
      "any.required": "El campo apellido es requerido.",
    }),

  username: joi
    .string()
    .min(6)
    .max(12)
    .trim()
    .required()
    .pattern(/^[a-zA-Z0-9_]*$/) // Permitir solo letras, números y guiones bajos
    .messages({
      "string.base": "El campo usuario debe ser un texto.",
      "string.empty": "El campo usuario es requerido.",
      "string.min": "El campo usuario debe tener al menos {#limit} caracteres.",
      "string.max":
        "El campo usuario no debe tener más de {#limit} caracteres.",
      "string.pattern.base":
        "El campo usuario solo puede contener letras, números y guiones bajos.",
      "any.required": "El campo usuario es requerido.",
    }),

  password: joi
    .string()
    .min(6)
    .max(16)
    .trim()
    .required()
    .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/) // Al menos un número y un carácter especial
    .messages({
      "string.base": "El campo contraseña debe ser un texto.",
      "string.empty": "El campo contraseña es requerido.",
      "string.min":
        "El campo contraseña debe tener al menos {#limit} caracteres.",
      "string.max":
        "El campo contraseña no debe tener más de {#limit} caracteres.",
      "string.pattern.base":
        "La contraseña debe contener al menos un número y un carácter especial.",
      "any.required": "El campo contraseña es requerido.",
    }),

  email: joi.string().email().min(4).max(100).required().messages({
    "string.base": "El campo correo electrónico debe ser un texto.",
    "string.empty": "El campo correo electrónico es requerido.",
    "string.min":
      "El campo correo electrónico debe tener al menos {#limit} caracteres.",
    "string.max":
      "El campo correo electrónico no debe tener más de {#limit} caracteres.",
    "string.email":
      "El campo correo electrónico debe ser un correo electrónico válido.",
    "any.required": "El campo correo electrónico es requerido.",
  }),

  provincia: joi
    .string()
    .min(4)
    .max(50)
    .trim()
    //.required()
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/) // Permitir letras con tildes y espacios
    .messages({
      "string.base": "El campo provincia debe ser un texto.",
      "string.empty": "El campo provincia es requerido.",
      "string.min":
        "El campo provincia debe tener al menos {#limit} caracteres.",
      "string.max":
        "El campo provincia no debe tener más de {#limit} caracteres.",
      "string.pattern.base":
        "El campo provincia debe contener solo letras (incluyendo tildes) y espacios.",
      "any.required": "El campo provincia es requerido.",
    }),

  ciudad: joi
    .string()
    .min(4)
    .max(50)
    .trim()
    //.required()
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/) // Permitir letras con tildes y espacios
    .messages({
      "string.base": "El campo ciudad debe ser un texto.",
      "string.empty": "El campo ciudad es requerido.",
      "string.min": "El campo ciudad debe tener al menos {#limit} caracteres.",
      "string.max": "El campo ciudad no debe tener más de {#limit} caracteres.",
      "string.pattern.base":
        "El campo ciudad debe contener solo letras (incluyendo tildes) y espacios.",
      "any.required": "El campo ciudad es requerido.",
    }),

  domicilio: joi
    .string()
    .min(6)
    .max(100)
    //.required()
    .messages({
      "string.base": "El campo domicilio debe ser un texto.",
      "string.empty": "El campo domicilio es requerido.",
      "string.min":
        "El campo domicilio debe tener al menos {#limit} caracteres.",
      "string.max":
        "El campo domicilio no debe tener más de {#limit} caracteres.",
      "any.required": "El campo domicilio es requerido.",
    }),

  dni: joi
    .number()
    .integer()
    .strict() // Esto asegura que no se acepten conversiones automáticas de tipo
    .required()
    .custom((value, helpers) => {
      const dniString = value.toString();
      const length = dniString.length;

      // Verificar que el DNI tenga entre 6 y 8 dígitos
      if (length < 6 || length > 8) {
        return helpers.message("El campo DNI debe tener entre 6 y 8 dígitos.");
      }
      return value; // Si pasa la validación, retorna el valor
    })
    .messages({
      "number.base": "El campo DNI debe ser un número.",
      "number.empty": "El campo DNI es requerido.",
      "number.integer": "El campo DNI debe ser un número entero.",
      "any.required": "El campo DNI es requerido.",
    })
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "number.base") {
          err.message =
            "El campo DNI debe ser un número entero y no una cadena.";
        }
      });
      return errors;
    }),
});

// copia el schema tal cual esta y modifica lo incluido en fork
const updateUserValidation = createUserValidation.fork(['password'], (schema) => schema.optional());

const getUserByUsernameValidation = joi.object({
  username: joi
    .string()
    .min(6)
    .max(12)
    .trim()
    .required()
    .pattern(/^[a-zA-Z0-9_]*$/) // Permitir solo letras, números y guiones bajos
    .messages({
      "string.base": "El campo usuario debe ser un texto.",
      "string.empty": "El campo usuario es requerido.",
      "string.min": "El campo usuario debe tener al menos {#limit} caracteres.",
      "string.max":
        "El campo usuario no debe tener más de {#limit} caracteres.",
      "string.pattern.base":
        "El campo usuario solo puede contener letras, números y guiones bajos.",
      "any.required": "El campo usuario es requerido.",
    }),
});

changePasswordValidation = joi.object({
  userId: joi.required().messages({
    "string.empty": "El id es requerido",
  }),

  oldPassword: joi
    .string()
    .min(6)
    .max(16)
    .trim()
    .required()
    .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/) // Al menos un número y un carácter especial
    .messages({
      "string.base": "El campo contraseña debe ser un texto.",
      "string.empty": "El campo contraseña es requerido.",
      "string.min":
        "El campo contraseña debe tener al menos {#limit} caracteres.",
      "string.max":
        "El campo contraseña no debe tener más de {#limit} caracteres.",
      "string.pattern.base":
        "La contraseña debe contener al menos un número y un carácter especial.",
      "any.required": "El campo contraseña es requerido.",
    }),

  newPassword: joi
    .string()
    .min(6)
    .max(16)
    .trim()
    .required()
    .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/) // Al menos un número y un carácter especial
    .messages({
      "string.base": "El campo contraseña debe ser un texto.",
      "string.empty": "El campo contraseña es requerido.",
      "string.min":
        "El campo contraseña debe tener al menos {#limit} caracteres.",
      "string.max":
        "El campo contraseña no debe tener más de {#limit} caracteres.",
      "string.pattern.base":
        "La contraseña debe contener al menos un número y un carácter especial.",
      "any.required": "El campo contraseña es requerido.",
    }),
});

const validateUser = {
  createUserValidation,
  loginValidation,
  updateUserValidation,
  getUserByUsernameValidation,
  changePasswordValidation,
};

module.exports = validateUser;
