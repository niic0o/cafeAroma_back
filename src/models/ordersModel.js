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

console.log("Registrando middleware pre(save)");
orderSchema.pre("save", function (next) {
  console.log("Antes de guardar la orden");
  const self = this;
  if (!self.nro_orden) {
    Order.findOne({}, {}, { sort: { nro_orden: -1 } }, function (err, order) {
      if (err) {
        next(err);
      } else if (!order) {
        self.nro_orden = 1;
      } else {
        self.nro_orden = order.nro_orden + 1;
      }
      next(); // Llamar a next() dentro del callback
    });
  } else {
    next(); // Llamar a next() si nro_orden ya está seteado
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
