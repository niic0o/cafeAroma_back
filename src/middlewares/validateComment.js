const joi = require("joi");

const createCommentValidation = joi.object({
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

  asunto: joi
    .string()
    .min(1)
    .max(200)
    .trim()
    .required()
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,.¿?!¡/*()\s]*$/) // Permitir letras con tildes y espacios
    .messages({
      "string.base": "El campo asunto debe ser un texto.",
      "string.empty": "El campo asunto es requerido.",
      "string.min": "El campo asunto debe tener al menos {#limit} caracteres.",
      "string.max": "El campo asunto no debe tener más de {#limit} caracteres.",
      "string.pattern.base":
        "El campo asunto solo puede contener letras y tildes.",
      "any.required": "El campo asunto es requerido.",
    }),

  descripcion: joi
    .string()
    .min(1)
    .max(2000)
    .trim()
    .required()
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,.¿?!¡/*()\s]*$/) // Permitir letras con tildes y espacios
    .messages({
      "string.base": "El campo descripcion debe ser un texto.",
      "string.empty": "El campo descripcion es requerido.",
      "string.min":
        "El campo descripcion debe tener al menos {#limit} caracteres.",
      "string.max":
        "El campo descripcion no debe tener más de {#limit} caracteres.",
      "string.pattern.base":
        "El campo descripcion debe contener solo letras (incluyendo tildes) y espacios.",
      "any.required": "El campo descripcion es requerido.",
    }),
});

const validateComment = {
  createCommentValidation,
};

module.exports = validateComment;
