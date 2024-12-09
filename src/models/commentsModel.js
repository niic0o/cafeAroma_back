const mongoose = require("mongoose");

// Definir el esquema del usuario. REF: Docs/scheme_users_DER.png
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true, // El correo electrónico es obligatorio
      //unique: true, un mismo usuario puede comentar muchas veces
      trim: true,
      minlength: 4,
      maxlength: 100,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validación básica de correo electrónico
    },
    asunto: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 100,
      match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
        minlength: 30,
        maxlength: 2000,
        match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
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
const Comment = mongoose.model("Comment", userSchema);

module.exports = Comment;