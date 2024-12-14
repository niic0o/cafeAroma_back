const MP_ACCESS_TOKEN = require("../config/mp");
const Order = require("../models/ordersModel");

// SDK de Mercado Pago
const { MercadoPagoConfig, Preference } = require("mercadopago");
// Agrega credenciales
const mercadoPagoClient = new MercadoPagoConfig({
  accessToken: MP_ACCESS_TOKEN,
});

const throwError500 = (error, extraInfo = {}) => {
  throw {
    message: `Error al intentar obtener datos, ocurre que: ${
      error.message
    } - ${JSON.stringify(extraInfo)}`,
    statusCode: 500, //error del servidor
  };
};

const createPrefenceController = async (body) => {
  if (!body) {
    throw {
      message: "Hubo un error con los datos enviados, intente otra vez",
      statusCode: 400, // bad request
    };
  }
  try {
    const preference = new Preference(mercadoPagoClient);
    const result = await preference.create({ body });
    return result;
  } catch (error) {
    throwError500(error);
  }
};

const returnController = async (
  payment_id,
  status,
  merchant_order_id,
  external_reference
) => {
  try {
    const result = await Order.findByIdAndUpdate(
      external_reference,
      {
        status: status,
        payment_id: payment_id,
        merchant_order_id: merchant_order_id,
      },
      { new: true }
    );
    return result;
  } catch (error) {
    throwError500(error, {
      payment_id,
      status,
      merchant_order_id,
    });
  }
};

const mercadoPagoController = {
  createPrefenceController,
  returnController,
};

module.exports = mercadoPagoController;
