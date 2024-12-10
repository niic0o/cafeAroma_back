const joi = require("joi");

const createOrderValidation = joi.object({
  user_id: joi
    .string()
    .required()
    .messages({
      "string.empty": "User's ID no puede estar vacío",
      "any.required": "El campo User's ID es requerido.",
    })
    .custom((value, helpers) => {
      if (!ObjectId.isValid(value)) {
        return helpers.message({
          custom: "ObjectId inválido",
        });
      }
      return value;
    }),

  items: joi
    .array()
    .required()
    .items(
      joi.object({
        product_id: joi
          .string()
          .required()
          .custom((value, helpers) => {
            if (!ObjectId.isValid(value)) {
              return helpers.message({
                custom: "ObjectId inválido",
              });
            }
            return value;
          })
          .messages({
            "string.empty": "Prouduct's ID no puede estar vacío",
            "any.required": "El campo Prouduct's ID es requerido.",
          }),
        cantidad: joi.number().required().integer().min(1).messages({
          "number.empty": "El campo cantidad no puede estar vacío.",
          "number.integer": "El campo cantidad debe ser un número entero.",
          "number.min": "El campo cantidad debe ser mayor o igual a 1.",
          "any.required": "El campo cantidad es requerido.",
        }),
        precio: joi.number().required().min(0).messages({
          "number.empty": "El campo precio no puede estar vacío.",
          "number.min": "El campo precio debe ser un número positivo.",
          "any.required": "El campo cantidad es requerido.",
        }),
      })
    ),
});

const validateOrder = {
  createOrderValidation,
  //   loginValidation,
  //   updateUserValidation,
  //   getUserByUsernameValidation,
  //   changePasswordValidation,
};

module.exports = validateOrder;
