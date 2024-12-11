const mongoose = require("mongoose");

// Definir el esquema de la Orden
const orderSchema = new mongoose.Schema(
  {
    nro_orden: {
      type: Number,
      required: true,
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
          min: 1,
        },
        precio: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
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

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
