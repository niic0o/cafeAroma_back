const { MP_ACCESS_TOKEN } = require("../config/mp");

// SDK de Mercado Pago
const { MercadoPagoConfig, Preference } = require("mercadopago");
// Agrega credenciales
const mercadoPagoClient = new MercadoPagoConfig({
  accessToken: MP_ACCESS_TOKEN,
});


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

const mercadoPagoController = {
    createPrefenceController
};

module.exports = mercadoPagoController;