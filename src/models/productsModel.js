const mongoose = require('mongoose');

// Definir el esquema del producto
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // El nombre es obligatorio
      trim: true, // Elimina espacios innecesarios
    },
    precio: {
      type: Number,
      required: true, // El precio es obligatorio
    },
    stock: {
      type: Number,
      minlength: 0,
      required: true, // El stock es obligatorio
    },
    img: {
      type: String,
      required: true, // la imgen es obligatorio
    },
    description: {
      type: String,
      required: true, // la descripcion es obligatorio
    },
    
  },
  {
    timestamps: true, // Esto agrega automáticamente las fechas de creación y actualización
  }
);

// Crear el modelo basado en el esquema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
