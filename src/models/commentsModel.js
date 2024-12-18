const mongoose = require("mongoose");

// Definir el esquema del usuario. REF: Docs/scheme_users_DER.png
const commentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true, // El correo electrónico es obligatorio
      //unique: true, un mismo usuario puede comentar muchas veces
      trim: true,
      minlength: 10,
      maxlength: 100,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validación básica de correo electrónico
    },
    asunto: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
      match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,.¿?!¡/*()\s]*$/,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 2000,
      match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,.¿?!¡/*()\s]*$/,
    },
    leido: {
      type: String,
      default: "NO", // Valor por defecto
      minlength: 2, // Mínimo 2 caracteres
      maxlength: 2, // Máximo 2 caracteres
    },
  },
  {
    timestamps: true, // Esto agrega automáticamente las fechas de creación y actualización
  }
);

// Crear el modelo basado en el esquema
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
