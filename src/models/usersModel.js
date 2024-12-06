const mongoose = require("mongoose");

// Definir el esquema del usuario. REF: Docs/scheme_users_DER.png
const userSchema = new mongoose.Schema(
  {
    dni: {
      type: Number,
      required: true, // El DNI es obligatorio
      unique: true,
      integer: true, // Debe ser un número entero
      validate: {
        validator: function (value) {
          const dniString = value.toString();
          const length = dniString.length;
          return length >= 6 && length <= 8; // Verificar que el DNI tenga entre 6 y 8 dígitos
        },
        message: "El campo DNI debe tener entre 6 y 8 dígitos.",
      },
    },
    categoria: {
      type: String,
      default: "cliente", // Valor por defecto
      maxlength: 15, // Máximo 15 caracteres
    },
    nombre: {
      type: String,
      required: true, // El nombre es obligatorio
      trim: true, // Elimina espacios innecesarios
      minlength: 3, // Mínimo 3 caracteres
      maxlength: 50, // Máximo 50 caracteres
      match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/, // Permitir letras con tildes y espacios
    },
    apellido: {
      type: String,
      required: true, // El apellido es obligatorio
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
    },
    username: {
      type: String,
      required: true, // El username es obligatorio
      unique: true, // El correo debe ser único
      trim: true,
      minlength: 6,
      maxlength: 12,
      match: /^[a-zA-Z0-9_]*$/, // Permitir solo letras, números y guiones bajos
    },
    password: {
      type: String,
      required: true, // La contraseña es obligatoria
      minlength: 6,
      maxlength: 16,
      match: /^(?=.*[0-9])(?=.*[!@#$%^&*])/, // Al menos un número y un carácter especial
    },
    email: {
      type: String,
      required: true, // El correo electrónico es obligatorio
      unique: true, // El correo debe ser único
      trim: true,
      minlength: 4,
      maxlength: 100,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validación básica de correo electrónico
    },
    provincia: {
      type: String,
      required: true, // La provincia es obligatoria
      trim: true,
      minlength: 4,
      maxlength: 50,
      match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
    },
    ciudad: {
      type: String,
      required: true, // La ciudad es obligatoria
      trim: true,
      minlength: 4,
      maxlength: 50,
      match: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
    },
    domicilio: {
      type: String,
      required: true, // El domicilio es obligatorio
      minlength: 6,
      maxlength: 100,
    },
    eliminado: {
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
const User = mongoose.model("User", userSchema);

module.exports = User;
